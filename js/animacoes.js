export function voltarDashboard(idMateria) {
    const dashboard = document.getElementById('dashboard');
    const livro = document.getElementById('livro');
    const btnVoltarHeader = document.getElementById('btn-voltar-header');

    if (dashboard && livro) {
        // 1. Esconde o livro
        livro.style.display = 'none';

        // 2. Mostra o dashboard, mas já o coloca no estado "pequeno e invisível"
        dashboard.style.display = 'grid';
        dashboard.style.transform = 'scale(0.7)';
        dashboard.style.opacity = '0';

        // 3. O TRUQUE DO REFLOW: Força o navegador a "pintar" esse estado pequeno/invisível
        void dashboard.offsetHeight; 

        // 4. Agora sim, anima para o estado normal (zoom in + fade in)
        dashboard.style.transform = 'scale(1)';
        dashboard.style.opacity = '1';

        // 5. Esconde o botão voltar
        if (btnVoltarHeader) {
            btnVoltarHeader.style.display = 'none';
        }
    }
}