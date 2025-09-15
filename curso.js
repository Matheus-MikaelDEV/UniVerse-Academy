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

    // ====================================================================
    // ===== NOVAS FUNCIONALIDADES PARA A PÁGINA DO CURSO E MODAIS =====
    // ====================================================================

    // ===== 4. SELETORES DO DOM PARA A PÁGINA DO CURSO =====
    const videoPlayer = document.querySelector('.course-video-player iframe');
    const courseTitle = document.querySelector('.course-info h1');
    const courseDescription = document.querySelector('.course-info p');
    const moduleList = document.querySelector('.module-list');

    // ===== 5. SELETORES DO DOM PARA OS MODAIS =====
    const editBtn = document.getElementById('edit-course-btn');
    const addModuleBtn = document.getElementById('add-module-btn');
    const editModal = document.getElementById('edit-course-modal');
    const addModuleModal = document.getElementById('add-module-modal');
    const closeBtns = document.querySelectorAll('.close-btn, .cancel-btn');
    const editForm = document.getElementById('editForm');
    const addModuleForm = document.getElementById('addModuleForm');

    // ===== 6. FUNÇÕES PARA GERENCIAR MODAIS =====
    const openModal = (modal) => {
        modal.classList.add('active');
        // Adiciona um listener para fechar o modal ao clicar fora
        modal.addEventListener('click', closeModalOutside);
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        modal.removeEventListener('click', closeModalOutside);
    };

    const closeModalOutside = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(event.currentTarget);
        }
    };

    // Listeners para abrir os modais
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            const activeModule = document.querySelector('.module-item.active');
            if (activeModule) {
                const moduleId = parseInt(activeModule.dataset.id);
                const moduleToEdit = courseData.modules.find(mod => mod.id === moduleId);
                fillEditModal(moduleToEdit);
                openModal(editModal);
            } else {
                alert('Selecione um módulo para editar.');
            }
        });
    }

    if (addModuleBtn) {
        addModuleBtn.addEventListener('click', () => openModal(addModuleModal));
    }

    // Listeners para fechar os modais
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = event.target.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // ===== 7. DADOS E FUNÇÕES PARA GERENCIAR CONTEÚDO DINÂMICO =====

    // Estrutura de dados aprimorada com descrição e vídeo por módulo
    let courseData = {
        modules: [{
            id: 1,
            title: 'Módulo 1: A Origem do Cosmos',
            videoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Link de vídeo para o módulo 1
            description: 'Neste primeiro módulo, exploramos as teorias do Big Bang, a formação das primeiras partículas e a expansão inicial do universo.'
        }, {
            id: 2,
            title: 'Módulo 2: Estrelas e a Forja da Vida',
            videoLink: 'https://www.youtube.com/embed/nL7zH_A-P2Q', // Exemplo de outro vídeo
            description: 'Descubra como as estrelas nascem, evoluem e morrem, e como elas criam os elementos essenciais para a vida.'
        }, {
            id: 3,
            title: 'Módulo 3: Buracos Negros e o Fim do Tempo',
            videoLink: 'https://www.youtube.com/embed/W2-g5WpD4tU', // Exemplo de outro vídeo
            description: 'Viaje para o limite da física e entenda o que são os buracos negros e seu papel na estrutura do universo.'
        }, {
            id: 4,
            title: 'Módulo 4: Galáxias e a Estrutura do Universo',
            videoLink: 'https://www.youtube.com/embed/mG1C3f9l79o', // Exemplo de outro vídeo
            description: 'Finalize sua jornada explorando os diferentes tipos de galáxias e a organização do universo em larga escala.'
        }]
    };

    // Função para renderizar os módulos e carregar o primeiro módulo
    const renderModules = (modules) => {
        if (!moduleList) return;

        moduleList.innerHTML = ''; // Limpa a lista existente
        modules.forEach((mod, index) => {
            const moduleItem = document.createElement('div');
            moduleItem.classList.add('module-item');
            moduleItem.dataset.id = mod.id; // Adiciona o ID do módulo como um atributo de dados
            if (index === 0) {
                moduleItem.classList.add('active');
            }
            moduleItem.innerHTML = `
                <span class="module-title">${mod.title}</span>
                <i class="fas fa-play-circle module-icon"></i>
            `;
            moduleList.appendChild(moduleItem);
        });

        // Carrega o conteúdo do primeiro módulo por padrão
        loadModuleContent(modules[0]);
    };

    // Função para carregar o conteúdo de um módulo na seção principal
    const loadModuleContent = (module) => {
        if (videoPlayer) {
            videoPlayer.src = module.videoLink;
        }
        if (courseTitle) {
            courseTitle.textContent = module.title;
        }
        if (courseDescription) {
            courseDescription.textContent = module.description;
        }
    };

    // Preenche o modal de edição com os dados do módulo ativo
    const fillEditModal = (module) => {
        if (editModal && module) {
            document.getElementById('videoLink').value = module.videoLink;
            document.getElementById('courseTitle').value = module.title;
            document.getElementById('courseDescription').value = module.description;
        }
    };

    // Listener para o formulário de edição
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const activeModule = document.querySelector('.module-item.active');
            if (!activeModule) return;

            const moduleId = parseInt(activeModule.dataset.id);
            const moduleToEdit = courseData.modules.find(mod => mod.id === moduleId);

            const newVideoLink = document.getElementById('videoLink').value;
            const newTitle = document.getElementById('courseTitle').value;
            const newDescription = document.getElementById('courseDescription').value;

            // Atualiza os dados do módulo no objeto
            moduleToEdit.videoLink = newVideoLink;
            moduleToEdit.title = newTitle;
            moduleToEdit.description = newDescription;

            // Atualiza a visualização na página
            loadModuleContent(moduleToEdit);
            activeModule.querySelector('.module-title').textContent = newTitle;

            closeModal(editModal);
            alert('Módulo atualizado com sucesso!');
        });
    }

    // Listener para o formulário de adicionar novo módulo
    if (addModuleForm) {
        addModuleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newModuleTitle = document.getElementById('moduleTitle').value;

            // Cria um novo objeto de módulo e adiciona à lista
            const newModule = {
                id: courseData.modules.length + 1,
                title: newModuleTitle,
                videoLink: 'https://www.youtube.com/embed/placeholder', // Valor padrão para o novo módulo
                description: 'Nova descrição para este módulo.' // Valor padrão para o novo módulo
            };
            courseData.modules.push(newModule);

            // Re-renderiza a lista de módulos na página
            renderModules(courseData.modules);

            closeModal(addModuleModal);
            alert('Módulo adicionado com sucesso!');
        });
    }

    // Ativa a seleção do módulo e carrega o conteúdo correspondente
    if (moduleList) {
        moduleList.addEventListener('click', (e) => {
            const moduleItem = e.target.closest('.module-item');
            if (moduleItem) {
                // Remove a classe 'active' de todos os itens e adiciona ao clicado
                document.querySelectorAll('.module-item').forEach(item => {
                    item.classList.remove('active');
                });
                moduleItem.classList.add('active');

                const moduleId = parseInt(moduleItem.dataset.id);
                const selectedModule = courseData.modules.find(mod => mod.id === moduleId);
                loadModuleContent(selectedModule);
            }
        });
    }

    // Carrega o curso na inicialização
    renderModules(courseData.modules);
});