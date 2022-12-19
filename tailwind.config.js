module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#2EC862",
        dark: "#19212c",
        textDark: "A4A4A4",
        soft: "#F6F7F8",
        yellow: "#F5C451",
        violet: "#5742A9",
        grayBorder: "#313131",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
