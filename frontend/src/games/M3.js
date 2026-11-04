import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoneOverlay, ProgressPips } from "./kit";
import { ART } from "../data/art";
import { Character } from "../art/Character";
import { sfx } from "../game/audio";

// MILESTONE 3a — The Observation Room: find five objects, connect three pairs.

const OBJECTS = [
  {
    id: "photo",
    clue: "Someone else's smile, kept on paper.",
    at: { left: "70%", top: "26%" },
    hue: "#e8a33d",
  },
  {
    id: "diary",
    clue: "A place for the thoughts too big to say.",
    at: { left: "16%", top: "44%" },
    hue: "#c74a3c",
  },
  {
    id: "glasses",
    clue: "For all the reading that went past midnight.",
    at: { left: "56%", top: "62%" },
    hue: "#4a7fb5",
  },
  {
    id: "postcard",
    clue: "News from someone very far away.",
    at: { left: "38%", top: "20%" },
    hue: "#2a7f79",
  },
  {
    id: "textbook",
    clue: "Underlined, highlighted, argued with.",
    at: { left: "30%", top: "72%" },
    hue: "#7b5ea7",
  },
];
const MUG = { left: "82%", top: "64%" };
const PAIRS = [
  ["photo", "diary"],
  ["postcard", "glasses"],
  ["textbook", "mug"],
];

