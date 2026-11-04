import React from "react";

// ─── THE PROTAGONIST ────────────────────────────────────────────────────────
// One girl, six ages. Thick ink outlines, flat fills, wobbly linework.
// Hair evolves (bob → plaits → pony → open → long → long+twist), the silhouette holds.

const INK = "#2b2620";
const HAIR = "#26201a";
const SKIN = "#f2b58c";
const TOP = "#e8a33d";
const BOTTOM = "#c0463b";
const TROUSER = "#a8402f";
const TEAL = "#2a7f79";
export const BALLOON_HUES = [
  "#c74a3c",
  "#e8a33d",
  "#2a7f79",
  "#7b5ea7",
  "#4a7fb5",
  "#d9768f",
];

const STAGES = [
  { headR: 25, legH: 40, torso: 33, hair: "bob", skirt: true },
  { headR: 23, legH: 54, torso: 41, hair: "plaits", skirt: true },
  { headR: 22, legH: 63, torso: 47, hair: "pony", skirt: true },
  { headR: 22, legH: 69, torso: 51, hair: "open", skirt: false },
  { headR: 22, legH: 72, torso: 53, hair: "long", skirt: false },
  { headR: 22, legH: 74, torso: 55, hair: "long2", skirt: false },
];

function Balloon({ x, y, hue, delay, ax, ay }) {
  const sx = x,
    sy = y + 20;
  const mx = (x + ax) / 2 + (x < ax ? -10 : 6);
  const my = (y + ay) / 2;
  return (
    <g className="anim-bob" style={{ animationDelay: `${delay}s` }}>
      <path
        d={`M ${sx} ${sy} Q ${mx} ${my} ${ax} ${ay}`}
        fill="none"
        stroke={INK}
        strokeWidth="2.6"
      />
      <ellipse
        cx={x}
        cy={y}
        rx="16"
        ry="19"
        fill={hue}
        stroke={INK}
        strokeWidth="4"
      />
      <path
        d={`M ${x - 4} ${y + 18} L ${x} ${y + 23} L ${x + 4} ${y + 18} Z`}
        fill={hue}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse
        cx={x - 6}
        cy={y - 6}
        rx="4.5"
        ry="7"
        fill="#ffffff"
        opacity="0.4"
        transform={`rotate(-20 ${x - 6} ${y - 6})`}
      />
    </g>
  );
}

function BalloonBunch({ count, ax, ay }) {
  const n = Math.min(count, 6);
  const OFFSETS = [
    [-30, -118],
    [-58, -150],
    [-10, -160],
    [-74, -112],
    [-44, -182],
    [4, -132],
  ];
  const balloons = [];
  for (let i = 0; i < n; i++) {
    const [ox, oy] = OFFSETS[i];
    balloons.push(
      <Balloon
        key={i}
        x={ax + ox}
        y={ay + oy}
        hue={BALLOON_HUES[i % BALLOON_HUES.length]}
        delay={i * 0.45}
        ax={ax}
        ay={ay}
      />,
    );
  }
  return <g data-testid="balloon-bunch">{balloons}</g>;
}

