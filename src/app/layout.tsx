import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SaltWear | Ege & Plaj",
  description:
    "Keten, hasır ve açık tonlarda yaz: Sahil, plaj ve gün batımı için resortwear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${outfit.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-page font-sans text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
