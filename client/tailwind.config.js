/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      animation: {
        "slide-down": "slide-down 0.5s",
        pulse: "pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      colors: {
        main: "#FFFFFF",
        secondary: "#00011D",
        tertiary: "#499548",
      },
    },
  },
  plugins: [],
}
