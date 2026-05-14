export default function Footer() {
  return (
    <footer className="w-full border-t border-line bg-bg-base">
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-[120px] md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-center">
          <div className="font-sans text-[20px] font-extralight tracking-tight text-text-primary md:text-[24px]">
            Onsen Labo
          </div>

          <nav className="flex gap-8 font-mono text-caption uppercase tracking-caption text-text-secondary md:justify-center md:text-caption-lg">
            <a
              href="https://www.tiktok.com/@onsenlabo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-accent"
            >
              TikTok
            </a>
            <a
              href="https://www.instagram.com/onsenlabo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-accent"
            >
              Instagram
            </a>
            <a
              href="https://x.com/onsenlabo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-accent"
            >
              X
            </a>
          </nav>

          <nav className="flex gap-8 font-mono text-caption uppercase tracking-caption text-text-secondary md:justify-end md:text-caption-lg">
            <a
              href="/privacy"
              className="transition-colors duration-200 hover:text-accent"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="transition-colors duration-200 hover:text-accent"
            >
              Terms
            </a>
            <a
              href="/press"
              className="transition-colors duration-200 hover:text-accent"
            >
              Press
            </a>
          </nav>
        </div>

        <div className="mt-12 h-px w-full bg-line" />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-caption text-text-tertiary md:text-[12px]">
          © 2026 Onsen Labo. Sourced in Japan. Shipped from Tokyo.
        </p>
      </div>
    </footer>
  );
}
