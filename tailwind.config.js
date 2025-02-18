/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#303633',
          mint: '#8BE8CB',
          blue: '#7EA2AA',
          purple: '#888DA7',
          mauve: '#9C7A97',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'gradient-xy': 'gradient-xy 15s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '300% 300%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '300% 300%',
            'background-position': 'right center'
          },
        },
        'gradient-xy': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, 10px) rotate(90deg)' },
          '50%': { transform: 'translate(0, 20px) rotate(180deg)' },
          '75%': { transform: 'translate(-10px, 10px) rotate(270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({nocompatible: true})],
}