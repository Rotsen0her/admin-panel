document.addEventListener('DOMContentLoaded', () => {

    const usuarios = [];

    function mostrarUsuarios() {
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

    function agregarUsuario(usuario) {
        usuarios.push(usuario);
        mostrarUsuarios();
    }

    const vistas = document.querySelectorAll('.view-content');
    const enlacesNav = document.querySelectorAll('.nav-link');
    
    function mostrarVista(idVista) {
        vistas.forEach(vista => {
            vista.classList.add('hidden');
        });
        
        const vistaObjetivo = document.getElementById(idVista);
        if (vistaObjetivo) {
            vistaObjetivo.classList.remove('hidden');
        }
    }

    function establecerEnlaceActivo(enlaceActivo) {
        enlacesNav.forEach(enlace => {
            enlace.classList.remove('bg-blue-600', 'text-white', 'font-semibold');
            enlace.classList.add('hover:bg-gray-800');
        });
        
        enlaceActivo.classList.add('bg-blue-600', 'text-white', 'font-semibold');
        enlaceActivo.classList.remove('hover:bg-gray-800');
    }
   
    document.getElementById('link-crear').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarVista('view-crear');
        establecerEnlaceActivo(e.currentTarget);
        cerrarMenuMovil();
    });

    document.getElementById('link-listado').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarVista('view-listado');
        establecerEnlaceActivo(e.currentTarget);
        mostrarUsuarios(); 
        cerrarMenuMovil();
    });

    document.getElementById('link-buscar').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarVista('view-buscar');
        establecerEnlaceActivo(e.currentTarget);
        cerrarMenuMovil();
    });

    document.getElementById('link-proyectos').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarVista('view-proyectos');
        establecerEnlaceActivo(e.currentTarget);
        cerrarMenuMovil();
    });

    const botonMenuMovil = document.getElementById('mobile-menu-button');
    const barraLateral = document.getElementById('sidebar');

    mostrarUsuarios();

    const formulario = document.querySelector('#view-crear form');
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nuevoUsuario = {
            id: document.getElementById('id').value,
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            email: document.getElementById('email').value,
            genero: document.getElementById('genero').value
        };
        
        agregarUsuario(nuevoUsuario);
        formularioCrear.reset(); 
        
        mostrarVista('view-listado');
        establecerEnlaceActivo(document.getElementById('link-listado'));
    });

    function cerrarMenuMovil() {
        barraLateral.classList.add('-translate-x-full');
    }

    botonMenuMovil.addEventListener('click', () => {
        barraLateral.classList.toggle('-translate-x-full');
    });

    document.addEventListener('click', (e) => {
        if (!barraLateral.contains(e.target) && !botonMenuMovil.contains(e.target)) {
            if (!barraLateral.classList.contains('-translate-x-full')) {
                cerrarMenuMovil();
            }
        }
    });

});