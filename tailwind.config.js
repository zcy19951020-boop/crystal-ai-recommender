/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0F172A',
        'space-light': '#1E293B',
        'star-gold': '#F59E0B',
        'star-yellow': '#FCD34D',
        'mystic-purple': '#8B5CF6',
      },
    },
  },
  plugins: [],
}