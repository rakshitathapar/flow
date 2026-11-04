import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "../game/audio";

// Shared hand-drawn game primitives.

export function AimThrow({
  onRelease,
  disabled,
  className = "",
  children,
  hint,
}) {
  const ref = useRef(null);
  const [drag, setDrag] = useState(null);
  const local = (e) => {
    const r = ref.current.getBoundingClientRect();
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      w: r.width,
      h: r.height,
    };
  };
  const down = (e) => {
    if (disabled) return;
    e.preventDefault();
    const p = local(e);
    if (e.currentTarget.setPointerCapture) {
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
    }
    setDrag({ sx: p.x, sy: p.y, cx: p.x, cy: p.y, w: p.w });
    sfx("click");
  };
  const move = (e) => {
    if (!drag) return;
    const p = local(e);
    setDrag((d) => ({ ...d, cx: p.x, cy: p.y }));
  };
  const up = (e) => {
    if (!drag) return;
    if (e && e.currentTarget && e.currentTarget.releasePointerCapture && e.pointerId != null) {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    const dx = drag.sx - drag.cx,
      dy = drag.sy - drag.cy;
    const power = Math.min(1, Math.hypot(dx, dy) / (drag.w * 0.32));
    const ang = Math.atan2(dy, dx);
    const isTap = Math.hypot(drag.cx - drag.sx, drag.cy - drag.sy) < 14;
    setDrag(null);
    onRelease(
      isTap ? { tap: { x: drag.cx, y: drag.cy } } : { ang, power, dx, dy },
    );
  };
  const d =
    drag && Math.hypot(drag.cx - drag.sx, drag.cy - drag.sy) > 12 ? drag : null;
  const ang = d ? Math.atan2(d.sy - d.cy, d.sx - d.cx) : 0;
  const len = d ? Math.min(120, Math.hypot(d.sx - d.cx, d.sy - d.cy) * 1.4) : 0;
  return (
    <div
      ref={ref}
      className={`relative no-touch ${className}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={() => setDrag(null)}
      data-testid="aim-throw-surface"
    >
      {children}
      {hint && !d && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-hand text-lg text-[#4a4238]">
          {hint}
        </div>
      )}
      {d && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <g
            transform={`translate(${d.sx} ${d.sy}) rotate(${(ang * 180) / Math.PI})`}
            className="wobble-sm"
          >
            <line
              x1="0"
              y1="0"
              x2={len}
              y2="0"
              stroke="#c74a3c"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="2 10"
              opacity="0.9"
            />
            <path
              d={`M ${len} 0 L ${len - 14} -8 L ${len - 10} 0 L ${len - 14} 8 Z`}
              fill="#c74a3c"
              stroke="#2b2620"
              strokeWidth="2.5"
            />
          </g>
        </svg>
      )}
    </div>
  );
}

export function Burst({
  n = 14,
  hues = ["#c74a3c", "#e8a33d", "#2a7f79", "#7b5ea7"],
}) {
  const parts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + Math.random();
    const dist = 60 + Math.random() * 90;
    return {
      x: Math.cos(a) * dist,
      y: Math.sin(a) * dist,
      c: hues[i % hues.length],
      s: 6 + Math.random() * 8,
      r: Math.random() * 180,
    };
  });
  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      data-testid="burst"
    >
      {parts.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.1, rotate: p.r }}
          transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.012 }}
          className="absolute block"
          style={{
            width: p.s,
            height: p.s,
            background: p.c,
            border: "2px solid #2b2620",
            borderRadius: i % 2 ? "50%" : "60% 40% 55% 45%",
          }}
        />
      ))}
    </div>
  );
}

export function ProgressPips({ total, done, label }) {
  return (
    <div className="flex items-center gap-2" data-testid="game-progress-pips">
      {label && (
        <span className="font-hand text-lg leading-none mr-1">{label}</span>
      )}
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="inline-block rounded-full border-2 border-[#2b2620]"
          style={{
            width: 13,
            height: 13,
            background: i < done ? "#c74a3c" : "#fdf6e9",
          }}
        />
      ))}
    </div>
  );
}

export function Chip({
  children,
  onClick,
  active,
  hue = "#e8a33d",
  testid,
  disabled,
  className = "",
}) {
  return (
    <button
      data-testid={testid}
      disabled={disabled}
      onClick={() => {
        if (!disabled && onClick) {
          sfx("click");
          onClick();
        }
      }}
      className={`btn-hand text-sm sm:text-base ${className}`}
      style={
        active
          ? {
              background: hue,
              color: "#2b2620",
              transform: "translate(2px,3px)",
              boxShadow: "1px 1px 0 rgba(43,38,32,.9)",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

export function DoneOverlay({
  title,
  line,
  onContinue,
  testid = "game-done-overlay",
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(43,38,32,0.45)] p-4"
        data-testid={testid}
      >
        <motion.div
          initial={{ y: 40, rotate: -2, scale: 0.9 }}
          animate={{ y: 0, rotate: -1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="paper-card relative max-w-md w-full p-6 text-center"
        >
          <Burst />
          <div className="font-display text-2xl sm:text-3xl font-extrabold">
            {title}
          </div>
          {line && <p className="font-body mt-2 text-[#4a4238]">{line}</p>}
          <button
            data-testid="game-done-continue"
            className="btn-hand btn-red mt-5 text-lg"
            onClick={() => {
              sfx("chime");
              onContinue();
            }}
          >
            Continue
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
