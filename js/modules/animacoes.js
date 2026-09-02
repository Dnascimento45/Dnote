// Nesta versão inicial, a transição será apenas um fade
// Exportamos uma função que recebe o elemento e a view destino

export function expandirCapa(elementoCard, idViewDestino) {
    // Por enquanto, apenas ativamos a view destino (sem animação)
    // Mas vamos manter a estrutura para depois adicionar zoom
    const view = document.getElementById(idViewDestino);
    if (view) {
        view.classList.add('ativa');
    }
}

export function voltarDashboard() {
    // Fecha a view ativa
    const viewAtiva = document.querySelector('.view-conteudo.ativa');
    if (viewAtiva) {
        viewAtiva.classList.remove('ativa');
    }
}