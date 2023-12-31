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
      firstModalView: "1",
      secondModalView: "2",
      modalImage: "3",
      logo: "100",
    },
    gridTemplateColumns: {
      catBreedInfo: "min-content 1fr",
    },
  },
  plugins: [],
};

export default config;
