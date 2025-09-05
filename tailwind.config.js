/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{html,js}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f3',
          100: '#ffe8e3',
          200: '#ffd5cc',
          300: '#ffb8a8',
          400: '#ff8f75',
          500: '#ff5f39',
          600: '#ff3d1a',
          700: '#d42a0f',
          800: '#b02312',
          900: '#922217',
          950: '#4f0c07',
        }
      }
    },
  },
  plugins: [],
}


