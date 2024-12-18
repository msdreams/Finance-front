const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,scss,css}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        wave: 'wave 6s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serif: ['Old Standard TT', 'serif'],
      },
    },
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          placeholder: "#A8A8A8",
          caret: "#185F0B",
          primary: {
            DEFAULT: "#185F0B",
            100: "#E6F8CF",
            200: "#CAF2A2",
            300: "#9CDA6E",
            400: "#6DB544",
            500: "#378417",
            600: "#267110",
            700: "#185F0B",
            800: "#0D4C07",
            900: "#053F04",
          },
          secondary: {
            DEFAULT: "#2845DB",
            100: "#D7E1FF",
            200: "#AFC2FF",
            300: "#87A1FF",
            400: "#6987FF",
            500: "#385CFF",
            600: "#2845DB",
            700: "#1C32B7",
            800: "#112293",
            900: "#0A167A",
          },
          success: {
            DEFAULT: "#2B991D",
            100: "#E7FBD4",
            200: "#CAF7AB",
            300: "#A0E77C",
            400: "#77D058",
            500: "#42B229",
            600: "#2B991D",
            700: "#188014",
            800: "#0D6711",
            900: "#075511",
          },
          warning: {
            100: "#FEFCCD",
            200: "#FDF89C",
            300: "#FBF26A",
            400: "#F8EB44",
            500: "#F4E109",
            600: "#D1BF06",
            700: "#AF9E04",
            800: "#8D7E02",
            900: "#756701",
          },
          danger: {
            100: "#FCE4CF",
            200: "#FAC3A1",
            300: "#F09870",
            400: "#E16E4C",
            500: "#CE3418",
            600: "#B11D11",
            700: "#940C0C",
            800: "#770710",
            900: "#620413",
          },
          neutral: {
            100: "#F5F5F5",
            200: "#E5E5E5",
            300: "#D4D4D4",
            400: "#A3A3A3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
          },
          transparent: "transparent",
        }
      }
    }
  })],
}

