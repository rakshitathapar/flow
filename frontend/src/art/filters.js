import React from "react";

// Global SVG filter defs that give every stroke its wobbly hand-inked quality,
// plus the fixed grain + vignette overlays that unify AI-painted backdrops and SVG art.
export const InkFilters = () => (
  <svg
    width="0"
    height="0"
    style={{ position: "absolute" }}
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.018"
          numOctaves="2"
          seed="7"
          result="n"
        />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.8" />
      </filter>
      <filter id="wobble-sm" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.04"
          numOctaves="2"
          seed="11"
          result="n"
        />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="1.7" />
      </filter>
    </defs>
  </svg>
);

export const Grain = () => (
  <>
    <div className="grain" data-testid="grain-overlay" aria-hidden="true" />
    <div className="vignette" aria-hidden="true" />
  </>
);
