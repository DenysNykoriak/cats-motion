import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Cats Motion",
  description: "Created by Denys Nykoriak",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
