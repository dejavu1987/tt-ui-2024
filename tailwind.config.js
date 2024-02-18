/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0080a0",
        "primary-dark": "#095366",
        "primary-light": "#6db7e1",
        leftplayer: "#44B3C2",
        rightplayer: "#E45641",
        secondary: "#d22d16",
        "secondary-dark": "#9933cc",
        default: "#2bbbad",
        "default-dark": "#00695c",
        info: "#33b5e5",
        "info-dark": "#0099cc",
        success: "#00c851",
        "success-dark": "#007e33",
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
