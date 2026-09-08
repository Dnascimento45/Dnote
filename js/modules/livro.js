import { materias } from '../dados.js';
import { renderizarCaderno } from './caderno.js';

export function renderizarLivro(idMateria) {
    const materia = materias.find(m => m.id === idMateria);
    const livro = document.getElementById('livro');
    
    livro.style.display = 'block';
    
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

    // Adicionar eventos de clique
    const botoes = document.querySelectorAll('.btn-conteudo');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const idConteudo = botao.dataset.conteudoId;
            const nomeConteudo = botao.dataset.conteudoNome;
            
            renderizarCaderno(materia.id, idConteudo, nomeConteudo);
        });
    });

    // Ajustar visibilidade dos botões de voltar
    const btnVoltarCaderno = document.getElementById('btn-voltar-caderno');
    const btnVoltarHeader = document.getElementById('btn-voltar-header');

    if (btnVoltarCaderno) btnVoltarCaderno.style.display = 'none';
    if (btnVoltarHeader) btnVoltarHeader.style.display = 'block';
}