export function voltarDashboard(idMateria) {
    const dashboard = document.getElementById('dashboard');
    const livro = document.getElementById('livro');
    const btnVoltarHeader = document.getElementById('btn-voltar-header');
    const overlay = document.getElementById('overlay-transicao');

    if (dashboard && livro) {
        // 1. Esconder o livro
        livro.style.display = 'none';

        // 2. Mostrar o dashboard
        dashboard.style.display = 'grid';

        // 3. Remover a classe que bloqueia cliques
        dashboard.classList.remove('dashboard-recua');

        // 4. Desligar a transição para aplicar o estado inicial sem animação
        dashboard.style.transition = 'none';

        // 5. Aplicar o estado inicial (pequeno e invisível)
        dashboard.style.transform = 'scale(0.7)';
        dashboard.style.opacity = '0';

        // 6. Forçar o navegador a processar o estado pequeno
        void dashboard.offsetHeight;

        // 7. Religar a transição
        dashboard.style.transition = '';

        // 8. Animar para o estado final (zoom in)
        dashboard.style.transform = 'scale(1)';
        dashboard.style.opacity = '1';

        // 9. Esconder o botão voltar
        if (btnVoltarHeader) {
            btnVoltarHeader.style.display = 'none';
        }

        // 10. Garantir que o overlay não bloqueie cliques
        if (overlay) {
            overlay.classList.remove('ativa');
        }

        document.body.classList.remove('modo-caderno');

        // 11. **NOVO:** Limpar os estilos inline após a animação (500ms)
        setTimeout(() => {
            dashboard.style.transform = '';
            dashboard.style.opacity = '';
            dashboard.style.transition = '';
        }, 500);
    }
}