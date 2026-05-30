/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        obsidian: '#070A12',
        'glass': 'rgba(255,255,255,0.03)',
        'glass-hover': 'rgba(255,255,255,0.06)',
        'rim': 'rgba(255,255,255,0.07)',
        'rim-bright': 'rgba(255,255,255,0.15)',
        'ghost-white': 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Figtree"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
