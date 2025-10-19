/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // Busca clases de Tailwind en todos los archivos HTML
  theme: {
    extend: {
      colors: {
        // Tu paleta de colores personalizada
        'brand-dark': '#0D122B',
      }
    },
  },
  plugins: [
     require('@tailwindcss/forms'), // Plugin útil para estilizar formularios
  ],
}