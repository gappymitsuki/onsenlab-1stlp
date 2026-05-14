"use client";

// Ambient steam field — pure CSS layered radial plumes with a slow drift
// and a static reduced-motion fallback. The earlier r3f/three.js fragment
// shader was pulled because @react-three/fiber 8.x reaches for a React
// internal (ReactCurrentBatchConfig) that React 18.3 removed, crashing
// hydration on the client even behind a dynamic ssr:false import.

export default function SteamField() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div
        className="absolute -inset-1/4 opacity-65 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(42% 32% at 28% 72%, rgba(184, 115, 51, 0.14) 0%, rgba(10,9,8,0) 60%), radial-gradient(38% 28% at 72% 38%, rgba(168, 163, 157, 0.10) 0%, rgba(10,9,8,0) 60%)",
          animation: "steamA 32s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0 opacity-55 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(52% 42% at 60% 82%, rgba(139, 90, 43, 0.10) 0%, rgba(10,9,8,0) 70%)",
          animation: "steamB 48s ease-in-out infinite alternate-reverse",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 100%, rgba(184,115,51,0.08) 0%, rgba(10,9,8,0) 65%)",
        }}
      />
      <div
        className="hidden absolute inset-0 motion-reduce:block"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 75%, rgba(184, 115, 51, 0.10) 0%, rgba(10,9,8,0) 70%)",
        }}
      />
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
        @keyframes steamA {
          0%   { transform: translate3d(-3%, 2%, 0) scale(1); }
          100% { transform: translate3d(4%, -2%, 0) scale(1.1); }
        }
        @keyframes steamB {
          0%   { transform: translate3d(2%, -1%, 0) scale(1.05); }
          100% { transform: translate3d(-3%, 3%, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
