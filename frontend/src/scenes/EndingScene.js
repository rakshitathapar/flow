import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../game/store";
import { ART } from "../data/art";
import { Character, BALLOON_HUES } from "../art/Character";
import { sfx } from "../game/audio";

// The crossroads. TO BE / NOT TO BE — then the balloons go up.

const LINES = {
  toBe: "Good answer. Or the other one. Nobody knows yet — that's the point.",
  notToBe: "Also valid. Every ‘not yet’ is still a direction.",
};

export default function EndingScene() {
  const { state, dispatch } = useGame();
  const [phase, setPhase] = useState("choose"); // choose | said | release | done
  const [line, setLine] = useState("");
  const released = state.balloons;

  const choose = (c) => {
    if (phase !== "choose") return;
    sfx("boing");
    setLine(LINES[c]);
    dispatch({ type: "END_CHOICE", choice: c });
    setPhase("said");
    setTimeout(() => {
      setPhase("release");
      sfx("whoosh");
      dispatch({ type: "RELEASE_BALLOONS" });
    }, 1600);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#2b2d42]"
      data-testid="ending-scene"
    >
      {/* camera pans up as balloons release */}
      <motion.div
        className="scene-bg"
        style={{ backgroundImage: `url(${ART.crossroads})` }}
        animate={
          phase === "choose" || phase === "said"
            ? { scale: 1.06, y: "0%" }
            : { scale: 1.14, y: "9%" }
        }
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      {/* dusk deepening */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: phase === "release" || phase === "done" ? 0.5 : 0.12,
        }}
        transition={{ duration: 3 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(43,38,32,0.9), rgba(123,94,167,0.35) 60%, transparent)",
        }}
      />

      {/* the protagonist with every balloon */}
      {(phase === "choose" || phase === "said") && (
        <div className="absolute bottom-[6%] left-[46%]">
          <Character
            stage={5}
            balloons={released}
            width={160}
            className="drop-shadow-[0_8px_0_rgba(43,38,32,0.25)]"
          />
        </div>
      )}

      {/* the signpost — two hands-drawn boards over the painted post */}
      {(phase === "choose" || phase === "said") && (
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 z-20">
          <svg
            width="360"
            height="200"
            viewBox="0 0 360 200"
            className="wobble max-w-[92vw]"
          >
            <g
              className="tap-target"
              onClick={() => choose("toBe")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose("toBe"); } }}
              role="button"
              tabIndex={0}
              aria-label="Choose To Be"
              data-testid="sign-to-be"
            >
              <path
                d="M 20 40 L 150 40 L 178 62 L 150 84 L 20 84 Z"
                fill="#c74a3c"
                stroke="#2b2620"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <text
                x="86"
                y="70"
                textAnchor="middle"
                fontFamily="Shantell Sans"
                fontWeight="800"
                fontSize="30"
                fill="#fdf6e9"
              >
                TO BE
              </text>
            </g>
            <g
              className="tap-target"
              onClick={() => choose("notToBe")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose("notToBe"); } }}
              role="button"
              tabIndex={0}
              aria-label="Choose Not To Be"
              data-testid="sign-not-to-be"
            >
              <path
                d="M 340 116 L 210 116 L 182 138 L 210 160 L 340 160 Z"
                fill="#2a7f79"
                stroke="#2b2620"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <text
                x="266"
                y="146"
                textAnchor="middle"
                fontFamily="Shantell Sans"
                fontWeight="800"
                fontSize="26"
                fill="#fdf6e9"
              >
                NOT TO BE
              </text>
            </g>
          </svg>
          {line && (
            <div
              className="paper-card mt-2 p-3 font-hand text-xl text-center"
              style={{ transform: "rotate(-1deg)" }}
            >
              {line}
            </div>
          )}
        </div>
      )}

      {/* balloons released — float up through the sky */}
      <AnimatePresence>
        {phase !== "choose" &&
          phase !== "said" &&
          Array.from({ length: Math.min(released, 7) }, (_, i) => (
            <motion.div
              key={i}
              className="absolute z-30"
              style={{ left: `${34 + i * 7}%`, bottom: "18%" }}
              initial={{ y: 0, x: 0, opacity: 1 }}
              animate={{
                y: "-120vh",
                x: i % 2 ? 60 : -40,
                opacity: 1,
                rotate: i % 2 ? 8 : -6,
              }}
              transition={{
                duration: 4.5 + i * 0.7,
                ease: "easeIn",
                delay: i * 0.35,
              }}
              data-testid={`released-balloon-${i}`}
            >
              <svg width="64" height="92" viewBox="0 0 64 92">
                <g className="wobble-sm">
                  <ellipse
                    cx="32"
                    cy="30"
                    rx="23"
                    ry="27"
                    fill={BALLOON_HUES[i % BALLOON_HUES.length]}
                    stroke="#2b2620"
                    strokeWidth="4.5"
                  />
                  <path
                    d="M27 56 l5 7 5 -7z"
                    fill={BALLOON_HUES[i % BALLOON_HUES.length]}
                    stroke="#2b2620"
                    strokeWidth="3.6"
                  />
                  <path
                    d="M32 63 q -7 14 0 26"
                    fill="none"
                    stroke="#2b2620"
                    strokeWidth="2.6"
                  />
                  <ellipse
                    cx="26"
                    cy="24"
                    rx="6"
                    ry="9"
                    fill="#fff"
                    opacity="0.35"
                  />
                </g>
              </svg>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* final copy */}
      <AnimatePresence>
        {(phase === "release" || phase === "done") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1.4 }}
            onAnimationComplete={() => setPhase("done")}
            className="absolute inset-0 z-40 flex flex-col items-center justify-end pb-[12%] px-6 text-center"
          >
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 2.4,
                  duration: 0.9,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="font-display text-4xl sm:text-6xl font-extrabold text-[#fdf6e9] drop-shadow-[0_3px_0_rgba(43,38,32,0.9)]"
                data-testid="ending-copy"
              >
                Still figuring it out. Still becoming.
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4 }}
              className="font-body text-lg sm:text-xl text-[#fdf6e9] max-w-xl mt-4 drop-shadow-[0_2px_0_rgba(43,38,32,0.9)]"
            >
              I’m a marketer with the mindset of a strategist and the curiosity
              of a psychologist. I’ve learned by observing people, building
              businesses, experimenting with ideas and figuring things out along
              the way. And I’m still curious about what comes next.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.1 }}
              data-testid="ending-open-archive"
              className="btn-hand btn-red mt-8 text-xl"
              onClick={() => {
                sfx("tada");
                dispatch({ type: "OPEN_ARCHIVE" });
              }}
            >
              Open everything I picked up
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
