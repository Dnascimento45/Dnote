export function voltarDashboard() {
    const dashboard = document.getElementById('dashboard');
    const livro = document.getElementById('livro');

    if (dashboard && livro) {
        dashboard.style.display = 'flex';
        livro.style.display = 'none';
    }
}