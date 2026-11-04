import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../game/store";
import { ART } from "../data/art";
import { Character } from "../art/Character";
import { sfx } from "../game/audio";

const DUST = Array.from({ length: 14 }, (_, i) => ({
  left: `${8 + ((i * 37) % 84)}%`,
  top: `${20 + ((i * 53) % 60)}%`,
  delay: `${(i * 0.9) % 7}s`,
  dur: `${5 + (i % 4)}s`,
  size: 3 + (i % 3),
}));

const CAPTIONS = [
  "Every place teaches you something.",
  "Every experience leaves something behind.",
  "And you carry all of it into whatever comes next.",
];

export default function JournalScene() {
  const { dispatch, hasSave } = useGame();
  const [step, setStep] = useState("room");
  const [attached, setAttached] = useState(false);
  const [walking, setWalking] = useState(false);
  const [footprints, setFootprints] = useState([]);
  const [capIdx, setCapIdx] = useState(-1);
  const skipRef = useRef(false);

  const finish = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    sfx("chime");
    dispatch({ type: "ENTER_WORLD", skipWalk: true });
  }, [dispatch]);

  // World sequence: balloon arrives, then she starts walking.
  useEffect(() => {
    if (step !== "world") return;

    const timers = [
      setTimeout(() => {
        setAttached(true);
        sfx("balloon");
      }, 5400),

      setTimeout(() => {
        setWalking(true);
        sfx("page");
      }, 6000),

      setTimeout(() => setCapIdx(0), 6600),

      setTimeout(() => {
        setCapIdx(1);
      }, 9400),

      setTimeout(() => {
        setCapIdx(2);
      }, 12200),

      setTimeout(finish, 16400),
    ];

    const fp = setInterval(() => {
      setFootprints((f) => [
        ...f.slice(-10),
        {
          id: Date.now() + Math.random(),
          x: 46 + Math.random() * 8,
          y: 66 + Math.random() * 22,
        },
      ]);
    }, 620);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(fp);
    };
  }, [step, finish]);

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#f7f0e3]"
      data-testid="journal-scene"
      onClick={() => {
        if (step === "world") finish();
      }}
    >
      {/* 1. THE ROOM */}
      {(step === "room" || step === "zoom") && (
        <motion.div
          className="scene-bg"
          style={{
            backgroundImage: 'url("/journal-background.png")',
            backgroundSize: "cover",
            backgroundPosition: "center center",
            transformOrigin: "50% 80%",
          }}
          animate={
            step === "room"
              ? { scale: [1, 1.025, 1] }
              : { scale: 3.15, x: "0%", y: "7%" }
          }
          transition={
            step === "room"
              ? {
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {
                  duration: 3.1,
                  ease: [0.45, 0.05, 0.25, 1],
                }
          }
          onAnimationComplete={() => {
            if (step === "zoom") setStep("page");
          }}
        />
      )}

      {(step === "room" || step === "zoom") && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,240,200,0.22) 0%, transparent 42%)",
          }}
        />
      )}

      {/* Floating dust particles */}
      {step === "room" &&
        DUST.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#fff3d6]"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              opacity: 0,
              animation: `dustFloat ${d.dur} linear infinite`,
              animationDelay: d.delay,
            }}
          />
        ))}

      {/* Journal tap zone */}
      {step === "room" && (
        <button
          data-testid="journal-open-button"
          onClick={(event) => {
            event.stopPropagation();
            sfx("page");
            setStep("zoom");
          }}
          className="absolute w-[min(76vw,560px)] h-[min(34vh,230px)] cursor-pointer group touch-manipulation"
          style={{
            left: "50%",
            top: "83%",
            transform: "translate(-50%,-50%)",
            background: "transparent",
            WebkitTapHighlightColor: "transparent",
          }}
          aria-label="Open the journal"
        >
          <span
            className="absolute inset-0 rounded-[50%] opacity-60 group-hover:opacity-90 transition-opacity"
            style={{
              animation: "pulseSoft 3s ease-in-out infinite",
              background:
                "radial-gradient(ellipse at center, rgba(255,236,170,0.4), transparent 65%)",
            }}
          />

          <span
            className="absolute -top-11 left-1/2 -translate-x-1/2 font-hand text-2xl text-[#fdf6e9] drop-shadow-[0_2px_0_rgba(43,38,32,0.9)] whitespace-nowrap"
            style={{ animation: "hintFade 3.4s ease-in-out infinite" }}
          >
            tap the journal ↓
          </span>
        </button>
      )}

      {/* Continue existing journey */}
      {step === "room" && hasSave && (
        <button
          data-testid="journal-continue-button"
          className="btn-ghost absolute bottom-4 right-4 text-sm"
          onClick={() => {
            sfx("click");
            dispatch({ type: "RESUME" });
          }}
        >
          continue your journey
        </button>
      )}

      {/* 2 + 3. THE PAGE */}
      {(step === "page" || step === "dive") && (
        <motion.div
          className="absolute inset-0 bg-[#f7f0e3]"
          style={{ transformOrigin: "50% 58%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="scene-bg"
            style={{
              backgroundImage: `url(${ART.page})`,
              transformOrigin: "50% 58%",
            }}
            initial={{ scale: step === "dive" ? 1 : 1.02 }}
            animate={
              step === "dive"
                ? { scale: 3.3 }
                : { scale: [1.02, 1.06, 1.02] }
            }
            transition={
              step === "dive"
                ? {
                    duration: 2.6,
                    ease: [0.5, 0.1, 0.4, 1],
                  }
                : {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(43,38,32,0.35) 100%)",
            }}
          />
        </motion.div>
      )}

      {/* Title on the journal page */}
      {(step === "page" || step === "dive") && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-[7%] px-6 text-center pointer-events-none"
          animate={
            step === "dive"
              ? { opacity: 0, y: -30 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 1.1 }}
        >
          <div className="overflow-hidden mb-3">
            <motion.div
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                ease: [0.2, 0.8, 0.2, 1],
                delay: 0.7,
              }}
              className="font-hand text-2xl sm:text-3xl text-[#c74a3c]"
            >
              a journey in six chapters
            </motion.div>
          </div>

          <h1 className="mt-2">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: 1,
                }}
                className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-[#2b2620] drop-shadow-[0_2px_0_rgba(247,240,227,0.9)]"
                data-testid="game-title"
              >
                THE ART OF
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: 1.3,
                }}
                className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-[#c74a3c] drop-shadow-[0_2px_0_rgba(247,240,227,0.9)]"
              >
                BECOMING
              </motion.div>
            </div>
          </h1>

          <div className="overflow-hidden mt-3">
            <motion.p
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                ease: [0.2, 0.8, 0.2, 1],
                delay: 1.7,
              }}
              className="font-body text-lg sm:text-2xl text-[#4a4238] italic drop-shadow-[0_1px_0_rgba(247,240,227,0.9)]"
            >
              “A collection of things I’ve picked up along the way.”
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9 }}
            className="mt-8 pointer-events-auto flex flex-col items-center gap-3"
          >
            <button
              data-testid="journal-begin-button"
              className="btn-hand btn-red text-xl px-8"
              onClick={(e) => {
                e.stopPropagation();
                sfx("chime");
                setStep("dive");
              }}
            >
              {hasSave ? "Continue the journey" : "Step inside"}
            </button>

            {hasSave && (
              <button
                data-testid="journal-restart-button"
                className="font-hand text-lg text-[#6b5d49] underline decoration-dotted"
                onClick={(e) => {
                  e.stopPropagation();

                  if (
                    window.confirm(
                      "Start over? Collected skills and balloons will be cleared.",
                    )
                  ) {
                    dispatch({ type: "RESTART" });
                  }
                }}
              >
                start over instead
              </button>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Cream transition during the dive */}
      <AnimatePresence>
        {step === "dive" && (
          <motion.div
            className="absolute inset-0 bg-[#f7f0e3] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            onAnimationComplete={() => {
              if (step === "dive") setStep("world");
            }}
          />
        )}
      </AnimatePresence>

      {/* 4. THE WORLD */}
      {step === "world" && (
        <div className="absolute inset-0" data-testid="intro-world">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #f3ead7 0%, #f7f0e3 46%, #e9ddc4 100%)",
            }}
          />

          <svg
            className="absolute inset-x-0 bottom-0 w-full h-[46%]"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
          >
            <g className="wobble-sm">
              <path
                d="M-2 14 Q 14 9 30 13 Q 52 18 72 12 Q 88 8 102 13 L 102 42 L -2 42 Z"
                fill="#dfd2b4"
                stroke="#2b2620"
                strokeWidth="0.5"
              />

              <path
                d="M-2 24 Q 20 19 48 24 Q 76 29 102 23 L 102 42 L -2 42 Z"
                fill="#cdbb96"
                stroke="#2b2620"
                strokeWidth="0.5"
              />

              <path
                d="M50 40 Q 47 32 52 26 Q 57 20 51 12 Q 47 7 50 0"
                fill="none"
                stroke="#b8a98c"
                strokeWidth="1.6"
                strokeDasharray="2.4 2.2"
              />
            </g>
          </svg>

          {/* Clouds */}
          <div className="absolute top-[10%] left-[12%] w-28 h-8 rounded-[50%] bg-[#efe6d2] border-2 border-[#e2d6ba]" />
          <div className="absolute top-[16%] right-[16%] w-36 h-9 rounded-[50%] bg-[#efe6d2] border-2 border-[#e2d6ba]" />

          {/* Footprints */}
          {footprints.map((f) => (
            <motion.span
              key={f.id}
              className="absolute rounded-[50%] border-2 border-[#8a7a5f]"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: 9,
                height: 5,
              }}
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
            />
          ))}

          {/* Girl, seen from behind */}
          <motion.div
            className="absolute left-1/2"
            style={{ bottom: "7%", transform: "translateX(-50%)" }}
            initial={{ y: 0, scale: 1 }}
            animate={
              walking
                ? { y: -46, scale: 0.94 }
                : { y: 0, scale: 1 }
            }
            transition={{ duration: 9, ease: "easeInOut" }}
          >
            <Character
              stage={0}
              view="back"
              walking={walking}
              balloons={attached ? 1 : 0}
              width={168}
              className="drop-shadow-[0_10px_0_rgba(43,38,32,0.12)]"
            />
          </motion.div>

          {/* Balloon drifting in from the sky */}
          {!attached && (
            <motion.div
              className="absolute z-10"
              initial={{ top: "-16%", left: "63%" }}
              animate={{
                top: ["-16%", "30%", "58%", "79%"],
                left: ["63%", "55%", "58%", "calc(50% + 20px)"],
              }}
              transition={{ duration: 5.2, ease: "easeInOut" }}
              data-testid="intro-balloon"
            >
              <svg width="66" height="96" viewBox="0 0 66 96">
                <g className="wobble-sm">
                  <ellipse
                    cx="33"
                    cy="32"
                    rx="24"
                    ry="29"
                    fill="#c74a3c"
                    stroke="#2b2620"
                    strokeWidth="4.5"
                  />

                  <path
                    d="M28 60 l5 8 5 -8z"
                    fill="#c74a3c"
                    stroke="#2b2620"
                    strokeWidth="3.6"
                  />

                  <path
                    d="M33 68 q -8 14 0 26"
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
                    transform="rotate(-18 26 24)"
                  />
                </g>
              </svg>
            </motion.div>
          )}

          {/* Storybook captions */}
          <div className="absolute inset-x-0 bottom-[30%] flex justify-center px-6 pointer-events-none">
            <AnimatePresence mode="wait">
              {capIdx >= 0 && (
                <motion.p
                  key={capIdx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 1.3 }}
                  className="font-hand text-3xl text-center text-[#4a4238]"
                  data-testid={`intro-caption-${capIdx}`}
                >
                  {CAPTIONS[capIdx]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
            <span
              className="font-hand text-lg text-[#a08f6f]"
              style={{ animation: "hintFade 4s infinite" }}
            >
              tap to skip
            </span>
          </div>
        </div>
      )}
    </div>
  );
}