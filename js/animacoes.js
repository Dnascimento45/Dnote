export function voltarDashboard() {
    const dashboard = document.getElementById('dashboard');
    const livro = document.getElementById('livro');
    const btnVoltarHeader = document.getElementById('btn-voltar-header');
    const btnVoltarCaderno = document.getElementById('btn-voltar-caderno');
    const overlay = document.getElementById('overlay-transicao');

    // Esconder ambos os botões de voltar
    if (btnVoltarHeader) btnVoltarHeader.style.display = 'none';
    if (btnVoltarCaderno) btnVoltarCaderno.style.display = 'none';

    if (dashboard && livro) {
        livro.style.display = 'none';
        dashboard.style.display = 'grid';
        dashboard.classList.remove('dashboard-recua');

        // Aplicar estado inicial (pequeno e invisível)
        dashboard.style.transition = 'none';
        dashboard.style.transform = 'scale(0.7)';
        dashboard.style.opacity = '0';

        // Forçar reflow
        void dashboard.offsetHeight;

        // Religar transição e animar
        dashboard.style.transition = '';
        dashboard.style.transform = 'scale(1)';
        dashboard.style.opacity = '1';

        // Limpar overlay
        if (overlay) overlay.classList.remove('ativa');

        // Remover estado de caderno
        document.body.classList.remove('modo-caderno');

        // Limpar estilos inline após a animação
        setTimeout(() => {
            dashboard.style.transform = '';
            dashboard.style.opacity = '';
            dashboard.style.transition = '';
        }, 500);
    }
}