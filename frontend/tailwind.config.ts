/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        nav: "920px", // desktop custom
        xs: "450px", // nova screen para placeholder
      },
    },
  },
  plugins: [],
};
