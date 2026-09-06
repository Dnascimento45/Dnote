import { materias } from '../dados.js';


export function renderizarLivro(idMateria) {
    const materia = materias.find(m => m.id === idMateria);
    const livro = document.getElementById('livro');
    
    livro.style.display = 'block';
    
    livro.innerHTML = `
        <div class="lista-conteudos itens-${materia.conteudos.length}">
            ${materia.conteudos.map(conteudo => `
                <button class="btn-conteudo" data-conteudo="${conteudo}">
                    ${conteudo}
                </button>
            `).join('')}
        </div>

       
    <div class="video-container">
        <video autoplay loop muted playsinline>
            <source src="assets/video_bg.mp4" type="video/mp4">
        </video>
    </div>

    `;
}