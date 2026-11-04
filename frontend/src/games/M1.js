import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AimThrow, DoneOverlay } from "./kit";
import { sfx } from "../game/audio";

// MILESTONE 1 — Pithoo / Lagori: seven stones, one throw.

const STONES = Array.from({ length: 7 }, (_, i) => i);
const BALL_START = { x: 14, y: 70 }; // % of board
const STACK = { x: 55, y: 80 };

export default function Pithoo({ onDone }) {
  const boardRef = useRef(null);
  const [flying, setFlying] = useState(false);
  const [ball, setBall] = useState(null); // landing % while flying
  const [rest, setRest] = useState(BALL_START); // resting ball position %
  const [knocked, setKnocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [done, setDone] = useState(false);

  const release = (opts) => {
    if (flying || done || knocked) return;
    const r = boardRef.current.getBoundingClientRect();
    const stackPx = {
      x: (STACK.x / 100) * r.width,
      y: (STACK.y / 100) * r.height,
    };
    const autoHit = attempts >= 2; // third throw always connects — nobody gets stuck
    let land;
    if (autoHit) {
      land = { x: stackPx.x + (Math.random() * 36 - 18), y: stackPx.y - 8 };
    } else if (opts.tap) {
      land = { x: opts.tap.x, y: opts.tap.y };
      if (Math.hypot(land.x - stackPx.x, land.y - stackPx.y) < 170)
        land = {
          x: stackPx.x + (Math.random() * 44 - 22),
          y: stackPx.y - 6 - Math.random() * 12,
        };
    } else {
      const mag = Math.hypot(opts.dx, opts.dy) || 1;
      const ux = opts.dx / mag,
        uy = opts.dy / mag;
      const dist = opts.power * r.width * 1.4;
      land = {
        x: (rest.x / 100) * r.width + ux * dist,
        y: (rest.y / 100) * r.height + uy * dist,
      };
    }
    const tol = 110 + Math.min(attempts, 3) * 40 + (r.width < 520 ? 34 : 0);
    const hit = Math.hypot(land.x - stackPx.x, land.y - stackPx.y) < tol;
    setBall({ x: (land.x / r.width) * 100, y: (land.y / r.height) * 100 });
    setFlying(true);
    setAttempts((a) => a + 1);
    setTimeout(() => {
      setFlying(false);
      setRest({ x: (land.x / r.width) * 100, y: (land.y / r.height) * 100 });
      setBall(null);
      if (hit) {
        sfx("thud");
        setTimeout(() => sfx("tada"), 250);
        setKnocked(true);
        setTimeout(() => setDone(true), 1400);
      } else {
        sfx("thud");
      }
    }, 620);
  };

  const ballEl = (pos, key) => (
    <div
      key={key}
      className="absolute rounded-full"
      data-testid="pithoo-ball"
      style={{
        width: "min(4.5vw,26px)",
        height: "min(4.5vw,26px)",
        background: "#c74a3c",
        border: "3px solid #2b2620",
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: "translate(-50%,-50%)",
      }}
    />
  );

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-4 pt-1 text-center sm:text-left">
        <span className="font-hand text-xl text-[#fdf6e9] drop-shadow-[0_2px_0_rgba(43,38,32,0.9)]">
          {knocked
            ? "The tower is down!"
            : attempts === 0
              ? "Drag back from the ball and release — or tap the stones for an easy hit."
              : `Throw ${attempts} — aim for the stones. A tap works too.`}
        </span>
      </div>

      <AimThrow
        onRelease={release}
        disabled={flying || done}
        className="flex-1 mx-2 mb-2 sm:mx-6 sm:mb-4"
        hint={attempts === 0 ? "" : undefined}
      >
        <div
          ref={boardRef}
          className="relative h-full w-full"
          data-testid="pithoo-board"
        >
          {/* dusty ground */}
          <svg
            className="absolute inset-x-0 bottom-0 w-full h-[34%]"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            <path
              d="M0 7 Q 25 2 50 7 T 100 6 L 100 30 L 0 30 Z"
              fill="#d8a86a"
              stroke="#2b2620"
              strokeWidth="0.7"
            />
          </svg>

          {/* stone stack */}
          <div
            className="absolute"
            style={{
              left: `${STACK.x}%`,
              top: `${STACK.y}%`,
              transform: "translate(-50%,-100%)",
            }}
            data-testid="pithoo-stones"
          >
            <svg
              width="130"
              height="130"
              viewBox="0 0 130 130"
              style={{ overflow: "visible" }}
            >
              {STONES.map((i) => (
                <motion.ellipse
                  key={i}
                  cx={65 + (i % 2 ? 3 : -2)}
                  cy={118 - i * 15}
                  rx="27"
                  ry="11"
                  fill={
                    [
                      "#8a8f96",
                      "#a5aa8f",
                      "#b58d6f",
                      "#8a8f96",
                      "#a5aa8f",
                      "#b58d6f",
                      "#8a8f96",
                    ][i]
                  }
                  stroke="#2b2620"
                  strokeWidth="3.6"
                  animate={
                    knocked
                      ? {
                          x: (i % 2 ? 1 : -1) * (44 + i * 18),
                          y: -10 - i * 13,
                          rotate: (i % 2 ? 1 : -1) * (30 + i * 14),
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.75,
                    ease: "easeOut",
                    delay: i * 0.035,
                  }}
                  style={{ transformOrigin: "65px 118px" }}
                />
              ))}
              {!knocked && (
                <circle
                  cx="65"
                  cy="12"
                  r="11"
                  fill="#c74a3c"
                  stroke="#2b2620"
                  strokeWidth="3.4"
                />
              )}
            </svg>
          </div>

          {/* resting ball + flying ball */}
          {!flying && !knocked && ballEl(rest, "rest")}
          {flying && ball && (
            <motion.div
              className="absolute rounded-full"
              data-testid="pithoo-flying-ball"
              style={{
                width: "min(4.5vw,26px)",
                height: "min(4.5vw,26px)",
                background: "#c74a3c",
                border: "3px solid #2b2620",
                left: `${BALL_START.x}%`,
                top: `${BALL_START.y}%`,
                transform: "translate(-50%,-50%)",
                zIndex: 5,
              }}
              initial={{ x: 0, y: 0 }}
              animate={{ left: `${ball.x}%`, top: `${ball.y}%` }}
              transition={{ duration: 0.58, ease: "easeOut" }}
            />
          )}

          {attempts >= 2 && !knocked && !flying && (
            <div
              className="absolute font-hand text-xl text-[#fdf6e9] drop-shadow-[0_2px_0_rgba(43,38,32,0.9)]"
              style={{
                left: `${STACK.x}%`,
                top: `${STACK.y - 14}%`,
                transform: "translateX(-50%)",
              }}
            >
              aim here ↑
            </div>
          )}
        </div>
      </AimThrow>

      {done && (
        <DoneOverlay
          title="Seven stones, down."
          line="The oldest team game in the world: someone stacks, someone throws, everyone cheers."
          onContinue={onDone}
        />
      )}
    </div>
  );
}
