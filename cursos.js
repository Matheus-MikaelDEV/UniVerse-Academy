document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. ELEMENTOS GLOBAIS E DA PÁGINA DE CURSOS =====
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.menu');
    const themeToggle = document.getElementById('theme-toggle');

    // Elementos específicos da página de Cursos
    const searchInput = document.querySelector('.search-input');
    const courseCards = document.querySelectorAll('.course-card');

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

    // ===== 4. FILTRO DE BUSCA DE CURSOS (NOVA FUNCIONALIDADE) =====
    if (searchInput && courseCards.length > 0) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();

            courseCards.forEach(card => {
                // Pega o texto do título do curso dentro do card
                const courseTitle = card.querySelector('h3').textContent.toLowerCase();

                // Verifica se o título do curso inclui o termo pesquisado
                if (courseTitle.includes(searchTerm)) {
                    card.style.display = 'flex'; // Mostra o card
                } else {
                    card.style.display = 'none'; // Esconde o card
                }
            });
        });
    }

});