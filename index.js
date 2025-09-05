document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");

    // ===== MENU LATERAL =====
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
        body.classList.toggle('menu-open');
    });

    // ===== SWITCH DE TEMA =====
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    });

    // ===== ESTRELAS DIAGONAIS (CORRIGIDO) =====
    const totalStars = 150;
    const starContainer = document.getElementById('star-container');

    if (starContainer) { // Adiciona uma verificação para segurança
        for (let i = 0; i < totalStars; i++) {
            const star = document.createElement('div');
            star.classList.add('background-star');

            star.style.top = Math.random() * window.innerHeight + 'px';
            star.style.left = Math.random() * window.innerWidth + 'px';
            const size = Math.random() * 3 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDuration = (Math.random() * 5 + 3) + 's';

            starContainer.appendChild(star);
        }

        window.addEventListener('resize', () => {
            document.querySelectorAll('.background-star').forEach(star => {
                star.style.top = Math.random() * window.innerHeight + 'px';
                star.style.left = Math.random() * window.innerWidth + 'px';
            });
        });
    }

    const togglePassword = document.getElementById('togglePassword');
    const senha = document.getElementById('senha');

    togglePassword.addEventListener('click', () => {
        // alterna o tipo do input
        const type = senha.getAttribute('type') === 'password' ? 'text' : 'password';
        senha.setAttribute('type', type);

        // alterna o ícone
        togglePassword.classList.toggle('fa-eye-slash');
    });
});