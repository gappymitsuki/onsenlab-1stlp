"use client";

// Placeholder ambient steam layer.
//
// TODO (out of scope for first build): replace this with the Three.js +
// Curl-Noise + Domain-Warping fragment shader specified in §6.1 of the
// Quiet Volume doctrine. Until then, this CSS-only layer at least
// communicates the intended chromatic & motion register so the sumi
// hero never reads as a flat black plate.
//
// Implementation choice when the shader lands:
//   - OGL or react-three/fiber, fragment shader sized to viewport
//   - Mouse-position uniform with 0.05× lag
//   - Mobile fallback: 512×512 texture, 30fps cap
//   - prefers-reduced-motion → static gradient (this component already
//     renders that fallback today)

export default function SteamField() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Two slow-drifting radial steam plumes */}
      <div
        className="absolute -inset-1/4 opacity-60 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(40% 30% at 30% 70%, rgba(184, 115, 51, 0.10) 0%, rgba(10,9,8,0) 60%), radial-gradient(35% 25% at 70% 40%, rgba(168, 163, 157, 0.08) 0%, rgba(10,9,8,0) 60%)",
          animation: "steam-drift 32s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute inset-0 opacity-50 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(50% 40% at 60% 80%, rgba(139, 90, 43, 0.08) 0%, rgba(10,9,8,0) 70%)",
          animation: "steam-drift 48s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Static fallback for reduced-motion */}
      <div
        className="hidden absolute inset-0 motion-reduce:block"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 70%, rgba(184, 115, 51, 0.10) 0%, rgba(10,9,8,0) 70%)",
        }}
      />
      {/* Subtle film grain via SVG noise */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="onsen-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#onsen-noise)" />
      </svg>

      <style>{`
        @keyframes steam-drift {
          0%   { transform: translate3d(-3%, 2%, 0) scale(1); }
          100% { transform: translate3d(4%, -2%, 0) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
