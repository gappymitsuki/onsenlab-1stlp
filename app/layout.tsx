import type { Metadata } from "next";
import { Inter, Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onsen Labo — Your sleep, prescribed.",
  description:
    "AI-personalized Japanese onsen bath rituals for sleep, stress, and recovery. Join 12,847 on the waitlist.",
  openGraph: {
    title: "Onsen Labo — Your sleep, prescribed.",
    description:
      "AI-personalized Japanese onsen bath rituals for sleep, stress, and recovery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerifJp.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-bg-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
