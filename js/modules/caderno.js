import { materias } from '../dados.js';
import { voltarDashboard } from '../animacoes.js';

function voltarParaPagina2() {
    document.getElementById('caderno').style.display = 'none';
    document.getElementById('livro').style.display = 'block';

    document.body.classList.remove('modo-caderno');

    const btnVoltar = document.getElementById('btn-voltar-header');
    btnVoltar.style.display = 'none';
}

export function renderizarCaderno(idMateria, idConteudo, nomeConteudo) {
    const caderno = document.getElementById('caderno');
    const livro = document.getElementById('livro');
    const dashboard = document.getElementById('dashboard');

    caderno.style.display = 'flex';
    caderno.style.flexDirection = 'column';
    livro.style.display = 'none';
    dashboard.style.display = 'none';

    document.body.classList.add('modo-caderno');

   // Esconder o botão da tela 2 e mostrar o da tela 3
const btnVoltarHeader = document.getElementById('btn-voltar-header');
const btnVoltarCaderno = document.getElementById('btn-voltar-caderno');

if (btnVoltarHeader) btnVoltarHeader.style.display = 'none';
if (btnVoltarCaderno) btnVoltarCaderno.style.display = 'block';

// Configurar ação de voltar para a tela 2 (livro)
btnVoltarCaderno.onclick = () => {
    voltarParaPagina2();
};

    document.getElementById('caderno-titulo').textContent = nomeConteudo || 'Novo Conteúdo';

    const materia = materias.find(m => m.id === idMateria);
    const conteudo = materia.conteudos.find(c => c.id === idConteudo);
    let capitulos = conteudo.capitulos || [];
    let capituloAtivo = null;

    const listaCapitulos = document.getElementById('lista-capitulos');

    function renderizarLista() {
        listaCapitulos.innerHTML = '';
        capitulos.forEach((cap, index) => {
            const li = document.createElement('li');
            li.textContent = cap;
            li.dataset.index = index;
            if (index === capituloAtivo) li.classList.add('ativo');
            li.addEventListener('click', () => {
                capituloAtivo = index;
                renderizarLista();
                limparCanvas();
            });
            listaCapitulos.appendChild(li);
        });
    }

    document.getElementById('btn-add-capitulo').addEventListener('click', () => {
        const nome = prompt('Nome do novo capítulo:');
        if (nome) {
            capitulos.push(nome);
            capituloAtivo = capitulos.length - 1;
            renderizarLista();
            limparCanvas();
        }
    });

    document.getElementById('btn-rename-capitulo').addEventListener('click', () => {
        if (capituloAtivo !== null) {
            const novoNome = prompt('Novo nome do capítulo:', capitulos[capituloAtivo]);
            if (novoNome) {
                capitulos[capituloAtivo] = novoNome;
                renderizarLista();
            }
        } else {
            alert('Selecione um capítulo primeiro.');
        }
    });

    document.getElementById('btn-delete-capitulo').addEventListener('click', () => {
        if (capituloAtivo !== null) {
            if (confirm(`Excluir o capítulo "${capitulos[capituloAtivo]}"?`)) {
                capitulos.splice(capituloAtivo, 1);
                capituloAtivo = null;
                renderizarLista();
                limparCanvas();
            }
        } else {
            alert('Selecione um capítulo primeiro.');
        }
    });

    const sidebar = document.getElementById('sidebar-caderno');
    sidebar.querySelector('h2').addEventListener('click', () => {
        sidebar.classList.toggle('recolhida');
    });

    const canvas = document.getElementById('canvas-desenho');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let desenhando = false;

    function posicao(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function limparCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener('pointerdown', (e) => {
        desenhando = true;
        const p = posicao(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', (e) => {
        if (!desenhando) return;
        const p = posicao(e);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
    });

    canvas.addEventListener('pointerup', () => {
        desenhando = false;
    });

    canvas.addEventListener('pointerleave', () => {
        desenhando = false;
    });

    renderizarLista();
}