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
        background: "#FFFFFF",
        foreground: "#414552",
        "foreground-green": "#15BE53",
        "foreground-red": "#FF0004",
        stroke: "#E6E6E6",
      },
    },
  },
  plugins: [],
} satisfies Config;
