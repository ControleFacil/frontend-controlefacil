import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pb: "#0A3D62", // New PB
        pg: "#4B5320", // New PG
        pr: "#8B0000", // New PR

        white: "#FFFFFF",
        black: "#000000",

        neutral: {
          30: "#E0E0E0",
          60: "#757575",
        },

        gray: {
          100: "#F4F4F4",
          200: "#E3AEF1",
          300: "#8A8A8F",
          400: "#9B9B9B",
          500: "#666666",
          600: "#505050",
          700: "#343434",
          800: "#333333",
          900: "#1A1A1A",
        },

        purple: {
          light: "#E3AEF1",
          DEFAULT: "#B700FF",
          dark: "#CA00FF",
          accent: "#E7AAF5",
        },

        red: {
          DEFAULT: "#FF2D55",
        },

        blue: {
          light: "#ECBAFF",
          soft: "#EAEAFF",
        },

        extra: {
          linear: "#8A2BE2",
          efeff4: "#EFEFF4",
          c8c7cc: "#C8C7CC",
          d8d8d8: "#D8D8D8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
