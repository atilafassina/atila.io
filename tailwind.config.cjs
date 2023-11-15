const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["JostVariable", ...defaultTheme.fontFamily.sans],
      },

      animation: {
        "blur-in": "400ms blur-in linear",
        "slide-up": "500ms slide-up ease-in-out",
        "bkg-move": "bkg-move 20s ease infinite",
        "bkg-fast-move": "bkg-move 5s ease infinite",
        "half-spin": "half-spin 2s linear infinite",
      },
      keyframes: {
        "blur-in": {
          "0%": { filter: "blur(10px)" },
          "100%": { filter: "blur(0)" },
        },
        "bkg-move": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", filter: "blur(10px)" },
          "100%": { transform: "translateY(0)", filter: "blur(0)" },
        },
        "half-spin": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(15deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
}
