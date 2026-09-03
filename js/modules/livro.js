import { materias } from '../dados.js';
import { voltarDashboard } from '../animacoes.js';

export function renderizarLivro(idMateria) {
    const materia = materias.find(m => m.id === idMateria);
    const livro = document.getElementById('livro');
    
    // Monta a tela do livro dentro da section que já existe no index.html
    livro.style.display = 'block';
    livro.innerHTML = `
        <div class="livro-header">
            <button id="btn-voltar" class="btn-voltar">← Voltar</button>
            <h1>${materia.titulo}</h1>
        </div>
        <div class="livro-conteudo">
           <h2>Escolha um conteúdo:</h2>
        <div class="lista-conteudos">
            ${materia.conteudos.map(conteudo => `
                <button class="btn-conteudo" data-conteudo="${conteudo}">
                    ${conteudo}
                </button>
            `).join('')}
             </div>
        </div>
    `;

    document.getElementById('btn-voltar').addEventListener('click', voltarDashboard);
}