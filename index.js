document.addEventListener("DOMContentLoaded", () => {
    // ===== MENU LATERAL =====
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const body = document.body;

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('show');
            body.classList.toggle('menu-open');
        });
    }

    // ===== SWITCH DE TEMA =====
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
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
    }

    // ===== ESTRELAS DE FUNDO =====
    const totalStars = 150;
    const starContainer = document.getElementById('star-container');

    if (starContainer) {
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

    // ===== TOGGLE SENHA =====
    const togglePassword = document.getElementById("togglePassword");
    const senha = document.getElementById("senha");

    if (togglePassword && senha) {
        togglePassword.addEventListener("click", () => {
            const type = senha.type === "password" ? "text" : "password";
            senha.type = type;
            togglePassword.classList.toggle("fa-eye-slash");
        });
    }

    const toggleConfirma = document.getElementById("toggleConfirmaSenha");
    const confirmaSenha = document.getElementById("confirmaSenha");

    if (toggleConfirma && confirmaSenha) {
        toggleConfirma.addEventListener("click", () => {
            const type = confirmaSenha.type === "password" ? "text" : "password";
            confirmaSenha.type = type;
            toggleConfirma.classList.toggle("fa-eye-slash");
        });
    }

    // ===== MÁSCARA DE CPF =====
    const cpfInput = document.getElementById("cpf");
    if (cpfInput) {
        cpfInput.addEventListener("input", () => {
            let value = cpfInput.value.replace(/\D/g, "");
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 9) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            } else if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
            } else if (value.length > 3) {
                value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
            }
            cpfInput.value = value;
        });
    }

    // ===== VALIDAÇÃO DO FORMULÁRIO =====
    const form = document.getElementById("registroForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            if (senha.value !== confirmaSenha.value) {
                e.preventDefault();
                alert("As senhas não coincidem!");
                return;
            }

            if (!cpfInput || cpfInput.value.length < 14) {
                e.preventDefault();
                alert("Digite um CPF válido!");
                return;
            }
        });
    }
});