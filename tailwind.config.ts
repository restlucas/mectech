import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "#18181b",
        input: "#09090B",
        ginte: "#107E0B",
        "ginte-hover": "#0A6D0126",
        "gray-dark": "#3F3F46",
      },
      keyframes: {
        show: {
          "0%": {
            transform: "scale(0.8)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        hide: {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0.8)",
            opacity: "0",
          },
        },
        fadeX: {
          "0%": {
            transform: "translateX(50px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        }
      },
      animation: {
        "show-modal": "show .15s ease-in",
        "hide-modal": "hide .15s ease-out",
        "fade-in": "fadeX .2s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
