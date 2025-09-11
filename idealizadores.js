document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('DOMContentLoaded', () => {

        // Pegando elementos importantes
        const menuToggle = document.querySelector('.menu-toggle'); // botão do menu
        const sideMenu = document.querySelector('.menu'); // menu lateral
        const themeToggle = document.getElementById('theme-toggle'); // switch de tema

        // Formulários
        const registroForm = document.getElementById('registroForm');
        const registroNome = document.getElementById('registroNome');
        const registroEmail = document.getElementById('registroEmail');
        const registroCPF = document.getElementById('registroCPF');
        const registroSenha = document.getElementById('registroSenha');
        const registroConfirmaSenha = document.getElementById('registroConfirmaSenha');
        const registroNomeError = document.getElementById('registroNomeError');
        const registroEmailError = document.getElementById('registroEmailError');
        const registroCPFError = document.getElementById('registroCPFError');
        const registroSenhaError = document.getElementById('registroSenhaError');
        const registroConfirmaSenhaError = document.getElementById('registroConfirmaSenhaError');

        const loginForm = document.getElementById('loginForm');
        const loginEmail = document.getElementById('loginEmail');
        const loginSenha = document.getElementById('loginSenha');
        const loginEmailError = document.getElementById('loginEmailError');
        const loginSenhaError = document.getElementById('loginSenhaError');

        // Cursos
        const searchInput = document.querySelector('.search-input'); // campo de pesquisa
        const courseCards = document.querySelectorAll('.course-card'); // todos os cards de curso

        // Menu lateral
        if (menuToggle && sideMenu) {
            menuToggle.addEventListener('click', () => {
                // abre ou fecha o menu
                sideMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                // acessibilidade: informa se o menu está aberto
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                sideMenu.setAttribute('aria-hidden', isExpanded);
            });
        }

        // Escolha de tema (claro/escuro)
        if (themeToggle) {
            const applySavedTheme = () => {
                // pega o tema salvo, ou usa dark como padrão
                const savedTheme = localStorage.getItem('theme') || 'dark';
                document.body.classList.toggle('light-theme', savedTheme === 'light');
                themeToggle.checked = savedTheme === 'light';
            };
            applySavedTheme();

            themeToggle.addEventListener('change', () => {
                // quando muda, salva a preferência e aplica o tema
                const isLight = themeToggle.checked;
                document.body.classList.toggle('light-theme', isLight);
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }

        // Busca de cursos
        if (searchInput && courseCards.length) {
            searchInput.addEventListener('input', () => {
                const term = searchInput.value.toLowerCase().trim();
                courseCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    card.style.display = title.includes(term) ? 'flex' : 'none';
                });
            });
        }

        // Mostrar/esconder senha
        const setupPasswordToggle = (toggleId, inputId) => {
            const toggle = document.getElementById(toggleId);
            const input = document.getElementById(inputId);
            if (!toggle || !input) return;

            toggle.addEventListener('click', () => {
                // troca o tipo de input e o ícone
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                const icon = toggle.querySelector('i');
                icon.classList.toggle('fa-eye', type === 'password');
                icon.classList.toggle('fa-eye-slash', type === 'text');
            });
        };

        setupPasswordToggle('toggleRegistroSenha', 'registroSenha');
        setupPasswordToggle('toggleRegistroConfirmaSenha', 'registroConfirmaSenha');
        setupPasswordToggle('toggleLoginSenha', 'loginSenha');

        // Formatar CPF
        if (registroCPF) {
            registroCPF.addEventListener('input', e => {
                let v = e.target.value.replace(/\D/g, ''); // tira tudo que não é número
                v = v.replace(/(\d{3})(\d)/, '$1.$2');
                v = v.replace(/(\d{3})(\d)/, '$1.$2');
                v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = v;
            });
        }

        // Validação do formulário de registro
        if (registroForm) {
            const showError = (input, errorEl, message) => {
                input.classList.add('input-error');
                errorEl.textContent = message;
            };
            const clearError = (input, errorEl) => {
                input.classList.remove('input-error');
                errorEl.textContent = '';
            };

            const passwordRules = {
                length: registroForm.querySelector('.password-rules li:nth-child(1)'),
                number: registroForm.querySelector('.password-rules li:nth-child(2)'),
                uppercase: registroForm.querySelector('.password-rules li:nth-child(3)')
            };

            registroSenha?.addEventListener('input', () => {
                const val = registroSenha.value;
                passwordRules.length?.classList.toggle('valid', val.length >= 8);
                passwordRules.number?.classList.toggle('valid', /\d/.test(val));
                passwordRules.uppercase?.classList.toggle('valid', /[A-Z]/.test(val));
            });

            registroForm.addEventListener('submit', e => {
                e.preventDefault();
                let isValid = true;

                // limpa erros anteriores
                clearError(registroNome, registroNomeError);
                clearError(registroEmail, registroEmailError);
                clearError(registroCPF, registroCPFError);
                clearError(registroSenha, registroSenhaError);
                clearError(registroConfirmaSenha, registroConfirmaSenhaError);

                if (registroNome.value.trim().length < 3) { showError(registroNome, registroNomeError, 'O nome completo é obrigatório.'); isValid = false; }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registroEmail.value.trim())) { showError(registroEmail, registroEmailError, 'Por favor insira um email válido.'); isValid = false; }
                if (registroCPF.value.length !== 14) { showError(registroCPF, registroCPFError, 'O CPF deve ter 11 dígitos.'); isValid = false; }
                if (registroSenha.value.length < 8 || !/\d/.test(registroSenha.value) || !/[A-Z]/.test(registroSenha.value)) { showError(registroSenha, registroSenhaError, 'A senha não atende aos critérios abaixo.'); isValid = false; }
                if (registroConfirmaSenha.value !== registroSenha.value) { showError(registroConfirmaSenha, registroConfirmaSenhaError, 'As senhas não coincidem.'); isValid = false; }

                if (isValid) {
                    alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${registroNome.value.trim()}! 🚀`);
                    registroForm.reset();
                    Object.values(passwordRules).forEach(rule => rule.classList.remove('valid'));
                }
            });
        }

        // Validação do login
        if (loginForm) {
            const showError = (input, errorEl, message) => {
                input.classList.add('input-error');
                errorEl.textContent = message;
            };
            const clearError = (input, errorEl) => {
                input.classList.remove('input-error');
                errorEl.textContent = '';
            };

            loginForm.addEventListener('submit', e => {
                e.preventDefault();
                let isValid = true;
                clearError(loginEmail, loginEmailError);
                clearError(loginSenha, loginSenhaError);

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.value.trim())) { showError(loginEmail, loginEmailError, 'Por favor insira um email válido.'); isValid = false; }
                if (loginSenha.value.length < 8) { showError(loginSenha, loginSenhaError, 'A senha deve ter pelo menos 8 caracteres.'); isValid = false; }

                if (isValid) {
                    alert(`Login realizado com sucesso!\nBem-vindo(a), ${loginEmail.value.trim()}! 🚀`);
                    loginForm.reset();
                }
            });
        }

    });


});