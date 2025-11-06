/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/pages/**/*.{html,js}",
    "./src/components/**/*.{html,js}"
  ],
  theme: {
    colors: {
      background: "#1e1e2e",
      highlight: "#cba6f7",
      text: "#cdd6f4",
      text_2: "#cdd6f4",
      sidebar: "#11111b",
      button: "#181825",
      card: "#181825",
      searchbar: "#585b70",
      searchbar_icon: "#cba6f7",
    },
    extend: {},
  },
  plugins: [],
}
