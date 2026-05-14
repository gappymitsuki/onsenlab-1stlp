"use client";

// TASK-03 — WebGL Steam Field
// Curl-noise + domain-warping fragment shader on a full-viewport plane.
// Loaded via next/dynamic with ssr:false so r3f never touches the server
// renderer (which throws ReactCurrentBatchConfig in static export).
// Mobile and prefers-reduced-motion render a static CSS gradient fallback.

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SteamCanvas = dynamic(() => import("./SteamCanvas"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 80%, rgba(184,115,51,0.10) 0%, rgba(10,9,8,0) 70%), #0A0908",
      }}
    />
  ),
});

export default function SteamField() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tooSmall = window.matchMedia("(max-width: 480px)").matches;
    if (!reduced && !tooSmall) setEnabled(true);
  }, []);

  if (!enabled) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 80%, rgba(184,115,51,0.10) 0%, rgba(10,9,8,0) 70%), #0A0908",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <SteamCanvas />
    </div>
  );
}
