document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. ELEMENTOS GLOBAIS =====
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.menu');
    const themeToggle = document.getElementById('theme-toggle');

    // ===== 2. FUNCIONALIDADE DO MENU LATERAL =====
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');

            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            sideMenu.setAttribute('aria-hidden', isExpanded);
        });
    }

    // ===== 3. FUNCIONALIDADE DO SELETOR DE TEMA (DARK/LIGHT) =====
    if (themeToggle) {
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                themeToggle.checked = true;
            } else {
                document.body.classList.remove('light-theme');
                themeToggle.checked = false;
            }
        };
        applySavedTheme();

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
    // ===== NOVAS FUNCIONALIDADES PARA O PORTAL DO USUÁRIO =====
    // ====================================================================

    // ===== 4. SELETORES DO DOM PARA O PORTAL DO USUÁRIO =====
    const userAvatar = document.querySelector('.user-avatar');
    const userNameElement = document.querySelector('.user-info-text h2');
    const userBioElement = document.querySelector('.user-info-text p');
    const editProfilePicBtn = document.getElementById('edit-profile-pic-btn');
    const editProfileInfoBtn = document.getElementById('edit-profile-info-btn');

    // ===== 5. SELETORES DO DOM PARA OS MODAIS =====
    const editProfilePicModal = document.getElementById('edit-profile-pic-modal');
    const editProfileInfoModal = document.getElementById('edit-profile-info-modal');
    const closeBtns = document.querySelectorAll('.close-btn, .cancel-btn');
    const profilePicForm = document.getElementById('profilePicForm');
    const profileInfoForm = document.getElementById('profileInfoForm');

    // ===== 6. FUNÇÕES PARA GERENCIAR MODAIS =====
    const openModal = (modal) => {
        modal.classList.add('active');
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
    if (editProfilePicBtn) {
        editProfilePicBtn.addEventListener('click', () => openModal(editProfilePicModal));
    }

    if (editProfileInfoBtn) {
        editProfileInfoBtn.addEventListener('click', () => {
            // Remove "Olá, " e "!" para preencher o formulário
            const currentName = userNameElement.textContent.replace('Olá, ', '').replace('!', '');
            const currentBio = userBioElement.textContent;
            document.getElementById('profileName').value = currentName;
            document.getElementById('profileBio').value = currentBio;
            openModal(editProfileInfoModal);
        });
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

    // ===== 7. LÓGICA DE ATUALIZAÇÃO DO PERFIL =====

    // Dados de perfil simulados (em um cenário real, viriam do banco de dados)
    let userProfile = {
        name: 'Nome do Usuário',
        bio: 'Bem-vindo de volta. Continue seus estudos!',
        avatar: 'https://picsum.photos/200/200'
    };

    // Função para renderizar os dados do perfil na página
    const renderUserProfile = () => {
        if (userNameElement) {
            userNameElement.textContent = `Olá, ${userProfile.name}!`;
        }
        if (userBioElement) {
            userBioElement.textContent = userProfile.bio;
        }
        if (userAvatar) {
            userAvatar.src = userProfile.avatar;
        }
    };

    // Listener para o formulário de edição de nome/bio
    if (profileInfoForm) {
        profileInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('profileName').value;
            const newBio = document.getElementById('profileBio').value;

            // Simulação de sucesso
            userProfile.name = newName;
            userProfile.bio = newBio;
            renderUserProfile();
            closeModal(editProfileInfoModal);
            alert('Perfil atualizado com sucesso!');
        });
    }

    // Listener para o formulário de edição de foto de perfil
    if (profilePicForm) {
        profilePicForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newProfilePicUrl = document.getElementById('profilePicUrl').value;

            // Simulação de sucesso
            userProfile.avatar = newProfilePicUrl;
            renderUserProfile();
            closeModal(editProfilePicModal);
            alert('Foto de perfil atualizada com sucesso!');
        });
    }

    // Carrega o perfil do usuário na inicialização
    renderUserProfile();

    // ===== LÓGICA PARA AS PÁGINAS DE CURSO (MANTIDA PARA CONTEXTO) =====
    const videoPlayer = document.querySelector('.course-video-player iframe');
    const courseTitle = document.querySelector('.course-info h1');
    const courseDescription = document.querySelector('.course-info p');
    const moduleList = document.querySelector('.module-list');
    const editBtn = document.getElementById('edit-course-btn');
    const addModuleBtn = document.getElementById('add-module-btn');
    const editModal = document.getElementById('edit-course-modal');
    const addModuleModal = document.getElementById('add-module-modal');
    const editForm = document.getElementById('editForm');
    const addModuleForm = document.getElementById('addModuleForm');

    let courseData = {
        modules: [{
            id: 1,
            title: 'Módulo 1: A Origem do Cosmos',
            videoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Neste primeiro módulo, exploramos as teorias do Big Bang, a formação das primeiras partículas e a expansão inicial do universo.'
        }, {
            id: 2,
            title: 'Módulo 2: Estrelas e a Forja da Vida',
            videoLink: 'https://www.youtube.com/embed/nL7zH_A-P2Q',
            description: 'Descubra como as estrelas nascem, evoluem e morrem, e como elas criam os elementos essenciais para a vida.'
        }]
    };

    const renderModules = (modules) => {
        if (!moduleList) return;
        moduleList.innerHTML = '';
        modules.forEach((mod, index) => {
            const moduleItem = document.createElement('div');
            moduleItem.classList.add('module-item');
            moduleItem.dataset.id = mod.id;
            if (index === 0) {
                moduleItem.classList.add('active');
            }
            moduleItem.innerHTML = `<span class="module-title">${mod.title}</span><i class="fas fa-play-circle module-icon"></i>`;
            moduleList.appendChild(moduleItem);
        });
        if (modules.length > 0) {
            loadModuleContent(modules[0]);
        }
    };

    const loadModuleContent = (module) => {
        if (videoPlayer) videoPlayer.src = module.videoLink;
        if (courseTitle) courseTitle.textContent = module.title;
        if (courseDescription) courseDescription.textContent = module.description;
    };

    const fillEditModal = (module) => {
        if (editModal && module) {
            document.getElementById('videoLink').value = module.videoLink;
            document.getElementById('courseTitle').value = module.title;
            document.getElementById('courseDescription').value = module.description;
        }
    };

    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const activeModule = document.querySelector('.module-item.active');
            if (!activeModule) return;
            const moduleId = parseInt(activeModule.dataset.id);
            const moduleToEdit = courseData.modules.find(mod => mod.id === moduleId);
            if (!moduleToEdit) return;
            moduleToEdit.videoLink = document.getElementById('videoLink').value;
            moduleToEdit.title = document.getElementById('courseTitle').value;
            moduleToEdit.description = document.getElementById('courseDescription').value;
            loadModuleContent(moduleToEdit);
            activeModule.querySelector('.module-title').textContent = moduleToEdit.title;
            closeModal(editModal);
            alert('Módulo atualizado com sucesso!');
        });
    }

    if (addModuleForm) {
        addModuleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newModuleTitle = document.getElementById('moduleTitle').value;
            const newModule = {
                id: courseData.modules.length + 1,
                title: newModuleTitle,
                videoLink: 'https://www.youtube.com/embed/placeholder',
                description: 'Descrição para este módulo.'
            };
            courseData.modules.push(newModule);
            renderModules(courseData.modules);
            closeModal(addModuleModal);
            alert('Módulo adicionado com sucesso!');
        });
    }

    if (moduleList) {
        moduleList.addEventListener('click', (e) => {
            const moduleItem = e.target.closest('.module-item');
            if (moduleItem) {
                document.querySelectorAll('.module-item').forEach(item => item.classList.remove('active'));
                moduleItem.classList.add('active');
                const moduleId = parseInt(moduleItem.dataset.id);
                const selectedModule = courseData.modules.find(mod => mod.id === moduleId);
                loadModuleContent(selectedModule);
            }
        });
    }

    if (moduleList) {
        renderModules(courseData.modules);
    }
});