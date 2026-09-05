import { materias } from '../dados.js';
import { renderizarLivro } from './livro.js';
import { voltarDashboard } from '../animacoes.js';

// Áudio de hover (continua igual)
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

        // Som de hover
        card.addEventListener('mouseenter', () => {
            somHover.currentTime = 0;
            somHover.play();
        });

        // Clique (novo conceito: a dashboard recua)
        card.addEventListener('click', () => {
            // 1. Ativar o overlay escuro
            const overlay = document.getElementById('overlay-transicao');
            if (overlay) overlay.classList.add('ativa');

            // 2. Aplicar a classe que faz a DASHBOARD INTEIRA encolher e sumir
            container.classList.add('dashboard-recua');

            // 3. Mostrar o botão voltar no header
            const btnVoltarHeader = document.getElementById('btn-voltar-header');
            if (btnVoltarHeader) {
                btnVoltarHeader.style.display = 'block';
                btnVoltarHeader.addEventListener('click', () => {
                    voltarDashboard(materia.id);
                });
            }

            // 4. Após 2 segundos (tempo da animação), esconder dashboard e mostrar livro
            setTimeout(() => {
                document.getElementById('dashboard').style.display = 'none';
                document.getElementById('livro').style.display = 'block';
                if (overlay) overlay.classList.remove('ativa');

                renderizarLivro(materia.id);
            }, 500);
        });

        container.appendChild(card);
    });
}