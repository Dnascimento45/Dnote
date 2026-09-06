import { materias } from '../dados.js';
import { renderizarCaderno } from './caderno.js'; // <-- IMPORTAÇÃO CORRIGIDA

export function renderizarLivro(idMateria) {
    const materia = materias.find(m => m.id === idMateria);
    const livro = document.getElementById('livro');
    
    livro.style.display = 'block';
    
    // 1. GERAR O HTML DOS BOTÕES (apenas HTML, sem JS dentro)
    livro.innerHTML = `
        <div class="lista-conteudos itens-${materia.conteudos.length}">
            ${materia.conteudos.map(conteudo => `
                <button class="btn-conteudo" data-conteudo-id="${conteudo.id}" data-conteudo-nome="${conteudo.nome}">
                    ${conteudo.nome}
                </button>
            `).join('')}
        </div>

        <div class="video-container">
            <video autoplay loop muted playsinline>
                <source src="assets/video_bg.mp4" type="video/mp4">
            </video>
        </div>
    `;

    // 2. ADICIONAR OS EVENTOS DE CLIQUE (fora da template string)
    const botoes = document.querySelectorAll('.btn-conteudo');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const idConteudo = botao.dataset.conteudoId;
            const nomeConteudo = botao.dataset.conteudoNome;
            
            // 3. CHAMAR A FUNÇÃO CORRETAMENTE
            renderizarCaderno(materia.id, idConteudo, nomeConteudo);
        });
    });
}