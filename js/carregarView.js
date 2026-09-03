export async function carregarView(nomeView, callback) {
    console.log('carregando view:', nomeView);
    try {
        const resposta = await fetch(`views/${nomeView}.html`);
        const html = await resposta.text();
        
        // Preenche o container principal com o HTML da view
        document.getElementById('app').innerHTML = html;
        
        const app = document.getElementById('app'); app.innerHTML = html;

        if (callback) callback();
    } catch (erro) {
        console.error('Erro ao carregar view:', erro);
    }
}