const Sprite = ({ id, hue }) => {
  const s = {
    fill: hue,
    stroke: "#2b2620",
    strokeWidth: 2.2,
    strokeLinejoin: "round",
  };
  switch (id) {
    case "photo":
      return (
        <svg width="52" height="52" viewBox="0 0 24 24">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="1.5"
            {...s}
            fill="#fdf6e9"
          />
          <path d="M6 15l4-5 3 3 2-2 3 4" {...s} />
          <circle cx="9" cy="9" r="1.6" fill={hue} stroke="#2b2620" />
        </svg>
      );
    case "diary":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24">
          <rect x="4" y="3" width="16" height="18" rx="2" {...s} />
          <path
            d="M12 15c-1.8-1.5-3-2.6-3-4a1.8 1.8 0 013-1 1.8 1.8 0 013 1c0 1.4-1.2 2.5-3 4z"
            fill="#fdf6e9"
            stroke="#2b2620"
            strokeWidth="1.6"
          />
          <path d="M7 3v18" stroke="#2b2620" strokeWidth="1.6" />
        </svg>
      );
    case "glasses":
      return (
        <svg width="52" height="52" viewBox="0 0 24 24">
          <g fill="none" stroke="#2b2620" strokeWidth="2.2">
            <circle cx="7" cy="14" r="3.4" fill="#bfe3e0" />
            <circle cx="17" cy="14" r="3.4" fill="#bfe3e0" />
            <path d="M10.4 13.4q1.6-1.2 3.2 0M3.6 13L2 11M20.4 13L22 11" />
          </g>
        </svg>
      );
    case "postcard":
      return (
        <svg width="50" height="50" viewBox="0 0 24 24">
          <rect
            x="2.5"
            y="5"
            width="19"
            height="13"
            rx="1.5"
            {...s}
            fill="#fdf6e9"
          />
          <path
            d="M5 9h7M5 12h7M5 15h4"
            stroke="#2b2620"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect
            x="15.5"
            y="7.5"
            width="4"
            height="4.5"
            fill={hue}
            stroke="#2b2620"
            strokeWidth="1.4"
          />
        </svg>
      );
    case "textbook":
      return (
        <svg width="50" height="50" viewBox="0 0 24 24">
          <path d="M4 4h13a2 2 0 012 2v14H6a2 2 0 01-2-2z" {...s} />
          <path
            d="M8 9h7M8 12.5h7M8 16h4.5"
            stroke="#fdf6e9"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

export function ObservationRoom({ onDone }) {
  const [found, setFound] = useState([]);
  const [phase, setPhase] = useState("find"); // find | connect
  const [sel, setSel] = useState(null);
  const [linked, setLinked] = useState([]);
  const [shake, setShake] = useState(null);
  const [done, setDone] = useState(false);
  const [hintIdx, setHintIdx] = useState(-1);
  const idx = found.length;
  const cur = OBJECTS[idx];
  const NAMES = {
    photo: "the photograph",
    diary: "the diary",
    glasses: "the spectacles",
    postcard: "the postcard",
    textbook: "the textbook",
    mug: "the coffee mug",
  };

  useEffect(() => {
    if (found.length >= OBJECTS.length) {
      sfx("chime");
      setPhase("connect");
    }
  }, [found]);

  const tap = (id) => {
    if (phase === "find") {
      if (!cur || id !== cur.id) {
        setShake(id);
        sfx("click");
        setTimeout(() => setShake(null), 500);
        return;
      }
      sfx("pop");
      setFound((f) => [...f, id]);
    } else {
      if (linked.flat().includes(id)) return;
      if (!sel) {
        setSel(id);
        sfx("click");
        return;
      }
      const ok = PAIRS.some(
        (p) => (p[0] === sel && p[1] === id) || (p[1] === sel && p[0] === id),
      );
      if (ok) {
        sfx("pop");
        setLinked((l) => [...l, [sel, id]]);
        setSel(null);
        if (linked.length + 1 >= PAIRS.length)
          setTimeout(() => {
            sfx("tada");
            setDone(true);
          }, 600);
      } else {
        setShake(id);
        sfx("click");
        setTimeout(() => setShake(null), 500);
        setSel(null);
      }
    }
  };

  const objPos = (id) =>
    id === "mug" ? MUG : OBJECTS.find((o) => o.id === id).at;

  return (
    <div className="absolute inset-0" style={{ background: "#e8ddd0" }}>
      <div
        className="scene-bg"
        style={{
          backgroundImage: `url(${ART.apartment})`,
          filter: "saturate(0.92)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(43,38,32,0.14)" }}
      />

      {/* hidden objects — always haloed so they can be found; hint pulses the right one */}
      {OBJECTS.map((o, i) => {
        const isFound = found.includes(o.id);
        const isSel = sel === o.id;
        return (
          <button
            key={o.id}
            data-testid={`obs-object-${o.id}`}
            onClick={() => tap(o.id)}
            className={`absolute tap-target ${shake === o.id ? "animate-[walkA_0.2s_linear_2]" : ""}`}
            style={{ ...o.at, transform: "translate(-50%,-50%)" }}
          >
            <span
              className={`absolute rounded-full border-[2.5px] ${isFound ? "border-solid border-[#5a9e6f]" : isSel ? "border-solid border-[#c74a3c]" : "border-dashed border-[rgba(253,246,233,0.9)]"}`}
              style={{
                inset: -13,
                animation:
                  i === hintIdx
                    ? "pulseSoft 1.1s ease-in-out infinite"
                    : undefined,
              }}
            />
            <span
              style={{
                display: "block",
                opacity: isFound ? 0.4 : 1,
                filter: "drop-shadow(0 2px 3px rgba(43,38,32,0.55))",
              }}
            >
              <span
                style={{ display: "inline-block", transform: "scale(1.2)" }}
              >
                <Sprite id={o.id} hue={o.hue} />
              </span>
            </span>
            {isFound && (
              <span className="absolute -top-1 -right-1 rounded-full border-2 border-[#2b2620] bg-[#5a9e6f] w-5 h-5" />
            )}
          </button>
        );
      })}
      {/* the mug (connect phase) */}
      {phase === "connect" && (
        <button
          data-testid="obs-object-mug"
          onClick={() => tap("mug")}
          className="absolute tap-target"
          style={{ ...MUG, transform: "translate(-50%,-50%)" }}
        >
          <span
            className={`absolute rounded-full border-[2.5px] ${linked.flat().includes("mug") || linked.flat().includes("textbook") ? "border-solid border-[#5a9e6f]" : sel === "mug" ? "border-solid border-[#c74a3c]" : "border-dashed border-[rgba(253,246,233,0.9)]"}`}
            style={{ inset: -13 }}
          />
          <span
            style={{
              display: "inline-block",
              transform: "scale(1.2)",
              filter: "drop-shadow(0 2px 3px rgba(43,38,32,0.55))",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="#2b2620"
                strokeWidth="2.2"
                strokeLinejoin="round"
              >
                <path
                  d="M5 7h11v8a4 4 0 01-4 4H9a4 4 0 01-4-4z"
                  fill="#c74a3c"
                />
                <path d="M16 9h2a2.5 2.5 0 010 5h-2" fill="#c74a3c" />
                <path d="M8 4q1-1.5 2 0t2 0" />
              </g>
            </svg>
          </span>
        </button>
      )}

      {/* connection lines */}
      {phase === "connect" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          {linked.map(([a, b], i) => {
            const pa = objPos(a),
              pb = objPos(b);
            return (
              <line
                key={i}
                x1={pa.left}
                y1={pa.top}
                x2={pb.left}
                y2={pb.top}
                stroke="#c74a3c"
                strokeWidth="4"
                strokeDasharray="7 5"
                style={{ filter: "drop-shadow(0 1px 0 rgba(43,38,32,0.8))" }}
              />
            );
          })}
        </svg>
      )}

      {/* clue card */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-xl">
        <div
          className="paper-card px-4 py-3"
          style={{ transform: "rotate(-0.5deg)" }}
          data-testid="obs-clue-card"
        >
          {phase === "find" ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <span className="font-hand text-xl text-[#7a4a3a]">
                  Clue {Math.min(idx + 1, 5)} of 5
                </span>
                <div className="flex items-center gap-2">
                  <ProgressPips total={5} done={found.length} />
                  <button
                    data-testid="obs-hint-button"
                    className="btn-ghost !py-0.5 !px-2 text-xs"
                    onClick={() => {
                      setHintIdx(idx);
                      sfx("click");
                      setTimeout(() => setHintIdx(-1), 2800);
                    }}
                  >
                    hint
                  </button>
                </div>
              </div>
              <div className="font-display font-extrabold text-lg sm:text-xl leading-snug">
                “{cur ? cur.clue : "…"}”
              </div>
            </>
          ) : (
            <>
              <div className="font-hand text-xl text-[#7a4a3a]">
                Now connect what belongs together
              </div>
              <div className="font-body font-bold">
                {linked.length}/3 pairs · tap one thing, then its partner
              </div>
              {sel && (
                <div className="font-hand text-lg text-[#c74a3c]">
                  selected: {NAMES[sel]} — now tap what it belongs with
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {done && (
        <DoneOverlay
          title="Five objects, three connections."
          line="Observation is empathy's first draft — this is the muscle the dissertation trained for six months."
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 3b — Find Your Audience: spot outstation students, pitch, convert.

const WALKERS = [
  { id: "w1", luggage: true, hue: "#e8a33d", top: "34%", dur: 10, delay: 0.6 },
  { id: "w2", luggage: false, hue: "#4a7fb5", top: "48%", dur: 12, delay: 2 },
  { id: "w3", luggage: true, hue: "#7b5ea7", top: "58%", dur: 9, delay: 3.6 },
  { id: "w4", luggage: false, hue: "#5a9e6f", top: "40%", dur: 11, delay: 5.2 },
  { id: "w5", luggage: true, hue: "#d9768f", top: "52%", dur: 10, delay: 7 },
  { id: "w6", luggage: false, hue: "#c74a3c", top: "62%", dur: 13, delay: 8.4 },
];

const PITCHES = [
  {
    id: "warm",
    label: "“Rooms near campus — with actual hot water. Want to see photos?”",
    result: "convert",
  },
  {
    id: "pushy",
    label: "“Best hostel in Delhi!! Limited rooms!! Come now!!”",
    result: "lead",
  },
  {
    id: "dump",
    label: "“Our accommodation features 42 amenities, including…”",
    result: "lead",
  },
];

export function FindAudience({ onDone }) {
  const [tapped, setTapped] = useState([]);
  const [pitching, setPitching] = useState(null);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState(null);
  const [done, setDone] = useState(false);

  const tapWalker = (w) => {
    if (tapped.includes(w.id) || done) return;
    if (!w.luggage) {
      sfx("click");
      setToast("No luggage — she's a local. Not today's audience.");
      setTimeout(() => setToast(null), 1600);
      return;
    }
    setPitching(w);
  };

  const pitch = (p) => {
    sfx(p.result === "convert" ? "tada" : "pop");
    setScore((s) => s + 1);
    setTapped((t) => [...t, pitching.id]);
    setToast(
      p.result === "convert"
        ? "She loved it — lead converted!"
        : "Interested — pamphlet taken, a lead for later.",
    );
    setPitching(null);
    setTimeout(() => {
      setToast(null);
      if (score + 1 >= 3) setDone(true);
    }, 1700);
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#f2b545" }}
    >
      <div className="scene-bg" style={{ backgroundImage: `url(${ART.du})` }} />
      {/* heat shimmer band */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(0deg, rgba(242,181,69,0.5), transparent)",
        }}
      />

      {WALKERS.map((w) =>
        tapped.includes(w.id) ? null : (
          <motion.button
            key={w.id}
            data-testid={`prospect-${w.id}`}
            className="absolute tap-target"
            style={{ top: w.top }}
            initial={{ left: "-12%" }}
            animate={{ left: "104%" }}
            transition={{
              duration: w.dur,
              delay: w.delay,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
            onClick={() => tapWalker(w)}
          >
            <svg width="46" height="64" viewBox="0 0 24 34">
              <circle
                cx="12"
                cy="6"
                r="4"
                fill="#f2b58c"
                stroke="#2b2620"
                strokeWidth="2"
              />
              <path
                d="M7 30V14a5 5 0 0110 0v16"
                fill={w.hue}
                stroke="#2b2620"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {w.luggage && (
                <g>
                  <rect
                    x="16"
                    y="16"
                    width="7"
                    height="12"
                    rx="1.5"
                    fill="#b5651d"
                    stroke="#2b2620"
                    strokeWidth="2"
                  />
                  <path d="M18.5 16v-2" stroke="#2b2620" strokeWidth="2" />
                </g>
              )}
            </svg>
          </motion.button>
        ),
      )}

      {/* Rakshita with pamphlets */}
      <div className="absolute bottom-0 left-1">
        <Character stage={2} balloons={3} width={100} />
      </div>

      <div className="absolute top-14 left-1/2 -translate-x-1/2">
        <div
          className="paper-card px-4 py-2 text-center"
          style={{ transform: "rotate(-0.6deg)" }}
        >
          <ProgressPips total={3} done={score} label="audience found" />
          <div className="font-hand text-lg text-[#7a4a3a]">
            tap the students carrying luggage
          </div>
        </div>
      </div>

      {toast && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="paper-card fixed bottom-20 left-1/2 z-40 -translate-x-1/2 px-4 py-2 font-hand text-xl"
          data-testid="audience-toast"
        >
          {toast}
        </motion.div>
      )}

      {/* pitch modal */}
      <AnimatePresence>
        {pitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-[rgba(43,38,32,0.4)] p-4"
            data-testid="pitch-modal"
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              className="paper-card w-full max-w-md p-5"
            >
              <div className="font-hand text-2xl text-[#c74a3c]">
                Outstation student — she needs a room.
              </div>
              <div className="font-body font-bold mb-3">
                Choose your opening line:
              </div>
              <div className="flex flex-col gap-2.5">
                {PITCHES.map((p) => (
                  <button
                    key={p.id}
                    data-testid={`pitch-${p.id}`}
                    className="ink-border bg-[#fdf6e9] p-3 text-left font-body text-[15px] leading-snug hover:bg-[#f6ecdb] transition-colors"
                    onClick={() => pitch(p)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {done && (
        <DoneOverlay
          title="Three prospects, three conversations."
          line="Scan the ground, read the person, pitch like a human. That's the whole craft."
          onContinue={onDone}
        />
      )}
    </div>
  );
}
