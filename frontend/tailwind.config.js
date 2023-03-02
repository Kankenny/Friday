/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      animation: {
        "slide-down": "slide-down 0.5s",
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
};
