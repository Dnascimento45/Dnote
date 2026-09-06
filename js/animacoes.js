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

         // 3. REMOVER A CLASSE QUE BLOQUEIA OS CLIQUES (aqui está o problema!)
         dashboard.classList.remove('dashboard-recua');

         // 3. Aplicar o estado inicial (pequeno e invisível) para a animação
         dashboard.style.transform = 'scale(0.7)';
         dashboard.style.opacity = '0';

        // 4. O TRUQUE DO REFLOW: Força o navegador a "pintar" esse estado pequeno/invisível
        void dashboard.offsetHeight; 

        // 5. Agora sim, anima para o estado normal (zoom in + fade in)
        dashboard.style.transform = 'scale(1)';
        dashboard.style.opacity = '1';

        // 6. Esconde o botão voltar
        if (btnVoltarHeader) {
            btnVoltarHeader.style.display = 'none';

             // 7. Garantir que o overlay não esteja bloqueando cliques
        if (overlay) {
            overlay.classList.remove('ativa');
        }

        // 8. Esconder o botão voltar
        if (btnVoltarHeader) {
            btnVoltarHeader.style.display = 'none';}
        }
    }
}