/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'main30': '#edf1d6',
        'main20': '#9dc08b',
        'main10': '#609966',
        'main5': '#40513b',
        'lightgray2': '#939393',
        'validation': '#ff6464',
        'validation-hover': '#ff6464c2',
        'darkgray': '#636363',
        'edit': '#FFC786',
        'edit-hover': '#FFC786c2',
        'light_green': '#E4FDD7',
        'light_green2': '#B7D1AA',
        'link': '#5177FF',
        'link-hover': '#5177FFc2',

      },
    },
  },
  plugins: [],
})

