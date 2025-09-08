document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. SELEÇÃO DOS ELEMENTOS =====
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.menu');
    const themeToggle = document.getElementById('theme-toggle');


    // ===== 2. FUNCIONALIDADE DO MENU LATERAL =====
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'active' para mostrar/esconder o menu e animar o botão
            menuToggle.classList.toggle('active');
            sideMenu.classList.toggle('active');

            // Atualiza os atributos de acessibilidade
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            sideMenu.setAttribute('aria-hidden', isExpanded);
        });
    }


    // ===== 3. FUNCIONALIDADE DO SELETOR DE TEMA (LIGHT/DARK) =====
    if (themeToggle) {
        // Função para aplicar o tema salvo no localStorage ao carregar a página
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme') || 'dark'; // Padrão é 'dark'

            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                themeToggle.checked = true; // Marca o checkbox se o tema for claro
            } else {
                document.body.classList.remove('light-theme');
                themeToggle.checked = false; // Desmarca o checkbox se o tema for escuro
            }
        };

        // Aplica o tema assim que a página carrega
        applySavedTheme();

        // Adiciona o evento que troca o tema quando o checkbox é alterado
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light'); // Salva a preferência
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark'); // Salva a preferência
            }
        });
    }

});