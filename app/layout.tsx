import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Fraunces stands in for Editorial New / GT Sectra (OSS fallback per spec).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onsen Labo — Sleep, prescribed.",
  description:
    "An AI-prescribed onsen protocol for sleep, sourced from five protected Japanese hot springs. Join 12,847 reservations.",
  openGraph: {
    title: "Onsen Labo — Sleep, prescribed.",
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
      className={`${fraunces.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-sumi text-washi antialiased">
        {children}
        {/* Click-tracking bridge. Any element with [data-track] fires its
            token through GA4 (gtag) and Mixpanel if either is loaded; a
            console.log keeps the channel debuggable in production until
            analytics tags are wired. Delegated on document so future
            data-track elements (and DOM swaps) need no extra wiring. */}
        <Script id="ol-track" strategy="afterInteractive">{`
          (function () {
            if (window.__olTrackBound) return;
            window.__olTrackBound = true;
            document.addEventListener('click', function (e) {
              var el = e.target && e.target.closest && e.target.closest('[data-track]');
              if (!el) return;
              var event = el.getAttribute('data-track');
              var faqId = el.getAttribute('data-faq-id') || undefined;
              var payload = faqId ? { faq_id: faqId } : {};
              try { if (window.gtag) window.gtag('event', event, payload); } catch (_) {}
              try { if (window.mixpanel) window.mixpanel.track(event, payload); } catch (_) {}
              try { console.log('[OL Track]', event, payload); } catch (_) {}
            }, { capture: true });
          })();
        `}</Script>
      </body>
    </html>
  );
}
