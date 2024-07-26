/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      screens: {
        'xsm': { 'max': '300px' },
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}