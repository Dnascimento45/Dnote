import { materias } from '../dados.js';
import { renderizarLivro } from './livro.js';
import { voltarDashboard } from '../animacoes.js';

const somHover = new Audio('assets/hover.mp3');

export function renderizarDashboard() {
    const container = document.getElementById('dashboard');
    if (!container) return;

    container.innerHTML = '';

    materias.forEach(materia => {
        const card = document.createElement('div');
        card.className = 'capa-card';
        card.style.backgroundImage = `url(${materia.imagem})`;
        card.dataset.id = materia.id;

        card.addEventListener('mouseenter', () => {
            somHover.currentTime = 0;
            somHover.play().catch(() => {});
        });

        card.addEventListener('click', () => {
            const overlay = document.getElementById('overlay-transicao');
            if (overlay) overlay.classList.add('ativa');

            container.classList.add('dashboard-recua');

            const btnVoltarHeader = document.getElementById('btn-voltar-header');
            if (btnVoltarHeader) {
                btnVoltarHeader.style.display = 'block';
                btnVoltarHeader.addEventListener('click', () => {
                    voltarDashboard();
                });
            }

            setTimeout(() => {
                document.getElementById('dashboard').style.display = 'none';
                document.getElementById('livro').style.display = 'block';
                if (overlay) overlay.classList.remove('ativa');

                renderizarLivro(materia.id);
            }, 300);
        });

        container.appendChild(card);
    });
}