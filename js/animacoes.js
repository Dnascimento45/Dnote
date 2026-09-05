export function voltarDashboard(idMateria) {
    const dashboard = document.getElementById('dashboard');
    const livro = document.getElementById('livro');
    const btnVoltarHeader = document.getElementById('btn-voltar-header');

    if (dashboard && livro) {
        // 1. Esconder o livro
        livro.style.display = 'none';

        // 2. Mostrar a dashboard (mas ela continua com a classe de recuo)
        dashboard.style.display = 'grid';

        // 3. Remover a classe de recuo (ela volta com zoom in)
        dashboard.classList.remove('dashboard-recua');

        // 4. Esconder o botão voltar
        if (btnVoltarHeader) {
            btnVoltarHeader.style.display = 'none';
        }
    }
}