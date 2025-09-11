document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. ELEMENTOS GLOBAIS =====
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.menu');
    const themeToggle = document.getElementById('theme-toggle');

    // ===== 2. FUNCIONALIDADE DO MENU LATERAL =====
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna as classes para mostrar/esconder o menu e animar o ícone
            sideMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Melhora a acessibilidade informando o estado do menu
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            sideMenu.setAttribute('aria-hidden', isExpanded);
        });
    }

    // ===== 3. FUNCIONALIDADE DO SELETOR DE TEMA (DARK/LIGHT) =====
    if (themeToggle) {
        // Função para aplicar o tema salvo no localStorage ao carregar a página
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme') || 'dark'; // 'dark' é o padrão
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                themeToggle.checked = true;
            } else {
                document.body.classList.remove('light-theme');
                themeToggle.checked = false;
            }
        };
        applySavedTheme();

        // Listener para salvar a preferência do usuário quando ele muda o tema
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

});