const {heroui} = require('@heroui/theme');
const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,scss,css}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/popover.js"
  ],
  theme: {
    extend: {
      transitionDuration: {
        1500: "1500ms", 
      },
      textStroke: {
        2: '2px black',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-40px)' },
          '100%': { transform: 'translateY(0)' },
        },
        enterUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        enterUpModals: {
          "0%": { transform: "translateY(20px)"},
          "100%": { transform: "translateY(0)"},
        }

      },
      animation: {
        wave: 'wave 6s ease-in-out infinite',
        enterUp: 'enterUp 0.6s ease-out forwards',
        enterUpModals: 'enterUpModals 0.6s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out',
        fadeInSlow: 'fadeIn 0.6s ease-out',
        fadeInSlowDelayed: 'fadeIn 0.6s ease-out 0.3s'

      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serif: ['Old Standard TT', 'serif'],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1200px",
      xl: "1300px",
      "2xl": "1536px",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-outline': {
          '-webkit-text-stroke': '2px white',
          'color': 'transparent',
        },
      });
    },
    nextui({
    themes: {
      light: {
        colors: {
          background: "#F7F7FF", foreground: "#11181C", placeholder: "#A8A8A8", caret: "#185F0B",
          selectors: {
            DEFAULT: "#C8F7D4",100: "#C8F7D4",200: "#93F0B6",300: "#59D493",400: "#2FAA74",500: "#04724D",600: "#02624B",700: "#025246",800: "#01423F",900: "#003336",}
          ,primary: {
          DEFAULT: "#04724D",100: "#C8F7D4",200: "#93F0B6",300: "#59D493",400: "#2FAA74",500: "#04724D",600: "#02624B",700: "#025246",800: "#01423F",900: "#003336",}
          ,gray: {
            DEFAULT: "#586F7C",100: "#EAF6F8",200: "#D5ECF1",300: "#B2CED7",400: "#89A4B0",500: "#586F7C",600: "#40586A",700: "#2C4359",800: "#1C2F47",900: "#10213B",}
          ,secondary: {
          DEFAULT: "#2845DB",100: "#D7E1FF",200: "#AFC2FF",300: "#87A1FF",400: "#6987FF",500: "#385CFF",600: "#2845DB",700: "#1C32B7",800: "#112293",900: "#0A167A",}
          ,success: {
          DEFAULT: "#2B991D",100: "#E7FBD4",200: "#CAF7AB",300: "#A0E77C",400: "#77D058",500: "#42B229",600: "#2B991D",700: "#188014",800: "#0D6711",900: "#075511",}
          ,warning: {
            DEFAULT: "#FFC300",100: "#FFF7CC",200: "#FFEE99",300: "#FFE266",400: "#FFD63F",500: "#FFC300",600: "#DBA200",700: "#B78300",800: "#936600",900: "#7A5100",},
          danger: {
          100: "#FDD4D3",200: "#FBA8AD",300: "#F57B8F",400: "#EC5980",500: "#E0266A",600: "#C01B68",700: "#A11363",800: "#810C5A",900: "#6B0753",},
          neutral: {
          100: "#F5F5F5",200: "#E5E5E5",300: "#D4D4D4",400: "#A3A3A3",500: "#737373",600: "#525252",700: "#404040",800: "#262626",900: "#171717",},
          transparent: "transparent",}
      }
    }
  }),require("tailwindcss-animate"),heroui()],
}