function Hair({ type, cx, cy, r }) {
  const cap = `M ${cx - r * 1.04} ${cy + r * 0.12} Q ${cx - r * 1.1} ${cy - r * 1.3} ${cx + r * 0.15} ${cy - r * 1.32} Q ${cx + r * 1.08} ${cy - r * 1.22} ${cx + r * 1.0} ${cy + r * 0.05} Q ${cx + r * 0.62} ${cy - r * 0.52} ${cx - r * 0.1} ${cy - r * 0.56} Q ${cx - r * 0.8} ${cy - r * 0.5} ${cx - r * 1.04} ${cy + r * 0.12} Z`;
  const backMass = (drop, wide) =>
    `M ${cx - r * 0.92} ${cy - r * 0.72} Q ${cx - r * (1.05 + wide * 0.15)} ${cy + r * drop} ${cx - r * 0.5} ${cy + r * drop} Q ${cx - r * 1.0} ${cy} ${cx - r * 0.85} ${cy - r * 0.85} Z`;
  return (
    <g fill={HAIR} stroke={INK} strokeWidth="3.4" strokeLinejoin="round">
      {/* back mass behind head */}
      {type === "bob" && <path d={backMass(0.75, 0)} />}
      {type === "plaits" && <path d={backMass(0.8, 0)} />}
      {type === "pony" && <path d={backMass(0.6, 0)} />}
      {type === "open" && <path d={backMass(1.55, 0.6)} />}
      {type === "long" && <path d={backMass(1.9, 0.8)} />}
      {type === "long2" && <path d={backMass(1.9, 0.8)} />}
      {/* cap + bangs */}
      <path d={cap} />
      {type === "plaits" && (
        <g>
          <path
            d={`M ${cx - r * 0.95} ${cy + r * 0.35} q -10 16 -4 30`}
            fill="none"
            stroke={INK}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d={`M ${cx - r * 0.95} ${cy + r * 0.35} q -10 16 -4 30`}
            fill="none"
            stroke={HAIR}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx={cx - r * 1.02}
            cy={cy + r * 0.32}
            r="4"
            fill={BOTTOM}
            stroke={INK}
            strokeWidth="2.4"
          />
        </g>
      )}
      {type === "pony" && (
        <g>
          <path
            d={`M ${cx - r * 0.8} ${cy - r * 0.9} q -26 -8 -30 22 q -3 22 6 34`}
            fill="none"
            stroke={INK}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d={`M ${cx - r * 0.8} ${cy - r * 0.9} q -26 -8 -30 22 q -3 22 6 34`}
            fill="none"
            stroke={HAIR}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <circle
            cx={cx - r * 0.86}
            cy={cy - r * 0.82}
            r="4.5"
            fill={BOTTOM}
            stroke={INK}
            strokeWidth="2.4"
          />
        </g>
      )}
      {type === "long2" && (
        <circle
          cx={cx - r * 0.25}
          cy={cy - r * 1.18}
          r="8"
          fill={HAIR}
          stroke={INK}
          strokeWidth="3"
        />
      )}
    </g>
  );
}

