/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        'bg-primary': '#171E2B',
        'bg-secondary': '#131924',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
