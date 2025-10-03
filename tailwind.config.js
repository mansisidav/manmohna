/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // App Router files
    "./pages/**/*.{js,ts,jsx,tsx}",     // Pages folder, agar use ho
    "./components/**/*.{js,ts,jsx,tsx}", // Components folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5558d8",   // apna primary color
        secondary: "#d4bbdd",
        semiprimary:"#fbd3da" ,
        semisecondary:"#8adfe3"// apna secondary color
      },
    },
  },
  plugins: [],
};
