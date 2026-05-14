// Onsen Lab wordmark — text-only render of the brand mark.
// Stylized steam glyph (3 arcs over a ripple) sits above the serif logotype,
// matching the supplied brand reference.

type Size = "sm" | "md" | "lg";
type Tone = "washi" | "sumi" | "copper";

const sizeMap: Record<Size, { glyph: number; type: string; gap: string }> = {
  sm: { glyph: 22, type: "text-[18px]", gap: "gap-1" },
  md: { glyph: 36, type: "text-[28px]", gap: "gap-2" },
  lg: { glyph: 56, type: "text-[44px]", gap: "gap-3" },
};

export default function Wordmark({
  size = "md",
  tone = "washi",
  showSteam = true,
}: {
  size?: Size;
  tone?: Tone;
  showSteam?: boolean;
}) {
  const { glyph, type, gap } = sizeMap[size];
  const typeColor =
    tone === "sumi"
      ? "text-sumi"
      : tone === "copper"
      ? "text-copper"
      : "text-washi";
  const steamStroke =
    tone === "sumi" ? "var(--color-copper-leaf)" : "var(--color-copper)";
  const rippleStroke =
    tone === "sumi" ? "var(--color-copper-leaf)" : "var(--color-copper)";

  return (
    <div className={`inline-flex flex-col items-center ${gap}`} aria-label="Onsen Lab">
      {showSteam && (
        <svg
          width={glyph * 1.4}
          height={glyph}
          viewBox="0 0 70 50"
          aria-hidden="true"
        >
          {/* Three steam wisps */}
          <path
            d="M28 30 C 24 22, 30 16, 28 8"
            stroke={steamStroke}
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M35 32 C 31 24, 37 14, 35 4"
            stroke={steamStroke}
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M42 30 C 38 22, 44 16, 42 10"
            stroke={steamStroke}
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ripple ellipses */}
          {[6, 10, 14, 18].map((r) => (
            <ellipse
              key={r}
              cx="35"
              cy="40"
              rx={r}
              ry={r / 3.5}
              stroke={rippleStroke}
              strokeWidth="0.5"
              fill="none"
              opacity={0.8 - r * 0.03}
            />
          ))}
        </svg>
      )}
      <span
        className={`font-display font-light leading-none tracking-tight ${type} ${typeColor}`}
      >
        Onsen Lab
      </span>
    </div>
  );
}
