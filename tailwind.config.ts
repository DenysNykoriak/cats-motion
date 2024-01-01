import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: "#fdfbfd",
      secondary: "#b0afb0",
      bgPrimary: "#181618",
      bgV1: "#adaa9f",
      bgV2: "#9d9f97",
      bgV3: "#456764",
    },
    fontFamily: {
      lato: ["var(--font-lato)"],
      "cormorant-garamond": ["var(--font-cormorant-garamond)"],
    },
    zIndex: {
      tempModalView: "11",
      logo: "100",
      controls: "100",
      cursor: "200",
    },
    gridTemplateColumns: {
      catBreedInfo: "min-content 1fr",
    },
  },
  plugins: [],
};

export default config;
