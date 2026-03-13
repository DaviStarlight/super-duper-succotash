/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kairos: {
          bg: '#1A1A2E',
          'bg-alt': '#16213E',
          gold: '#F0C040',
          'gold-dark': '#D4A843',
          silver: '#A8B8CC',
          'silver-dark': '#8899AA',
          accent: '#D4A843',
          success: '#2ECC71',
          danger: '#E74C3C',
          press: '#F39C12',
          shield: '#3498DB',
          'board-light': '#2a2a4e',
          'board-dark': '#1e1e3a',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
