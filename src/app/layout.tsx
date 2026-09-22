import type { Metadata } from "next";
import {
  Alex_Brush,
  Cinzel,
  Cormorant_Garamond,
  Great_Vibes,
  Montserrat,
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

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes-src",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush-src",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

const cinzel = Cinzel({
  variable: "--font-cinzel-src",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat-src",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Davetim | Yeni Nesil Dijital Davetiye",
  description:
    "Davetim ile dakikalar içinde lüks, kişiselleştirilmiş dijital davetiyeler oluşturun. Misafirlerinizi modern ve zarif bir deneyimle karşılayın.",
  icons: {
    icon: [{ url: "/brand/davetim-logo.png", type: "image/png" }],
    apple: [{ url: "/brand/davetim-logo.png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${outfit.variable} ${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${alexBrush.variable} ${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
