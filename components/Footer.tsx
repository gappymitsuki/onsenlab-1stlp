import Wordmark from "./Wordmark";

const indexLinks = [
  { label: "Protocol", href: "#process" },
  { label: "Science", href: "#thermoregulation" },
  { label: "Onsens", href: "#onsens" },
  { label: "Press", href: "/press" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const social = [
  { label: "TIKTOK", href: "https://www.tiktok.com/@onsenlabo" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/onsenlabo" },
  { label: "X", href: "https://x.com/onsenlabo" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-sumi text-washi border-t border-ash">
      <div className="mx-auto max-w-[1920px] px-6 py-24 md:px-[clamp(48px,6vw,120px)] md:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          {/* Left — wordmark + footnote */}
          <div className="md:col-span-5">
            <Wordmark size="md" tone="washi" />
            <p
              className="mt-6 font-jp text-[14px] font-light leading-[1.85] text-mist"
              lang="en"
            >
              Sourced in Japan.
              <br />
              Shipped from Tokyo.
            </p>
          </div>

          {/* Vacuum middle column */}
          <div className="hidden md:col-span-3 md:block" />

          {/* Right — index */}
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
              INDEX
            </span>
            <ul className="mt-6 space-y-4">
              {indexLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    data-cursor-label="OPEN"
                    className="inline-block font-display text-[16px] font-light text-washi transition-colors duration-medium ease-onsen-out hover:text-copper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 h-px w-full bg-ash md:mt-32" />

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-mono text-mineral">
            © 2026 ONSEN LAB CO., LTD.
            <br />
            REG. 〒113-XXXX TOKYO, BUNKYŌ-KU
          </p>
          <ul className="flex gap-8">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="VISIT"
                  className="group inline-flex items-center font-mono text-[10px] uppercase tracking-mono text-mist transition-colors duration-medium ease-onsen-out hover:text-copper"
                >
                  {s.label}
                  <span className="ml-2 transition-transform duration-medium ease-onsen-out group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
