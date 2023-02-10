/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/pages/**/*.{html,js}",
    "./src/components/**/*.{html,js}"
  ],
  theme: {
    colors: {
      background: "#222426",
      highlight: "#B3CB39",
      text: "#CDCFCC",
      text_2: "#000",
      sidebar: "#181B1C",
      button: "#121516",
      card: "#181B1C",
      searchbar: "#CDCFCC",
      searchbar_icon: "#6D771F",
    },
    extend: {},
  },
  plugins: [],
}
