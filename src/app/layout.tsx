import type { Metadata } from "next";
import { Share_Tech } from "next/font/google";
import "./globals.css";

const share_tech = Share_Tech({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "TMDB API",
  description: "Consumo de api da TMDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${share_tech.className}`}>
        {children}
      </body>
    </html>
  );
}
