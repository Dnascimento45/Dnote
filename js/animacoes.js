export function voltarDashboard() {
    const dashboard = document.getElementById('dashboard');
    const livro = document.getElementById('livro');

    if (dashboard && livro) {
        dashboard.style.display = 'grid';
        livro.style.display = 'none';
    }
}