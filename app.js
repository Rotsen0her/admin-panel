document.addEventListener('DOMContentLoaded', () => {

    // === Lógica para cambiar de vistas ===
    const views = document.querySelectorAll('.view-content');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para mostrar una vista y ocultar las demás
    function showView(viewId) {
        // Oculta todas las vistas
        views.forEach(view => {
            view.classList.add('hidden');
        });
        
        // Muestra la vista seleccionada
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
        }
    }

    // Función para actualizar el estado activo del link
    function setActiveLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('bg-blue-600', 'text-white', 'font-semibold');
            link.classList.add('hover:bg-gray-800');
        });
        
        activeLink.classList.add('bg-blue-600', 'text-white', 'font-semibold');
        activeLink.classList.remove('hover:bg-gray-800');
    }

    // Añadir listeners a los links de navegación
    document.getElementById('link-crear').addEventListener('click', (e) => {
        e.preventDefault();
        showView('view-crear');
        setActiveLink(e.currentTarget);
        closeMobileMenu(); // Cierra el menú móvil si está abierto
    });

    document.getElementById('link-listado').addEventListener('click', (e) => {
        e.preventDefault();
        showView('view-listado');
        setActiveLink(e.currentTarget);
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

    // === Lógica para el menú móvil ===
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebar = document.getElementById('sidebar');

    function closeMobileMenu() {
        sidebar.classList.add('-translate-x-full');
    }

    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    // Opcional: Cierra el menú si se hace clic fuera de él en móvil
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            if (!sidebar.classList.contains('-translate-x-full')) {
                closeMobileMenu();
            }
        }
    });

});