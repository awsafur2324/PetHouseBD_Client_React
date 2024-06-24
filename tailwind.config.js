/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: '"Lato", sans-serif',
        display1: '"Cabin", sans-serif',
        display2: '"Josefin Sans", sans-serif',
        display3: '"Poppins", sans-serif',
        display4: '"Nunito Sans", sans-serif',
      },
      colors: {
        dark: "#26355D",
        dark2: "#395B64",
        light: "#3AA6B9",
        light2: "#E7F6F2",
      },
      screens: {
        xs : "320px"
      }
    },
  },
  plugins: [],
});
