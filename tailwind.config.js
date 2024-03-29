/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          dark: "rgb(59, 120, 220)",
        },

        dark: {
          DEFAULT: "rgb(var(--color-dark))",
          dark: "rgb(24, 24, 24)",
        },

        black: "rgb(var(--color-black))",
        white: "rgb(var(--color-white))",

        light: {
          DEFAULT: "rgb(var(--color-light))",
          dark: "rgb(198, 198, 198)",
        },

        danger: {
          DEFAULT: "rgb(var(--color-danger))",
        },
      },

      borderRadius: {
        DEFAULT: ".5rem",
      },

      transitionDuration: {
        DEFAULT: ".2s",
      },

      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },

      borderColor: "red",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
