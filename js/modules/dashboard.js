import { materias } from './dados.js';
import { expandirCapa } from './animacoes.js';

export function renderizarDashboard() {
    const container = document.getElementById('dashboard');
    if (!container) return;

    container.innerHTML = '';

    materias.forEach(materia => {
        const card = document.createElement('div');
        card.className = 'capa-card';
        //adiciona estilo inline para imagem
        card.style.backgroundImage = `url(${materia.imagem})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.dataset.id = materia.id;
        

        card.innerHTML = `
            <div class="capa-overlay">
            <div class="capa-label"
                <h2>${materia.titulo}</h2>
                <div class="formula">${materia.formula}</div>
            </div>
            </div>
        `;

        // Quando clicar no card, vamos abrir a Tela 2 (matérias)
        // Por enquanto, só um alert para testar
        card.addEventListener('click', () => {
            alert(`Clicou em ${materia.titulo}`);
            // Depois vamos chamar expandirCapa e carregar a Tela 2
        });

        container.appendChild(card);
    });
}