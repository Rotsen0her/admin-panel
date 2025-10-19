document.addEventListener('DOMContentLoaded', () => {

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