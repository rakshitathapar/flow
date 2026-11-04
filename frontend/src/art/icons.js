import React from "react";

// ─── SKILL ICONS ────────────────────────────────────────────────────────────
// Hand-drawn figurative icons, 24x24 grid, thick ink strokes, flat accent fills.

const INK = "#2b2620";
const st = {
  fill: "none",
  stroke: INK,
  strokeWidth: 2.1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const fl = (c) => ({
  fill: c,
  stroke: INK,
  strokeWidth: 2.1,
  strokeLinejoin: "round",
});

const R = "#c74a3c",
  Y = "#e8a33d",
  T = "#2a7f79",
  P = "#7b5ea7",
  B = "#4a7fb5",
  G = "#5a9e6f",
  TROUSER = "#a8402f";

const ICONS = {
  stones: (
    <g {...st}>
      <ellipse cx="12" cy="17.5" rx="7" ry="3.4" fill={T} />
      <ellipse cx="10.5" cy="12.5" rx="5.4" ry="3.1" fill={Y} />
      <ellipse cx="12" cy="7.8" rx="3.8" ry="2.6" fill={R} />
    </g>
  ),
  gears: (
    <g {...st}>
      <circle cx="9" cy="10" r="4" fill={Y} />
      <circle cx="16.5" cy="15.5" r="3.2" fill={T} />
      <path d="M9 4.5v-2M9 17.5v-2M3.5 10h-2M14.5 10h-1M16.5 11v2M12 4l1.5-1.5" />
    </g>
  ),
  star: (
    <g {...st}>
      <path
        d="M12 3.5l2 5 5.4.5-4.1 3.6 1.2 5.3-4.5-2.9-4.5 2.9 1.2-5.3L4.6 9l5.4-.5z"
        fill={Y}
      />
    </g>
  ),
  magnifier: (
    <g {...st}>
      <circle cx="10.5" cy="10.5" r="5.6" fill="#bfe3e0" />
      <path d="M15 15l5 5" strokeWidth="3" />
    </g>
  ),
  eye: (
    <g {...st}>
      <path d="M2.5 12q4.5-6 9.5-6t9.5 6q-4.5 6-9.5 6t-9.5-6z" fill="#fdf6e9" />
      <circle cx="12" cy="12" r="3" fill={B} />
    </g>
  ),
  speech: (
    <g {...st}>
      <path d="M4 5h16v10H10l-5 4v-4H4z" fill="#fdf6e9" />
      <path d="M8 9h8M8 12h5" />
    </g>
  ),
  mic: (
    <g {...st}>
      <rect x="9" y="3" width="6" height="10" rx="3" fill={R} />
      <path d="M6 11a6 6 0 0012 0M12 17v4M9 21h6" />
    </g>
  ),
  pencil: (
    <g {...st}>
      <path d="M5 19l1-4L16.5 4.5a2 2 0 013 3L9 18z" fill={Y} />
      <path d="M15 6l3 3" />
    </g>
  ),
  dots: (
    <g {...st}>
      <circle cx="5" cy="18" r="2.2" fill={R} />
      <circle cx="12" cy="7" r="2.2" fill={Y} />
      <circle cx="19" cy="16" r="2.2" fill={T} />
      <path d="M6.5 16.5L11 9M13.8 8l3.8 6" />
    </g>
  ),
  ladder: (
    <g {...st}>
      <path d="M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10" strokeWidth="2.3" />
    </g>
  ),
  notebook: (
    <g {...st}>
      <rect x="5" y="3.5" width="14" height="17" rx="2" fill="#fdf6e9" />
      <path d="M9 3.5v17M12 8h4M12 11.5h4M12 15h2.5" />
    </g>
  ),
  prism: (
    <g {...st}>
      <path d="M12 4l8 15H4z" fill="#eae4f5" />
      <path d="M12 4l1.5 15M9 19l3-7" />
    </g>
  ),
  face: (
    <g {...st}>
      <path
        d="M8 4a7 7 0 017 7v2h2.5l-1.5 3h1a6 6 0 11-11 3V11a7 7 0 012-7z"
        fill="#f6d7b8"
      />
      <circle cx="11" cy="10" r="1.4" fill={INK} />
    </g>
  ),
  puzzle: (
    <g {...st}>
      <path d="M5 8h4a2.5 2.5 0 115 0h4v4.5a2.5 2.5 0 100 5V20H5z" fill={P} />
    </g>
  ),
  chess: (
    <g {...st}>
      <path
        d="M9 20h7M10 17.5h5M10.5 17a5 5 0 01-1-8c0-2 1.5-3.5 3.5-3.5S16.5 7 16.5 9a5 5 0 01-1 8z"
        fill="#b8a98c"
      />
    </g>
  ),
  coin: (
    <g {...st}>
      <circle cx="12" cy="12" r="8" fill={Y} />
      <circle cx="12" cy="12" r="4.6" />
    </g>
  ),
  scales: (
    <g {...st}>
      <path
        d="M12 4v16M6 20h12M4 9h16M12 4l-8 5 2.5 4a3 3 0 005-4.4M12 4l8 5-2.5 4a3 3 0 01-5-4.4"
        fill="none"
      />
      <path d="M6.5 13.4a3 3 0 005 0zM17.5 13.4a3 3 0 01-5 0z" fill={B} />
    </g>
  ),
  map: (
    <g {...st}>
      <path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z" fill="#f6d7b8" />
      <path d="M9 4v14M15 6v14" />
      <circle cx="13" cy="11" r="1.6" fill={R} />
    </g>
  ),
  chart: (
    <g {...st}>
      <path d="M4 20V5M4 20h16" />
      <rect x="7" y="12" width="3" height="6" fill={T} />
      <rect x="12" y="9" width="3" height="9" fill={Y} />
      <rect x="17" y="6" width="3" height="12" fill={R} />
    </g>
  ),
  target: (
    <g {...st}>
      <circle cx="12" cy="12" r="8.5" fill="#fdf6e9" />
      <circle cx="12" cy="12" r="5" fill={Y} />
      <circle cx="12" cy="12" r="1.8" fill={R} />
    </g>
  ),
  abacus: (
    <g {...st}>
      <rect x="4" y="5" width="16" height="14" rx="2" fill="none" />
      <path d="M4 10.5h16M4 15.5h16" />
      <circle cx="8" cy="8" r="1.5" fill={R} />
      <circle cx="12" cy="8" r="1.5" fill={Y} />
      <circle cx="9" cy="13" r="1.5" fill={T} />
      <circle cx="15" cy="13" r="1.5" fill={B} />
      <circle cx="7" cy="18" r="1.5" fill={P} />
      <circle cx="13" cy="18" r="1.5" fill={G} />
    </g>
  ),
  rocket: (
    <g {...st}>
      <path
        d="M12 3c3 2.5 4 6.5 4 9.5l3 3.5-4-.5a8 8 0 01-6 0l-4 .5 3-3.5C8 9.5 9 5.5 12 3z"
        fill="#fdf6e9"
      />
      <circle cx="12" cy="10" r="1.8" fill={B} />
      <path d="M10.5 19.5L12 22l1.5-2.5" />
    </g>
  ),
  grid: (
    <g {...st}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" fill={Y} />
      <rect x="13" y="4" width="7" height="7" rx="1.5" fill={T} />
      <rect x="4" y="13" width="7" height="7" rx="1.5" fill={R} />
      <rect x="13" y="13" width="7" height="7" rx="1.5" fill={B} />
    </g>
  ),
  checkflag: (
    <g {...st}>
      <path d="M6 21V4M6 5h11l-2.5 3.5L17 12H6" fill="#fdf6e9" />
      <path d="M8.5 8.5l2 2 3.5-3.5" stroke={G} strokeWidth="2.4" />
    </g>
  ),
  checkflag2: (
    <g {...st}>
      <path d="M6 21V4M6 5h11l-2.5 3.5L17 12H6" fill={T} />
      <path d="M8.5 8.5l2 2 3.5-3.5" stroke="#fdf6e9" strokeWidth="2.4" />
    </g>
  ),
  blocks: (
    <g {...st}>
      <circle cx="5" cy="6" r="2.4" fill={Y} />
      <rect x="10" y="4" width="6" height="4.5" rx="1.5" fill={T} />
      <path d="M5 8.5V13a3 3 0 003 3h3" />
      <path d="M13 8.5V13a3 3 0 003 3h3" />
      <circle cx="19" cy="19" r="2.2" fill={R} />
      <rect x="9" y="17" width="6" height="4.5" rx="1.5" fill={P} />
    </g>
  ),
  flag: (
    <g {...st}>
      <path d="M6 21V3" strokeWidth="2.6" />
      <path d="M6 4.5c4-2 7 2 12 0v9c-5 2-8-2-12 0z" fill={R} />
    </g>
  ),
  storyboard: (
    <g {...st}>
      <rect x="3" y="6" width="5.5" height="12" rx="1" fill="#fdf6e9" />
      <rect x="9.5" y="6" width="5.5" height="12" rx="1" fill={Y} />
      <rect x="16" y="6" width="5" height="12" rx="1" fill="#fdf6e9" />
      <path d="M4.5 10h2.5M4.5 13h2.5M17.5 10h2M17.5 13h2" />
    </g>
  ),
  megaphone: (
    <g {...st}>
      <path d="M4 10v4l3 .5V9.5zM7 9.5L17 5v14L7 14.5" fill={Y} />
      <path d="M19.5 9.5a4 4 0 010 5" />
    </g>
  ),
  "users-heart": (
    <g {...st}>
      <circle cx="8" cy="8" r="3" fill="#f6d7b8" />
      <path d="M3.5 19a4.5 4.5 0 019 0" fill={B} />
      <circle cx="16" cy="7" r="2.4" fill="#f6d7b8" />
      <path d="M12.5 17.5a3.8 3.8 0 017.6 0" fill={Y} />
      <path
        d="M12 4.5c1-1.4 3-1.4 3.6 0 .6-1.4 2.6-1.4 3.6 0 .8 1.6-1 3.3-3.6 5-2.6-1.7-4.4-3.4-3.6-5z"
        fill={R}
        transform="translate(-4 0)"
      />
    </g>
  ),
  spark: (
    <g {...st}>
      <path
        d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"
        stroke={Y}
        strokeWidth="2.4"
      />
      <circle cx="12" cy="12" r="2.6" fill={R} />
    </g>
  ),
  gem: (
    <g {...st}>
      <path d="M7 4h10l4 5-9 11L3 9z" fill="#cfe8f2" />
      <path d="M3 9h18M12 20L8.5 9M12 20l3.5-11" />
    </g>
  ),
  "heart-talk": (
    <g {...st}>
      <path
        d="M12 20l-6-5.5C3 12 3 8 6 6.5c2-1 4.3-.3 6 1.8 1.7-2.1 4-2.8 6-1.8 3 1.5 3 5.5 0 8z"
        fill={R}
        transform="scale(0.82) translate(2.6 2)"
      />
      <path d="M15 4h6v4.5h-3L15.5 11l.5-2.5H15z" fill={Y} />
    </g>
  ),
  tent: (
    <g {...st}>
      <path d="M12 4l8 15h-16z" fill={Y} />
      <path d="M12 11l3.5 8h-7z" fill={R} />
      <path d="M12 4v3" />
    </g>
  ),
  shelf: (
    <g {...st}>
      <path d="M4 5h16M4 12h16M4 19h16" strokeWidth="2.4" />
      <rect x="6" y="7.5" width="3" height="4.5" fill={R} />
      <rect x="10.5" y="7.5" width="3" height="4.5" fill={Y} />
      <rect x="15" y="14.5" width="3" height="4.5" fill={T} />
      <rect x="6" y="14.5" width="3" height="4.5" fill={B} />
    </g>
  ),
  cursor: (
    <g {...st}>
      <path d="M9 4l10 8.5-4.5.8 2.5 5-2.6 1.3-2.5-5L8 18z" fill="#fdf6e9" />
      <path d="M5 5l1.5 1.5M4 9h2M9 4v2" stroke={Y} strokeWidth="2.2" />
    </g>
  ),
  basket: (
    <g {...st}>
      <path d="M4 9h16l-1.6 10H5.6z" fill={Y} />
      <path d="M8.5 9L12 3.5 15.5 9" />
      <path d="M9.5 12.5l.8 4M14.5 12.5l-.8 4" />
    </g>
  ),
  "screen-cart": (
    <g {...st}>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" fill="#bfe3e0" />
      <path d="M9 20h6M12 16v4" />
      <path d="M7.5 7h1.6l1.2 5h5.2l1-3.2" strokeWidth="1.9" />
      <circle cx="10.8" cy="14" r="1" fill={INK} />
      <circle cx="14.6" cy="14" r="1" fill={INK} />
    </g>
  ),
  sliders: (
    <g {...st}>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <rect x="8" y="5" width="3.4" height="4" rx="1.4" fill={R} />
      <rect x="13" y="10" width="3.4" height="4" rx="1.4" fill={Y} />
      <rect x="6" y="15" width="3.4" height="4" rx="1.4" fill={T} />
    </g>
  ),
  chip: (
    <g {...st}>
      <rect x="6" y="6" width="12" height="12" rx="2" fill={G} />
      <rect x="10" y="10" width="4" height="4" fill="#fdf6e9" />
      <path d="M9 6V3M15 6V3M9 21v-3M15 21v-3M6 9H3M6 15H3M21 9h-3M21 15h-3" />
    </g>
  ),
  "target-arrow": (
    <g {...st}>
      <circle cx="11" cy="13" r="7" fill="#fdf6e9" />
      <circle cx="11" cy="13" r="3.6" fill={Y} />
      <path d="M11 13L20 4M20 4h-4M20 4v4" stroke={R} strokeWidth="2.3" />
    </g>
  ),
  funnel: (
    <g {...st}>
      <path d="M4 5h16l-6 7v6l-4 2v-8z" fill={B} />
    </g>
  ),
  growth: (
    <g {...st}>
      <path d="M4 19l5-5 3.5 3L20 9" stroke={G} strokeWidth="2.6" />
      <path d="M20 9h-4.5M20 9v4.5" stroke={G} strokeWidth="2.6" />
      <circle cx="9" cy="14" r="1.4" fill={R} />
      <circle cx="12.5" cy="17" r="1.4" fill={R} />
    </g>
  ),
  path: (
    <g {...st}>
      <path d="M5 20c8 0 3-7 8-8s4-6 6-7" strokeDasharray="3.5 3" />
      <circle cx="5" cy="20" r="2.2" fill={R} />
      <circle cx="19" cy="5" r="2.2" fill={Y} />
    </g>
  ),
  fingerprint: (
    <g {...st}>
      <path d="M12 5a8 8 0 018 8M12 9a4.5 4.5 0 014.5 4.5c0 2.5-.7 4-1.5 5.5M12 13c0 3-.8 5-2 7M4.5 13A7.6 7.6 0 018 7" />
    </g>
  ),
  boxes: (
    <g {...st}>
      <rect x="4" y="13" width="7" height="7" rx="1" fill={Y} />
      <rect x="13" y="13" width="7" height="7" rx="1" fill={T} />
      <rect x="8.5" y="5" width="7" height="6.5" rx="1" fill={R} />
      <path d="M8.5 8h7" />
    </g>
  ),
  handshake: (
    <g {...st}>
      <path
        d="M3 11l4-3 4.5 1.5L16 8l5 3.5-3.5 5-2-1.5-2.5 2.5-2.5-2L7 17z"
        fill="#f6d7b8"
      />
      <path d="M11.5 9.5l3 3" />
    </g>
  ),
  shopfront: (
    <g {...st}>
      <path
        d="M4 10l1.5-5h13L20 10M4 10v10h16V10M4 10c0 1.6 1.5 3 3.2 3s3-1.4 3-3c0 1.6 1.4 3 3.1 3 1.6 0 2.9-1.4 2.9-3 0 1.6 1.5 3 3.1 3"
        fill="#fdf6e9"
      />
      <rect x="7" y="13.5" width="4.5" height="6.5" fill={Y} />
      <rect x="14" y="13.5" width="3.5" height="3.5" fill={T} />
    </g>
  ),
  people: (
    <g {...st}>
      <circle cx="8" cy="7" r="3" fill="#f6d7b8" />
      <circle cx="16.5" cy="8" r="2.5" fill="#f6d7b8" />
      <path d="M3.5 20a4.8 4.8 0 019 0M13 20a4 4 0 017.5-1.6" fill={B} />
    </g>
  ),
  heart: (
    <g {...st}>
      <path
        d="M12 20l-6.5-6C3 11.5 3 7.5 6 6c2-1 4.3-.3 6 1.8C13.7 5.7 16 5 18 6c3 1.5 3 5.5.5 8z"
        fill={R}
      />
    </g>
  ),
  key: (
    <g {...st}>
      <circle cx="8" cy="8.5" r="4.5" fill={Y} />
      <path d="M11 12l8 8M16 17l2.5-2.5M18.5 19.5L21 17" />
    </g>
  ),
  fold: (
    <g {...st}>
      <path d="M4 18L10 6l3 6 3-6 4 12" fill="none" />
      <path d="M7.5 12.5h4" stroke={R} />
    </g>
  ),
  cards: (
    <g {...st}>
      <rect
        x="6"
        y="4"
        width="12"
        height="16"
        rx="1.6"
        fill="#fdf6e9"
        transform="rotate(6 12 12)"
      />
      <rect
        x="5.5"
        y="3.5"
        width="12"
        height="16"
        rx="1.6"
        fill={Y}
        transform="rotate(-3 11 11)"
      />
      <path d="M9 9h5M9 12h5" />
    </g>
  ),
  jar: (
    <g {...st}>
      <path
        d="M8 5h8M8 5a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2"
        fill="#e8ddd0"
      />
      <circle cx="10.5" cy="15" r="1.6" fill={Y} />
      <circle cx="14" cy="16" r="1.6" fill={R} />
      <circle cx="12.5" cy="12.5" r="1.6" fill={T} />
    </g>
  ),
  spring: (
    <g {...st}>
      <path
        d="M6 6c0-2 12-2 12 0s-12 3-12 5 12 3 12 5-12 2-12 0"
        strokeWidth="2.4"
      />
    </g>
  ),
  boot: (
    <g {...st}>
      <path d="M7 4h6v8h2c3 0 5 1.6 5 4v3H7z" fill={TROUSER} />
      <path d="M7 19h13" strokeWidth="2.6" />
    </g>
  ),
  "checkmark-shelf": (
    <g {...st}>
      <path d="M4 8h16M4 16h16" strokeWidth="2.4" />
      <rect x="6" y="3.5" width="4" height="4.5" fill={Y} />
      <rect x="12" y="3.5" width="4" height="4.5" fill={T} />
      <path d="M8 20l2.2 2 4-4.5" stroke={G} strokeWidth="2.6" />
    </g>
  ),
  badge: (
    <g {...st}>
      <circle cx="12" cy="9" r="5.5" fill={Y} />
      <path
        d="M12 6.5l1.2 2 2.3.3-1.7 1.6.4 2.3-2.2-1.1-2.2 1.1.4-2.3L8.5 8.8l2.3-.3z"
        fill="#fdf6e9"
      />
      <path d="M9 13.5L7.5 20l4.5-2.5 4.5 2.5L15 13.5" fill={R} />
    </g>
  ),
  clipboard: (
    <g {...st}>
      <rect x="5" y="4.5" width="14" height="17" rx="2" fill="#fdf6e9" />
      <rect x="9" y="2.5" width="6" height="4" rx="1.4" fill={Y} />
      <path d="M8.5 11l2 2 4-4.5M8.5 17h7" />
    </g>
  ),
  arrows: (
    <g {...st}>
      <path d="M5 9c5-4 9 4 14 0M5 15c5 4 9-4 14 0" />
      <path d="M17 7l2 2-2 2M17 13l2 2-2 2" stroke={R} strokeWidth="2.2" />
    </g>
  ),
  shop: (
    <g {...st}>
      <path d="M4 10l1.5-5h13L20 10M4 10v10h16V10" fill="#fdf6e9" />
      <path d="M4 10c0 1.6 1.5 3 3.2 3s3-1.4 3-3c0 1.6 1.4 3 3.1 3 1.6 0 2.9-1.4 2.9-3 0 1.6 1.5 3 3.1 3" />
    </g>
  ),
};

export function SkillIcon({
  icon,
  size = 44,
  className = "",
  style,
  ring = true,
  testid,
}) {
  const art = ICONS[icon] || ICONS.star;
  return (
    <div
      className={className}
      data-testid={testid || `skill-icon-${icon}`}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        {ring && (
          <circle
            cx="12"
            cy="12"
            r="11.4"
            fill="#fdf6e9"
            stroke={INK}
            strokeWidth="1.6"
          />
        )}
        {art}
      </svg>
    </div>
  );
}

export default SkillIcon;
