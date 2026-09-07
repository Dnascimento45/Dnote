import { voltarDashboard } from '../animacoes.js';

export function renderizarCaderno(idMateria, idConteudo, nomeConteudo) {
    const caderno = document.getElementById('caderno');
    const livro = document.getElementById('livro');
    const dashboard = document.getElementById('dashboard');

    // 1. Adicionar classe ao body para ativar estilos
    document.body.classList.add('modo-caderno');

    // 2. Mostrar o botão voltar
    const btnVoltar = document.getElementById('btn-voltar-header');
    btnVoltar.style.display = 'block';

    // 3. Alterar o evento de clique do botão voltar para voltar à Página 2
    btnVoltar.onclick = () => {
        voltarParaPagina2();
    };

    // 4. Esconder a logo (opcional, se não quiser)
    // document.querySelector('.site-logo').style.display = 'none';

    // ... resto do código do canvas e capítulos ...
}

// Função para voltar à Página 2
function voltarParaPagina2() {
    // Esconder caderno
    document.getElementById('caderno').style.display = 'none';
    
    // Mostrar livro
    document.getElementById('livro').style.display = 'block';

    // Remover classe do body
    document.body.classList.remove('modo-caderno');

    // Esconder botão voltar (ou deixar para a página 2)
    const btnVoltar = document.getElementById('btn-voltar-header');
    btnVoltar.style.display = 'none'; // Ou mantenha visível se quiser


    
    // 1. Esconder telas anteriores e mostrar o caderno
    livro.style.display = 'none';
    dashboard.style.display = 'none';
    caderno.style.display = 'flex';
    caderno.style.flexDirection = 'column';

    // 2. Configurar título base (você pode passar o nome do conteúdo aqui)
    const titulo = document.getElementById('caderno-titulo');
    titulo.textContent = nomeConteudo || 'Novo Conteúdo';

    // 3. Inicializar a lista de capítulos (vazia ou com capítulos padrão)
    let capitulos = [];
    let capituloAtivo = null;

    const listaCapitulos = document.getElementById('lista-capitulos');
    
    // Função para renderizar a lista de capítulos na sidebar
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

    // 4. Configurar botões da sidebar
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

    // 5. Configurar botões de recolher
    const header = document.querySelector('.caderno-header');
    const sidebar = document.getElementById('sidebar-caderno');

    document.getElementById('btn-toggle-header').addEventListener('click', () => {
        header.style.display = header.style.display === 'none' ? 'flex' : 'none';
    });

    // Botão para recolher sidebar (adicione um botão na sidebar ou no header)
    // Exemplo: clique em "CAPÍTULOS" recolhe a sidebar
    sidebar.querySelector('h2').addEventListener('click', () => {
        sidebar.classList.toggle('recolhida');
    });

    // 6. Configurar canvas
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

    // Eventos para desenho (mouse e caneta/mesa digitalizadora)
    canvas.addEventListener('pointerdown', (e) => {
        desenhando = true;
        const p = posicao(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        canvas.setPointerCapture(e.pointerId); // Importante para caneta
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

    // 7. Botão voltar
    document.getElementById('btn-voltar-caderno').addEventListener('click', () => {
        voltarDashboard();
    });
}