export function voltarDashboard() {
    const dashboard = document.getElementById('dashboard');
    const livro = document.getElementById('livro');
    const btnVoltarHeader = document.getElementById('btn-voltar-header');

    if (dashboard && livro) {
        dashboard.style.display = 'grid';
        livro.style.display = 'none';

          // Esconder o botão voltar do header
          if (btnVoltarHeader) {
            btnVoltarHeader.style.display = 'none';
        }
    }
}