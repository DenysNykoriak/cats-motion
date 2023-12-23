import type { Metadata } from "next";

import "@/styles/globals.css";

import { Lato, Cormorant_Garamond } from "next/font/google";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

export const metadata: Metadata = {
  title: "Cats Motion",
  description: "Created by Denys Nykoriak",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <html lang="en">
    <body className={`${lato.variable} ${cormorantGaramond.variable}`}>
      {children}
    </body>
  </html>
);

export default RootLayout;
