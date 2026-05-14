import type { Metadata } from "next";
import { Fraunces, Shippori_Mincho, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fraunces stands in for Editorial New / GT Sectra (OSS fallback per spec).
const fraunces = Fraunces({
  subsets: ["latin"],
  // Variable axis font — weight is controlled per-element via Tailwind
  // utility classes (font-light, font-medium, etc.).
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onsen Lab — Sleep, prescribed.",
  description:
    "An AI-prescribed onsen protocol for sleep, sourced from five protected Japanese hot springs. Join 12,847 reservations.",
  openGraph: {
    title: "Onsen Lab — Sleep, prescribed.",
    description:
      "The world's first AI-prescribed mineral bath protocol. Sourced from five protected onsens.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${shipporiMincho.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-sumi text-washi antialiased">{children}</body>
    </html>
  );
}
