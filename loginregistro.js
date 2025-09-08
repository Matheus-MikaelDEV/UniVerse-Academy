document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. ELEMENTOS =====
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const themeToggle = document.getElementById('themeToggle');

    // FORMULÁRIO REGISTRO
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

    // FORMULÁRIO LOGIN
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginSenha = document.getElementById('loginSenha');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginSenhaError = document.getElementById('loginSenhaError');

    // ===== 2. MENU LATERAL =====
    if(menuToggle && sideMenu){
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');

            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            sideMenu.setAttribute('aria-hidden', isExpanded);
        });
    }

    // ===== 3. TEMA =====
    if(themeToggle){
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            if(savedTheme === 'light'){
                document.body.classList.add('light-theme');
                themeToggle.checked = true;
            } else {
                document.body.classList.remove('light-theme');
                themeToggle.checked = false;
            }
        };
        applySavedTheme();

        themeToggle.addEventListener('change', () => {
            if(themeToggle.checked){
                document.body.classList.add('light-theme');
                localStorage.setItem('theme','light');
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme','dark');
            }
        });
    }

    // ===== 4. SHOW/HIDE SENHA =====
    const setupPasswordToggle = (toggleId, inputId) => {
        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);
        if(toggle && input){
            toggle.addEventListener('click', () => {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                const icon = toggle.querySelector('i');
                if(type === 'password'){
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                } else {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            });
        }
    };

    setupPasswordToggle('toggleRegistroSenha', 'registroSenha');
    setupPasswordToggle('toggleRegistroConfirmaSenha', 'registroConfirmaSenha');
    setupPasswordToggle('toggleLoginSenha', 'loginSenha');

    // ===== 5. FORMATAÇÃO CPF =====
    if(registroCPF){
        registroCPF.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g,'');
            v = v.replace(/(\d{3})(\d)/,'$1.$2');
            v = v.replace(/(\d{3})(\d)/,'$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
            e.target.value = v;
        });
    }

    // ===== 6. VALIDAÇÃO REGISTRO =====
    if(registroForm){
        const showError = (input,errorEl,message) => { input.classList.add('input-error'); errorEl.textContent = message; };
        const clearError = (input,errorEl) => { input.classList.remove('input-error'); errorEl.textContent = ''; };

        const passwordRules = {
            length: registroForm.querySelector('.password-rules li:nth-child(1)'),
            number: registroForm.querySelector('.password-rules li:nth-child(2)'),
            uppercase: registroForm.querySelector('.password-rules li:nth-child(3)')
        };

        if(registroSenha && passwordRules.length){
            registroSenha.addEventListener('input', () => {
                const val = registroSenha.value;
                val.length >=8 ? passwordRules.length.classList.add('valid') : passwordRules.length.classList.remove('valid');
                /\d/.test(val) ? passwordRules.number.classList.add('valid') : passwordRules.number.classList.remove('valid');
                /[A-Z]/.test(val) ? passwordRules.uppercase.classList.add('valid') : passwordRules.uppercase.classList.remove('valid');
            });
        }

        registroForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            let isValid = true;
            clearError(registroNome, registroNomeError);
            clearError(registroEmail, registroEmailError);
            clearError(registroCPF, registroCPFError);
            clearError(registroSenha, registroSenhaError);
            clearError(registroConfirmaSenha, registroConfirmaSenhaError);

            if(registroNome.value.trim().length<3){ showError(registroNome, registroNomeError,'O nome completo é obrigatório.'); isValid=false; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(registroEmail.value.trim())){ showError(registroEmail, registroEmailError,'Por favor insira um email válido.'); isValid=false; }
            if(registroCPF.value.length !== 14){ showError(registroCPF, registroCPFError,'O CPF deve ter 11 dígitos.'); isValid=false; }
            if(registroSenha.value.length<8 || !/\d/.test(registroSenha.value) || !/[A-Z]/.test(registroSenha.value)){ showError(registroSenha, registroSenhaError,'A senha não atende aos critérios abaixo.'); isValid=false; }
            if(registroConfirmaSenha.value !== registroSenha.value){ showError(registroConfirmaSenha, registroConfirmaSenhaError,'As senhas não coincidem.'); isValid=false; }

            if(isValid){
                alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${registroNome.value.trim()}! 🚀`);
                registroForm.reset();
                Object.values(passwordRules).forEach(rule => rule.classList.remove('valid'));
            }
        });
    }

    // ===== 7. VALIDAÇÃO LOGIN =====
    if(loginForm){
        const showError = (input,errorEl,message) => { input.classList.add('input-error'); errorEl.textContent = message; };
        const clearError = (input,errorEl) => { input.classList.remove('input-error'); errorEl.textContent = ''; };

        loginForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            let isValid = true;
            clearError(loginEmail, loginEmailError);
            clearError(loginSenha, loginSenhaError);

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(loginEmail.value.trim())){ showError(loginEmail, loginEmailError,'Por favor insira um email válido.'); isValid=false; }
            if(loginSenha.value.length<8){ showError(loginSenha, loginSenhaError,'A senha deve ter pelo menos 8 caracteres.'); isValid=false; }

            if(isValid){
                alert(`Login realizado com sucesso!\nBem-vindo(a), ${loginEmail.value.trim()}! 🚀`);
                loginForm.reset();
            }
        });
    }

});