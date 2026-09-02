import { renderizarDashboard } from './modules/dashboard.js';
import { carregarView } from './carregarView.js'; // vamos criar essa função

// Função para carregar uma view (HTML) dinamicamente
async function carregarView(nomeView, callback) {
    try {
        const resposta = await fetch(`views/${nomeView}.html`);
        const html = await resposta.text();
        const app = document.getElementById('app');
        app.innerHTML = html;
        if (callback) callback();
    } catch (erro) {
        console.error('Erro ao carregar view:', erro);
    }
}

// Inicialização: carregar a Tela 1 (Dashboard)
carregarView('dashboard', () => {
    renderizarDashboard();
});