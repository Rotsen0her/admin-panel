document.addEventListener('DOMContentLoaded', () => {

    // === Cargar datos desde localStorage ===
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

    // === Funciones de persistencia ===
    function guardarUsuarios() {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    function guardarProyectos() {
        localStorage.setItem('proyectos', JSON.stringify(proyectos));
    }

    // === Función para renderizar tabla de usuarios con filtros ===
    function mostrarUsuarios(filtroId = '', filtroGenero = '') {
        const tbody = document.getElementById('tabla-usuarios-body');
        
        const usuariosFiltrados = usuarios.filter(u => {
            const cumpleId = !filtroId || u.id.toLowerCase().includes(filtroId.toLowerCase());
            const cumpleGenero = !filtroGenero || u.genero === filtroGenero;
            return cumpleId && cumpleGenero;
        });

        if (usuariosFiltrados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="px-4 py-4 text-center text-gray-500 text-sm">No se encontraron usuarios</td></tr>';
            return;
        }

        tbody.innerHTML = usuariosFiltrados.map(u => {
            // Buscar proyectos donde está asignado este usuario
            const proyectosAsignados = proyectos
                .filter(p => p.usuariosIds.includes(u.id))
                .map(p => p.nombre)
                .join(', ');

            return `
            <tr class="hover:bg-gray-800/50 transition-colors">
                <td class="px-4 py-2.5 text-gray-300">${u.id}</td>
                <td class="px-4 py-2.5 text-gray-300">${u.nombres}</td>
                <td class="px-4 py-2.5 text-gray-300">${u.apellidos}</td>
                <td class="px-4 py-2.5 text-gray-300">${u.email}</td>
                <td class="px-4 py-2.5 text-gray-300">${u.genero}</td>
                <td class="px-4 py-2.5 text-gray-300 text-xs">${proyectosAsignados || '-'}</td>
            </tr>
            `;
        }).join('');
    }

    function agregarUsuario(usuario) {
        usuarios.push(usuario);
        guardarUsuarios();
        mostrarUsuarios();
        actualizarSelectUsuarios();
    }

    // === Función para renderizar tabla de proyectos con filtros ===
    function mostrarProyectos(filtroBusqueda = '', filtroEstado = '') {
        const tbody = document.getElementById('tabla-proyectos-body');
        
        const proyectosFiltrados = proyectos.filter(p => {
            const cumpleBusqueda = !filtroBusqueda || 
                p.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
                p.id.toLowerCase().includes(filtroBusqueda.toLowerCase());
            const cumpleEstado = !filtroEstado || p.estado === filtroEstado;
            return cumpleBusqueda && cumpleEstado;
        });

        if (proyectosFiltrados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-4 text-center text-gray-500 text-sm">No se encontraron proyectos</td></tr>';
            return;
        }

        tbody.innerHTML = proyectosFiltrados.map(p => {
            const usuariosAsignados = p.usuariosIds.map(id => {
                const usuario = usuarios.find(u => u.id === id);
                return usuario ? `${usuario.nombres} ${usuario.apellidos}` : 'Usuario no encontrado';
            }).join(', ');

            return `
                <tr class="hover:bg-gray-800/50 transition-colors">
                    <td class="px-4 py-2.5 text-gray-300">${p.id}</td>
                    <td class="px-4 py-2.5 text-gray-300">${p.nombre}</td>
                    <td class="px-4 py-2.5 text-gray-300">
                        <span class="bg-${p.estado === 'Activo' ? 'green' : p.estado === 'Completado' ? 'blue' : 'yellow'}-600/20 text-${p.estado === 'Activo' ? 'green' : p.estado === 'Completado' ? 'blue' : 'yellow'}-400 px-2 py-0.5 rounded text-xs border border-${p.estado === 'Activo' ? 'green' : p.estado === 'Completado' ? 'blue' : 'yellow'}-600/30">${p.estado}</span>
                    </td>
                    <td class="px-4 py-2.5 text-gray-300">${p.fechaInicio}</td>
                    <td class="px-4 py-2.5 text-gray-300 text-xs">${usuariosAsignados || 'Sin asignar'}</td>
                </tr>
            `;
        }).join('');
    }

    function agregarProyecto(proyecto) {
        proyectos.push(proyecto);
        guardarProyectos();
        mostrarProyectos();
        mostrarUsuarios(); // Actualizar tabla de usuarios para reflejar nuevas asignaciones
    }

    // === Actualizar select de usuarios en formulario de proyectos ===
    function actualizarSelectUsuarios() {
        const selectUsuarios = document.getElementById('usuarios-proyecto');
        if (selectUsuarios) {
            selectUsuarios.innerHTML = usuarios.map(u => 
                `<option value="${u.id}">${u.nombres} ${u.apellidos} (${u.id})</option>`
            ).join('');
        }
    }

    // === Navegación entre vistas ===
    const vistas = document.querySelectorAll('.view-content');
    const enlacesNav = document.querySelectorAll('.nav-link');
    
    function mostrarVista(idVista) {
        vistas.forEach(vista => vista.classList.add('hidden'));
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

    // === Event Listeners: Navegación ===
    document.getElementById('link-usuarios').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarVista('view-usuarios');
        establecerEnlaceActivo(e.currentTarget);
        mostrarUsuarios();
        cerrarMenuMovil();
    });

    document.getElementById('link-proyectos').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarVista('view-proyectos');
        establecerEnlaceActivo(e.currentTarget);
        mostrarProyectos();
        actualizarSelectUsuarios();
        cerrarMenuMovil();
    });

    // === Modales: Usuario ===
    const modalUsuario = document.getElementById('modal-usuario');
    const btnAbrirModalUsuario = document.getElementById('btn-abrir-modal-usuario');
    const btnCerrarModalUsuario = document.getElementById('btn-cerrar-modal-usuario');
    const btnCancelarUsuario = document.getElementById('btn-cancelar-usuario');

    btnAbrirModalUsuario.addEventListener('click', () => {
        modalUsuario.classList.remove('hidden');
    });

    btnCerrarModalUsuario.addEventListener('click', () => {
        modalUsuario.classList.add('hidden');
        document.getElementById('form-crear-usuario').reset();
    });

    btnCancelarUsuario.addEventListener('click', () => {
        modalUsuario.classList.add('hidden');
        document.getElementById('form-crear-usuario').reset();
    });

    // Cerrar modal al hacer clic fuera
    modalUsuario.addEventListener('click', (e) => {
        if (e.target === modalUsuario) {
            modalUsuario.classList.add('hidden');
            document.getElementById('form-crear-usuario').reset();
        }
    });

    // === Modales: Proyecto ===
    const modalProyecto = document.getElementById('modal-proyecto');
    const btnAbrirModalProyecto = document.getElementById('btn-abrir-modal-proyecto');
    const btnCerrarModalProyecto = document.getElementById('btn-cerrar-modal-proyecto');
    const btnCancelarProyecto = document.getElementById('btn-cancelar-proyecto');

    btnAbrirModalProyecto.addEventListener('click', () => {
        actualizarSelectUsuarios();
        modalProyecto.classList.remove('hidden');
    });

    btnCerrarModalProyecto.addEventListener('click', () => {
        modalProyecto.classList.add('hidden');
        document.getElementById('form-crear-proyecto').reset();
    });

    btnCancelarProyecto.addEventListener('click', () => {
        modalProyecto.classList.add('hidden');
        document.getElementById('form-crear-proyecto').reset();
    });

    // Cerrar modal al hacer clic fuera
    modalProyecto.addEventListener('click', (e) => {
        if (e.target === modalProyecto) {
            modalProyecto.classList.add('hidden');
            document.getElementById('form-crear-proyecto').reset();
        }
    });

    // === Formulario: Crear Usuario ===
    const formularioUsuario = document.getElementById('form-crear-usuario');
    formularioUsuario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nuevoUsuario = {
            id: document.getElementById('id').value,
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            email: document.getElementById('email').value,
            genero: document.getElementById('genero').value
        };
        
        agregarUsuario(nuevoUsuario);
        formularioUsuario.reset();
        modalUsuario.classList.add('hidden');
    });

    // === Formulario: Crear Proyecto ===
    const formularioProyecto = document.getElementById('form-crear-proyecto');
    formularioProyecto.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectUsuarios = document.getElementById('usuarios-proyecto');
        const usuariosSeleccionados = Array.from(selectUsuarios.selectedOptions).map(opt => opt.value);

        const nuevoProyecto = {
            id: document.getElementById('id-proyecto').value,
            nombre: document.getElementById('nombre-proyecto').value,
            estado: document.getElementById('estado-proyecto').value,
            fechaInicio: document.getElementById('fecha-proyecto').value,
            usuariosIds: usuariosSeleccionados
        };
        
        agregarProyecto(nuevoProyecto);
        formularioProyecto.reset();
        modalProyecto.classList.add('hidden');
    });

    // === Filtros: Usuarios ===
    const inputBuscarUsuario = document.getElementById('buscar-usuario');
    const selectFiltroGenero = document.getElementById('filtro-genero');
    const btnLimpiarFiltrosUsuarios = document.getElementById('btn-limpiar-filtros-usuarios');

    inputBuscarUsuario.addEventListener('input', () => {
        mostrarUsuarios(inputBuscarUsuario.value, selectFiltroGenero.value);
    });

    selectFiltroGenero.addEventListener('change', () => {
        mostrarUsuarios(inputBuscarUsuario.value, selectFiltroGenero.value);
    });

    btnLimpiarFiltrosUsuarios.addEventListener('click', () => {
        inputBuscarUsuario.value = '';
        selectFiltroGenero.value = '';
        mostrarUsuarios();
    });

    // === Filtros: Proyectos ===
    const inputBuscarProyecto = document.getElementById('buscar-proyecto');
    const selectFiltroEstado = document.getElementById('filtro-estado');
    const btnLimpiarFiltrosProyectos = document.getElementById('btn-limpiar-filtros-proyectos');

    inputBuscarProyecto.addEventListener('input', () => {
        mostrarProyectos(inputBuscarProyecto.value, selectFiltroEstado.value);
    });

    selectFiltroEstado.addEventListener('change', () => {
        mostrarProyectos(inputBuscarProyecto.value, selectFiltroEstado.value);
    });

    btnLimpiarFiltrosProyectos.addEventListener('click', () => {
        inputBuscarProyecto.value = '';
        selectFiltroEstado.value = '';
        mostrarProyectos();
    });

    // === Menú móvil ===
    const botonMenuMovil = document.getElementById('mobile-menu-button');
    const barraLateral = document.getElementById('sidebar');

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

    // === Inicialización ===
    mostrarUsuarios();
    actualizarSelectUsuarios();

});