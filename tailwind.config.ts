import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: "#fdfbfd",
      bgPrimary: "#181618",
    },
    fontFamily: {
      lato: ["var(--font-lato)"],
      "cormorant-garamond": ["var(--font-cormorant-garamond)"],
    },
  },
  plugins: [],
};

export default config;
