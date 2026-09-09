import { materias } from '../dados.js';
import { voltarDashboard } from '../animacoes.js';

function voltarParaPagina2() {
    document.getElementById('caderno').style.display = 'none';
    document.getElementById('livro').style.display = 'block';

    document.body.classList.remove('modo-caderno');

    // Mostrar botão da tela 2 e esconder botão do caderno
    const btnVoltarHeader = document.getElementById('btn-voltar-header');
    const btnVoltarCaderno = document.getElementById('btn-voltar-caderno');

    if (btnVoltarHeader) btnVoltarHeader.style.display = 'block';
    if (btnVoltarCaderno) btnVoltarCaderno.style.display = 'none';
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

    btnVoltarCaderno.onclick = () => {
        voltarParaPagina2();
    };

    document.getElementById('caderno-titulo').textContent = nomeConteudo || 'Novo Conteúdo';

    const materia = materias.find(m => m.id === idMateria);
    const conteudo = materia.conteudos.find(c => c.id === idConteudo);
    let capitulos = conteudo.capitulos || [];
    let capituloAtivo = null;

    const listaCapitulos = document.getElementById('lista-capitulos');

    // ==========================================
    // FUNÇÃO DO MODAL (NOVA)
    // ==========================================
    function abrirModal(titulo, placeholder, textoBotao, callback) {
        const overlay = document.getElementById('modal-overlay');
        const tituloEl = document.getElementById('modal-titulo');
        const inputEl = document.getElementById('modal-input');
        const confirmarBtn = document.getElementById('modal-confirmar');
        const cancelarBtn = document.getElementById('modal-cancelar');
    
        // Configurar o conteúdo
        tituloEl.textContent = titulo;
        inputEl.placeholder = placeholder;
        confirmarBtn.textContent = textoBotao;
    
        // Limpar o input
        inputEl.value = '';
        inputEl.focus();
    
        // Mostrar o modal (adiciona a classe que ativa a visibilidade)
        overlay.classList.add('ativo');
    
        // Função para fechar o modal
        function fechar() {
            overlay.classList.remove('ativo');
            confirmarBtn.onclick = null;
            cancelarBtn.onclick = null;
        }
    
        // Quando clicar em "Confirmar"
        confirmarBtn.onclick = () => {
            const valor = inputEl.value.trim();
            if (valor) {
                callback(valor); // Executa a ação (criar, renomear, etc)
                fechar();
            }
        };
    
        // Quando clicar em "Cancelar"
        cancelarBtn.onclick = fechar;
    }

    // ==========================================
    // LÓGICA DE CAPÍTULOS (USANDO O MODAL)
    // ==========================================

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
        }) };
   

    // Botão "Adicionar Capítulo"
   
        document.getElementById('btn-add-capitulo').onclick = () => {
            abrirModal(
                'Novo Capítulo',
                'Digite o nome do capítulo...',
                'Criar',
                (novoNome) => {
                    capitulos.push(novoNome);
                    capituloAtivo = capitulos.length - 1; // Índice do último capítulo
                    renderizarLista();
                    limparCanvas();
                }
            );
        };

    // Botão "Renomear Capítulo"
    document.getElementById('btn-rename-capitulo').onclick = () => {
        if (capituloAtivo === null) {
            abrirModal('Atenção', 'Selecione um capítulo para renomear.', 'Entendi', () => {});
            return;
        }
        
        abrirModal(
            'Renomear Capítulo',
            'Novo nome do capítulo...',
            'Salvar',
            (novoNome) => {
                capitulos[capituloAtivo] = novoNome;
                renderizarLista();
            }
        );
    };
    // Botão "Excluir Capítulo"
    document.getElementById('btn-delete-capitulo').onclick = () => {
        if (capituloAtivo === null) {
            abrirModal('Atenção', 'Selecione um capítulo para excluir.', 'Entendi', () => {});
            return;
        }
        
        // Para excluir, usamos o modal de confirmação
        abrirModal(
            'Excluir Capítulo',
            `Tem certeza que deseja excluir "${capitulos[capituloAtivo]}"?`,
            'Excluir',
            () => {
                capitulos.splice(capituloAtivo, 1);
                capituloAtivo = null;
                renderizarLista();
                limparCanvas();
            }
        );
    };

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
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
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