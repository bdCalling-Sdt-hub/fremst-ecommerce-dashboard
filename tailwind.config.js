/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#292c61",
        secondary: "#ced1ff",
        base: "#4E4E4E",
      },
    },
  },
  plugins: [],
};
