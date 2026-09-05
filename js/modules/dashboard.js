import { materias } from '../dados.js';
import { renderizarLivro } from './livro.js';
import { voltarDashboard } from '../animacoes.js';

// Cria o objeto de áudio UMA única vez (fora do loop)
const somHover = new Audio('assets/hover.mp3');

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

        // Evento de hover (som)
        card.addEventListener('mouseenter', () => {
            somHover.currentTime = 0;
            somHover.play();
        });

        // Evento de clique (transição)
        card.addEventListener('click', () => {
            // 1. Obter posição
            const rect = card.getBoundingClientRect();
        
            // 2. Placeholder
            const placeholder = document.createElement('div');
            placeholder.style.width = `${rect.width}px`;
            placeholder.style.height = `${rect.height}px`;
            placeholder.style.visibility = 'hidden';
            placeholder.style.position = 'relative';
            card.parentNode.insertBefore(placeholder, card);
        
            // 3. Calcular deltas
            const centroCardX = rect.left + rect.width / 2;
            const centroCardY = rect.top + rect.height / 2;
            const centroTelaX = window.innerWidth / 2;
            const centroTelaY = window.innerHeight / 2;
            const deltaX = centroTelaX - centroCardX;
            const deltaY = centroTelaY - centroCardY;
        
            // 4. ESTADO INICIAL (com sinal de MENOS)
            card.style.transform = `translate(calc(-50% - ${deltaX}px), calc(-50% - ${deltaY}px)) scale(1)`;
        
            // 5. FORÇAR O NAVEGADOR A PINTAR O ESTADO INICIAL (Truque do Reflow)
            void card.offsetHeight;
        
            // 6. ATIVAR A TRANSIÇÃO (Classe que tem o transition no CSS)
            card.classList.add('expandindo');
        
            // 7. ESTADO FINAL (Centralizado e crescendo)
            card.style.transform = `translate(-50%, -50%) scale(5)`;
        
            // 8. Overlay
            const overlay = document.getElementById('overlay-transicao');
            if (overlay) overlay.classList.add('ativa');
        
            // 9. Troca de tela
            setTimeout(() => {
                document.getElementById('dashboard').style.display = 'none';
                document.getElementById('livro').style.display = 'block';
        
                placeholder.remove();
                card.classList.remove('expandindo');
                card.style.transform = '';
                if (overlay) overlay.classList.remove('ativa');
                
                // Mostrar o botão voltar no header
                const btnVoltarHeader = document.getElementById('btn-voltar-header');
                if (btnVoltarHeader) {
                    btnVoltarHeader.style.display = 'block';
                    btnVoltarHeader.addEventListener('click', voltarDashboard);
                }
        
                renderizarLivro(materia.id);
            }, 2000);
        });

        container.appendChild(card);
    });
}