export function Character({
  stage = 0,
  walking = false,
  balloons = 0,
  width = 130,
  flip = false,
  showBackpack = true,
  view = "side",
  className = "",
  style,
}) {
  if (view === "back")
    return (
      <BackCharacter
        stage={stage}
        walking={walking}
        balloons={balloons}
        width={width}
        className={className}
        style={style}
      />
    );
  const s = STAGES[Math.max(0, Math.min(5, stage))];
  const cx = 110,
    feetY = 224;
  const hipY = feetY - s.legH;
  const shY = hipY - s.torso;
  const headCY = shY - s.headR + 4;
  const handX = cx + 22,
    handY = shY + s.torso * 0.78;

  const leg = (front) => {
    const x = cx + (front ? 7 : -6);
    const cls = walking ? (front ? "leg-a" : "leg-b") : "";
    return (
      <g className={cls} key={front ? "f" : "b"}>
        <line
          x1={x}
          y1={s.skirt ? hipY + s.legH * 0.38 : hipY}
          x2={x}
          y2={feetY - 6}
          stroke={INK}
          strokeWidth="13"
          strokeLinecap="round"
        />
        <line
          x1={x}
          y1={s.skirt ? hipY + s.legH * 0.38 : hipY}
          x2={x}
          y2={feetY - 6}
          stroke={s.skirt ? SKIN : TROUSER}
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        <ellipse
          cx={x + 4}
          cy={feetY - 3}
          rx="10"
          ry="5.5"
          fill={BOTTOM}
          stroke={INK}
          strokeWidth="3.4"
        />
      </g>
    );
  };

  const arm = (front) => {
    const x = cx + (front ? 10 : -8);
    const y = shY + 8;
    const cls = walking ? (front ? "arm-b" : "") : "";
    const ex = front ? x + 13 : x - 9;
    const ey = y + s.torso * 0.62;
    return (
      <g className={cls} key={front ? "af" : "ab"}>
        <line
          x1={x}
          y1={y}
          x2={ex}
          y2={ey}
          stroke={INK}
          strokeWidth="11.5"
          strokeLinecap="round"
        />
        <line
          x1={x}
          y1={y}
          x2={ex}
          y2={ey}
          stroke={SKIN}
          strokeWidth="6.5"
          strokeLinecap="round"
        />
      </g>
    );
  };

  return (
    <div
      className={className}
      data-testid={`character-stage-${stage}`}
      style={{
        width,
        display: "block",
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 220 240"
        width="100%"
        style={{ overflow: "visible", display: "block" }}
      >
        <g className="wobble-sm">
          {balloons > 0 && (
            <BalloonBunch count={balloons} ax={handX} ay={handY} />
          )}
          {/* back arm */}
          {arm(false)}
          {/* backpack */}
          {showBackpack && (
            <g>
              <rect
                x={cx - 46}
                y={shY + 2}
                width="34"
                height={s.torso * 1.02}
                rx="12"
                fill={TEAL}
                stroke={INK}
                strokeWidth="4.5"
              />
              <path
                d={`M ${cx - 46} ${shY + 2 + s.torso * 0.32} h 34 v -${s.torso * 0.2} q 0 -12 -12 -12 h -10 q -12 0 -12 12 Z`}
                fill="#22645f"
                stroke={INK}
                strokeWidth="3.6"
              />
              <rect
                x={cx - 41}
                y={shY + s.torso * 0.68}
                width="24"
                height="12"
                rx="6"
                fill="#e8a33d"
                stroke={INK}
                strokeWidth="3"
              />
              <path
                d={`M ${cx - 14} ${shY + 6} Q ${cx - 2} ${shY + 2} ${cx + 4} ${shY + 12}`}
                fill="none"
                stroke={INK}
                strokeWidth="4"
              />
            </g>
          )}
          {/* body + legs */}
          <g className={walking ? "char-body" : ""}>
            {leg(false)}
            {s.skirt ? (
              <path
                d={`M ${cx - 17} ${hipY - 4} L ${cx + 17} ${hipY - 4} L ${cx + 25} ${hipY + s.legH * 0.42} L ${cx - 26} ${hipY + s.legH * 0.42} Z`}
                fill={BOTTOM}
                stroke={INK}
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d={`M ${cx - 17} ${hipY - 4} L ${cx + 17} ${hipY - 4} L ${cx + 19} ${hipY + 14} L ${cx - 19} ${hipY + 14} Z`}
                fill={TROUSER}
                stroke={INK}
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
            )}
            {/* torso */}
            <rect
              x={cx - 17}
              y={shY - 2}
              width="35"
              height={s.torso + 8}
              rx="13"
              fill={TOP}
              stroke={INK}
              strokeWidth="4.5"
            />
            {leg(true)}
            {arm(true)}
            {/* head */}
            <circle
              cx={cx + 2}
              cy={headCY}
              r={s.headR}
              fill={SKIN}
              stroke={INK}
              strokeWidth="4.5"
            />
            <Hair type={s.hair} cx={cx + 2} cy={headCY} r={s.headR} />
            {/* face — minimal, quieter with age */}
            {stage >= 3 ? (
              <g>
                <circle
                  cx={cx + 2 + s.headR * 0.5}
                  cy={headCY - 1}
                  r="2.1"
                  fill={INK}
                />
                <path
                  d={`M ${cx + 2 + s.headR * 0.28} ${headCY + s.headR * 0.42} q ${s.headR * 0.22} ${s.headR * 0.16} ${s.headR * 0.44} 0`}
                  fill="none"
                  stroke={INK}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <g>
                <circle
                  cx={cx + 2 + s.headR * 0.5}
                  cy={headCY}
                  r="2.6"
                  fill={INK}
                />
                <path
                  d={`M ${cx + 2 + s.headR * 0.24} ${headCY + s.headR * 0.45} q ${s.headR * 0.26} ${s.headR * 0.18} ${s.headR * 0.52} 0`}
                  fill="none"
                  stroke={INK}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </g>
            )}
            {stage < 2 && (
              <circle
                cx={cx + 2 + s.headR * 0.62}
                cy={headCY + s.headR * 0.2}
                r="4"
                fill="#e8724a"
                opacity="0.22"
              />
            )}
            {/* signature hair-clip */}
            <rect
              x={cx + 2 + s.headR * 0.12}
              y={headCY - s.headR * 0.78}
              width="10"
              height="6"
              rx="3"
              fill={BOTTOM}
              stroke={INK}
              strokeWidth="2.4"
              transform={`rotate(14 ${cx + 2 + s.headR * 0.12} ${headCY - s.headR * 0.78})`}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

// Seen from behind — back of head, backpack, no face. The intro uses this view.
function BackCharacter({
  stage = 0,
  walking = false,
  balloons = 0,
  width = 130,
  className = "",
  style,
}) {
  const s = STAGES[Math.max(0, Math.min(5, stage))];
  const cx = 110,
    feetY = 224;
  const hipY = feetY - s.legH;
  const shY = hipY - s.torso;
  const headCY = shY - s.headR + 4;
  const handX = cx + 26,
    handY = shY + s.torso * 0.8;

  const hairBack = `M ${cx - s.headR * 1.06} ${headCY + s.headR * 0.18} Q ${cx - s.headR * 1.16} ${headCY - s.headR * 1.16} ${cx} ${headCY - s.headR * 1.3} Q ${cx + s.headR * 1.16} ${headCY - s.headR * 1.16} ${cx + s.headR * 1.06} ${headCY + s.headR * 0.18} Q ${cx + s.headR * 0.92} ${headCY + s.headR * (s.hair === "bob" ? 0.72 : 1.35)} ${cx} ${headCY + s.headR * (s.hair === "bob" ? 0.78 : 1.42)} Q ${cx - s.headR * 0.92} ${headCY + s.headR * (s.hair === "bob" ? 0.72 : 1.35)} ${cx - s.headR * 1.06} ${headCY + s.headR * 0.18} Z`;

  const leg = (front) => {
    const x = cx + (front ? 7 : -6);
    const cls = walking ? (front ? "leg-a" : "leg-b") : "";
    return (
      <g className={cls} key={front ? "f" : "b"}>
        <line
          x1={x}
          y1={s.skirt ? hipY + s.legH * 0.38 : hipY}
          x2={x}
          y2={feetY - 6}
          stroke={INK}
          strokeWidth="13"
          strokeLinecap="round"
        />
        <line
          x1={x}
          y1={s.skirt ? hipY + s.legH * 0.38 : hipY}
          x2={x}
          y2={feetY - 6}
          stroke={s.skirt ? SKIN : TROUSER}
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        <ellipse
          cx={x}
          cy={feetY - 3}
          rx="10"
          ry="5.5"
          fill={BOTTOM}
          stroke={INK}
          strokeWidth="3.4"
        />
      </g>
    );
  };

  return (
    <div
      className={className}
      data-testid={`character-back-stage-${stage}`}
      style={{ width, display: "block", ...style }}
    >
      <svg
        viewBox="0 0 220 240"
        width="100%"
        style={{ overflow: "visible", display: "block" }}
      >
        <g className="wobble-sm">
          {balloons > 0 && (
            <BalloonBunch count={balloons} ax={handX} ay={handY} />
          )}
          {/* arms from behind, slightly out */}
          <g className={walking ? "arm-b" : ""}>
            <line
              x1={cx - 12}
              y1={shY + 10}
              x2={cx - 19}
              y2={shY + s.torso * 0.66}
              stroke={INK}
              strokeWidth="11.5"
              strokeLinecap="round"
            />
            <line
              x1={cx - 12}
              y1={shY + 10}
              x2={cx - 19}
              y2={shY + s.torso * 0.66}
              stroke={SKIN}
              strokeWidth="6.5"
              strokeLinecap="round"
            />
          </g>
          <g className={walking ? "arm-a" : ""}>
            <line
              x1={cx + 12}
              y1={shY + 10}
              x2={cx + 19}
              y2={shY + s.torso * 0.66}
              stroke={INK}
              strokeWidth="11.5"
              strokeLinecap="round"
            />
            <line
              x1={cx + 12}
              y1={shY + 10}
              x2={cx + 19}
              y2={shY + s.torso * 0.66}
              stroke={SKIN}
              strokeWidth="6.5"
              strokeLinecap="round"
            />
          </g>
          <g className={walking ? "char-body" : "anim-bob-sm"}>
            {leg(false)}
            {/* skirt / hips */}
            {s.skirt ? (
              <path
                d={`M ${cx - 17} ${hipY - 4} L ${cx + 17} ${hipY - 4} L ${cx + 25} ${hipY + s.legH * 0.42} L ${cx - 26} ${hipY + s.legH * 0.42} Z`}
                fill={BOTTOM}
                stroke={INK}
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d={`M ${cx - 17} ${hipY - 4} L ${cx + 17} ${hipY - 4} L ${cx + 19} ${hipY + 14} L ${cx - 19} ${hipY + 14} Z`}
                fill={TROUSER}
                stroke={INK}
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
            )}
            {/* torso */}
            <rect
              x={cx - 17}
              y={shY - 2}
              width="35"
              height={s.torso + 8}
              rx="13"
              fill={TOP}
              stroke={INK}
              strokeWidth="4.2"
            />
            {leg(true)}
            {/* the backpack, front and centre */}
            <rect
              x={cx - 21}
              y={shY + 4}
              width="42"
              height={s.torso * 1.04}
              rx="14"
              fill={TEAL}
              stroke={INK}
              strokeWidth="4.5"
            />
            <path
              d={`M ${cx - 21} ${shY + 4 + s.torso * 0.34} h 42 v -${s.torso * 0.2} q 0 -14 -14 -14 h -14 q -14 0 -14 14 Z`}
              fill="#22645f"
              stroke={INK}
              strokeWidth="3.8"
            />
            <rect
              x={cx - 14}
              y={shY + s.torso * 0.7}
              width="28"
              height="13"
              rx="6.5"
              fill="#e8a33d"
              stroke={INK}
              strokeWidth="3"
            />
            <circle
              cx={cx}
              cy={shY + s.torso * 0.52}
              r="3.4"
              fill="#e8a33d"
              stroke={INK}
              strokeWidth="2.4"
            />
            {/* head from behind: full hair */}
            <circle
              cx={cx}
              cy={headCY}
              r={s.headR}
              fill={SKIN}
              stroke={INK}
              strokeWidth="4.2"
            />
            <path
              d={hairBack}
              fill={HAIR}
              stroke={INK}
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
            {s.hair === "plaits" && (
              <g>
                <path
                  d={`M ${cx - s.headR * 0.95} ${headCY + s.headR * 0.4} q -11 15 -6 29`}
                  fill="none"
                  stroke={INK}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${cx - s.headR * 0.95} ${headCY + s.headR * 0.4} q -11 15 -6 29`}
                  fill="none"
                  stroke={HAIR}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${cx + s.headR * 0.95} ${headCY + s.headR * 0.4} q 11 15 6 29`}
                  fill="none"
                  stroke={INK}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${cx + s.headR * 0.95} ${headCY + s.headR * 0.4} q 11 15 6 29`}
                  fill="none"
                  stroke={HAIR}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle
                  cx={cx - s.headR * 1.02}
                  cy={headCY + s.headR * 0.36}
                  r="4"
                  fill={BOTTOM}
                  stroke={INK}
                  strokeWidth="2.4"
                />
                <circle
                  cx={cx + s.headR * 1.02}
                  cy={headCY + s.headR * 0.36}
                  r="4"
                  fill={BOTTOM}
                  stroke={INK}
                  strokeWidth="2.4"
                />
              </g>
            )}
            {s.hair === "pony" && (
              <g
                className="anim-sway"
                style={{
                  transformOrigin: `${cx}px ${headCY - s.headR * 0.6}px`,
                }}
              >
                <path
                  d={`M ${cx} ${headCY - s.headR * 0.4} q 4 18 -2 34 q -3 10 2 16`}
                  fill="none"
                  stroke={INK}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${cx} ${headCY - s.headR * 0.4} q 4 18 -2 34 q -3 10 2 16`}
                  fill="none"
                  stroke={HAIR}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </g>
            )}
            {s.hair === "long2" && (
              <circle
                cx={cx}
                cy={headCY - s.headR * 1.22}
                r="9"
                fill={HAIR}
                stroke={INK}
                strokeWidth="3"
              />
            )}
            {/* signature clip, seen from behind */}
            <rect
              x={cx + s.headR * 0.3}
              y={headCY - s.headR * 0.92}
              width="10"
              height="6"
              rx="3"
              fill={BOTTOM}
              stroke={INK}
              strokeWidth="2.2"
              transform={`rotate(18 ${cx + s.headR * 0.3} ${headCY - s.headR * 0.92})`}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
export function Cat({ width = 64, className = "", style }) {
  return (
    <div
      className={className}
      style={{ width, display: "block", ...style }}
      data-testid="intro-cat"
    >
      <svg
        viewBox="0 0 100 90"
        width="100%"
        style={{ overflow: "visible", display: "block" }}
      >
        <g className="wobble-sm">
          <g className="anim-sway" style={{ transformOrigin: "76px 62px" }}>
            <path
              d="M 74 60 Q 92 54 88 36"
              fill="none"
              stroke={INK}
              strokeWidth="9"
              strokeLinecap="round"
            />
          </g>
          <ellipse cx="52" cy="66" rx="26" ry="20" fill={INK} />
          <circle cx="40" cy="42" r="17" fill={INK} />
          <path d="M 28 32 L 24 16 L 38 26 Z" fill={INK} />
          <path d="M 52 32 L 58 16 L 62 30 Z" fill={INK} />
          <circle cx="35" cy="42" r="2.6" fill="#fdf6e9" />
          <circle cx="46" cy="42" r="2.6" fill="#fdf6e9" />
          <path
            d="M 38 49 q 3 2.6 6 0"
            stroke="#fdf6e9"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 24 44 L 12 41 M 24 48 L 13 50"
            stroke={INK}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
