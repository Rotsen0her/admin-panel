Admin Panel - Maqueta con Tailwind CSS

Este repositorio contiene una maqueta de un Admin Panel creada con HTML, Tailwind (CDN) y JavaScript.

Estructura:

- index.html - HTML principal con vistas (Crear usuarios, Listado, Buscar, Gestionar proyectos)
- app.js - Lógica para cambiar vistas y menú móvil
- input.css, tailwind.config.js - configuración original de Tailwind (no usada en preview)
- server.js - servidor estático simple para desarrollo local

Cómo probar:

1. Instala dependencias (solo tailwind en dev):
   npm install

2. Ejecuta el servidor (Node required):
   node server.js

3. Abre http://localhost:5173 en tu navegador

Notas:
- En desarrollo rápido se usa Tailwind CDN en `index.html`. Para usar compilación local, genera `output.css` desde `input.css` con Tailwind.
- Puedes añadir scripts en package.json para build y start.