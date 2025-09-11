document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.menu');
    const themeToggle = document.getElementById('theme-toggle');
    const evaluationForm = document.getElementById('evaluationForm');

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    if (themeToggle) {
        // Função para aplicar o tema salvo no localStorage
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme') || 'dark'; // Padrão para dark
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                themeToggle.checked = true;
            } else {
                document.body.classList.remove('light-theme');
                themeToggle.checked = false;
            }
        };

        // Aplica o tema ao carregar a página
        applySavedTheme();

        // Listener para mudar o tema
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

    if (evaluationForm) {
        evaluationForm.addEventListener('submit', (e) => {
            // Previne o comportamento padrão de recarregar a página
            e.preventDefault();

            // Aqui você pode adicionar a lógica para enviar os dados do formulário
            // para um servidor. Por enquanto, vamos apenas mostrar uma mensagem de sucesso.

            // Exibe uma mensagem de agradecimento
            alert('Avaliação enviada com sucesso! \n\nObrigado por nos ajudar a melhorar. ✨');

            // Limpa o formulário após o envio
            evaluationForm.reset();
        });
    }

});