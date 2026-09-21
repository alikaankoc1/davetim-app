import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Outfit,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-src",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Davetim | Yeni Nesil Dijital Davetiye",
  description:
    "Davetim ile dakikalar içinde lüks, kişiselleştirilmiş dijital davetiyeler oluşturun. Misafirlerinizi modern ve zarif bir deneyimle karşılayın.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${outfit.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
