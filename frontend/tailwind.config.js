/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px', // Custom breakpoint for 450px
      },
    },
  },
  plugins: ['@tailwindcss/line-clamp'],
}

