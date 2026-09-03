import { materias } from '../dados.js';
import { renderizarLivro } from './livro.js';

export function renderizarDashboard() {
    const container = document.getElementById('dashboard');
    if (!container) return;

    container.innerHTML = '';

    materias.forEach(materia => {
        console.log(materia)
        const card = document.createElement('div');
        card.className = 'capa-card';
        card.style.backgroundImage = `url(${materia.imagem})`;
        card.dataset.id = materia.id;

        // ADICIONADO O EVENTO DE CLIQUE
        card.addEventListener('click', () => {
            // Esconde o dashboard
            document.getElementById('dashboard').style.display = 'none';
            
            document.getElementById('livro').style.display='block';
            // Carrega a tela do livro usando o fetch (mas se falhar, o dashboard não some)
            carregarView('livro', () => {
                renderizarLivro(materia.id);
            });
        });

        container.appendChild(card);
    });
}