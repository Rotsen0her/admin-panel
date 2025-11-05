document.addEventListener('DOMContentLoaded', () => {

    // === Array de usuarios ===
    const usuarios = [
        { id: '12345678', nombres: 'Juan', apellidos: 'Pérez', email: 'juan.perez@email.com', genero: 'Masculino' },
        { id: '87654321', nombres: 'Ana', apellidos: 'García', email: 'ana.garcia@email.com', genero: 'Femenino' },
        { id: '11223344', nombres: 'Luis', apellidos: 'Martinez', email: 'luis.martinez@email.com', genero: 'Masculino' }
    ];

    // === Función para renderizar tabla de usuarios ===
    function renderUsers() {
        const tbody = document.querySelector('#view-listado tbody');
        tbody.innerHTML = usuarios.map(u => `
            <tr class="hover:bg-gray-800/50 transition-colors">
                <td class="px-4 py-2.5 text-gray-300">${u.id}</td>
                <td class="px-4 py-2.5 text-gray-300">${u.nombres}</td>
                <td class="px-4 py-2.5 text-gray-300">${u.apellidos}</td>
                <td class="px-4 py-2.5 text-gray-300">${u.email}</td>
                <td class="px-4 py-2.5 text-gray-300">${u.genero}</td>
            </tr>
        `).join('');
    }

    const views = document.querySelectorAll('.view-content');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function showView(viewId) {
        views.forEach(view => {
            view.classList.add('hidden');
        });
        
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
        }
    }

    function setActiveLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('bg-blue-600', 'text-white', 'font-semibold');
            link.classList.add('hover:bg-gray-800');
        });
        
        activeLink.classList.add('bg-blue-600', 'text-white', 'font-semibold');
        activeLink.classList.remove('hover:bg-gray-800');
    }
x   
    document.getElementById('link-crear').addEventListener('click', (e) => {
        e.preventDefault();
        showView('view-crear');
        setActiveLink(e.currentTarget);
        closeMobileMenu();
    });

    document.getElementById('link-listado').addEventListener('click', (e) => {
        e.preventDefault();
        showView('view-listado');
        setActiveLink(e.currentTarget);
        renderUsers(); // Renderizar usuarios al mostrar vista
        closeMobileMenu();
    });

    document.getElementById('link-buscar').addEventListener('click', (e) => {
        e.preventDefault();
        showView('view-buscar');
        setActiveLink(e.currentTarget);
        closeMobileMenu();
    });

    document.getElementById('link-proyectos').addEventListener('click', (e) => {
        e.preventDefault();
        showView('view-proyectos');
        setActiveLink(e.currentTarget);
        closeMobileMenu();
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebar = document.getElementById('sidebar');

    // Renderizar usuarios al cargar la página
    renderUsers();

    function closeMobileMenu() {
        sidebar.classList.add('-translate-x-full');
    }

    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            if (!sidebar.classList.contains('-translate-x-full')) {
                closeMobileMenu();
            }
        }
    });

});