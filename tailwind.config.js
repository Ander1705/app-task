/** @type {import('tailwindcss').Config} */
export default {
    // Define qué archivos deben ser escaneados por Tailwind para generar los estilos
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Ajusta esta línea para que Tailwind escanee tus archivos JSX/TSX
    ],
    theme: {
      extend: {}, // Aquí puedes extender o modificar los estilos predeterminados de Tailwind
    },
    plugins: [], // Si usas plugins adicionales de Tailwind, los agregas aquí
  }
  