/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#7B2CBF",
        secondary: "#C77DFF",
        tertiary: "#5A189A",
        dark: "#10002B",
        light: "#E0AAFF",
        error: "#a01a58",
        "error-secondary": "#6F103C",
        white: "#f8f7ff",
        success: "#60d394",
        "success-secondary": "#52B880"
      },
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
