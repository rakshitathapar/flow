import React, { useState } from "react";
import { motion } from "framer-motion";
import { DoneOverlay, ProgressPips } from "./kit";
import { SkillIcon } from "../art/icons";
import { sfx } from "../game/audio";

// MILESTONE 4a — Build the Business: connect the seven pieces.

const PIECES = [
  { id: "consumer", name: "Consumer", icon: "face", hue: "#e8a33d" },
  { id: "need", name: "Consumer need", icon: "magnifier", hue: "#c74a3c" },
  { id: "product", name: "Product", icon: "boxes", hue: "#2a7f79" },
  { id: "price", name: "Price", icon: "coin", hue: "#4a7fb5" },
  { id: "positioning", name: "Positioning", icon: "flag", hue: "#7b5ea7" },
  {
    id: "distribution",
    name: "Distribution",
    icon: "shopfront",
    hue: "#5a9e6f",
  },
  {
    id: "communication",
    name: "Communication",
    icon: "megaphone",
    hue: "#d9768f",
  },
];

export function BuildBusiness({ onDone }) {
  const [shuffledPieces] = useState(() => [...PIECES].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState([]);
  const [sel, setSel] = useState(null);
  const [hint, setHint] = useState(null);
  const done = placed.length === PIECES.length;

  const tapSlot = (id) => {
    if (!sel) {
      setHint("Pick a piece from the table first.");
      setTimeout(() => setHint(null), 1500);
      return;
    }
    if (sel === id) {
      sfx("chime");
      setPlaced((p) => [...p, id]);
      setSel(null);
      if (placed.length + 1 === PIECES.length)
        setTimeout(() => sfx("tada"), 700);
    } else {
      sfx("click");
      setHint("Not there — the arrows know the order. Try another slot.");
      setTimeout(() => setHint(null), 1600);
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#efe6d4" }}
    >
      <div
        className="scene-bg opacity-25"
        style={{ backgroundImage: "url(/art/bschool-classroom.jpg)" }}
      />
      <div className="relative flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-8 py-4 gap-4 overflow-y-auto nice-scroll">
        {/* the board */}
        <div
          className="ink-border bg-[#fdf6e9] p-3"
          data-testid="business-board"
          style={{ transform: "rotate(-0.3deg)" }}
        >
          <div className="font-hand text-xl text-[#7a4a3a] mb-2">
            A business, left to right:
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {PIECES.map((p, i) => (
              <React.Fragment key={p.id}>
                <button
                  data-testid={`biz-slot-${p.id}`}
                  onClick={() => tapSlot(p.id)}
                  className={`ink-border flex items-center gap-1.5 px-2 py-1.5 text-left ${placed.includes(p.id) ? "bg-[#e8f0e4]" : "bg-[#f1e8d2] border-dashed"}`}
                  style={{ minWidth: 92 }}
                >
                  {placed.includes(p.id) ? (
                    <>
                      <SkillIcon icon={p.icon} size={30} ring={false} />
                      <span className="font-display font-extrabold text-sm">
                        {p.name}
                      </span>
                    </>
                  ) : (
                    <span className="font-body text-sm text-[#8a7a5f] italic">
                      slot {i + 1}
                    </span>
                  )}
                </button>
                {i < PIECES.length - 1 && (
                  <span className="font-display font-extrabold text-[#c74a3c]">
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* the table of pieces */}
        <div
          className="ink-border bg-[#f6ecdb] p-3"
          data-testid="business-table"
        >
          <div className="font-hand text-xl text-[#7a4a3a] mb-2">
            Pieces on the table {sel ? "— now tap its slot" : "— tap one"}:
          </div>
          <div className="flex flex-wrap gap-2">
            {shuffledPieces.map((p) =>
              placed.includes(p.id) ? null : (
                <button
                  key={p.id}
                  data-testid={`biz-piece-${p.id}`}
                  onClick={() => {
                    setSel(p.id);
                    sfx("click");
                  }}
                  className="ink-border flex items-center gap-1.5 bg-[#fdf6e9] px-2.5 py-1.5 font-display font-extrabold text-sm tap-target"
                  style={
                    sel === p.id
                      ? {
                          background: p.hue,
                          transform: "translate(2px,3px)",
                          boxShadow: "1px 1px 0 rgba(43,38,32,.9)",
                        }
                      : {}
                  }
                >
                  <SkillIcon icon={p.icon} size={26} ring={false} />
                  {p.name}
                </button>
              ),
            )}
          </div>
        </div>

        {hint && (
          <div
            className="paper-card p-2 font-hand text-xl text-center"
            data-testid="biz-hint"
          >
            {hint}
          </div>
        )}
        {done && (
          <div
            className="paper-card p-3 font-hand text-xl text-center"
            data-testid="biz-complete"
          >
            The whole chain is standing. Nothing in a business decides alone.
          </div>
        )}
      </div>

      {done && (
        <DoneOverlay
          title="One connected business."
          line="Consumer → need → product → price → positioning → distribution → communication. IMT drilled the chain; the ground game proved it."
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 4b — The Independent Life: furnish a first home on a budget.

const ITEMS = [
  { id: "bed", name: "Charpai + mattress", cost: 4200, zone: "Rest" },
  { id: "fan", name: "Table fan", cost: 1400, zone: "Rest" },
  { id: "desk", name: "Study table", cost: 1800, zone: "Work" },
  { id: "chair", name: "Plastic chair", cost: 800, zone: "Work" },
  { id: "lamp", name: "Study lamp", cost: 700, zone: "Work" },
  { id: "shelf", name: "Book shelf", cost: 1200, zone: "Work" },
  { id: "stove", name: "Two-burner stove", cost: 2600, zone: "Kitchen" },
  { id: "kettle", name: "Kettle", cost: 900, zone: "Kitchen" },
  { id: "tiffin", name: "Tiffin set", cost: 400, zone: "Kitchen" },
  { id: "rug", name: "Durrie rug", cost: 1000, zone: "Cosy" },
  { id: "plant", name: "Money plant", cost: 200, zone: "Cosy" },
  { id: "posters", name: "Wall posters", cost: 300, zone: "Cosy" },
  { id: "curtains", name: "Curtains", cost: 500, zone: "Cosy" },
];
const ZONES = ["Rest", "Work", "Kitchen", "Cosy"];
const BUDGET = 15000;

export function IndependentLife({ onDone }) {
  const [picked, setPicked] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const spent = picked.reduce(
    (s, id) => s + ITEMS.find((i) => i.id === id).cost,
    0,
  );
  const over = spent > BUDGET;
  const zonesFilled = ZONES.every((z) =>
    picked.some((id) => ITEMS.find((i) => i.id === id).zone === z),
  );
  const canSettle = zonesFilled && !over;

  const toggle = (id) => {
    sfx("click");
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#efe6d4" }}
    >
      <div
        className="scene-bg opacity-25"
        style={{ backgroundImage: "url(/art/apartment-room.jpg)" }}
      />
      <div className="relative flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-8 py-3 gap-3 overflow-y-auto nice-scroll">
        {/* budget bar */}
        <div
          className="paper-card sticky top-0 z-20 px-4 py-2.5"
          style={{ transform: "rotate(-0.4deg)" }}
          data-testid="budget-bar"
        >
          <div className="flex items-center justify-between font-display font-extrabold">
            <span>Budget remaining</span>
            <span
              style={{ color: over ? "#c74a3c" : "#2a7f79" }}
              data-testid="budget-remaining"
            >
              ₹{Math.max(0, BUDGET - spent).toLocaleString("en-IN")} left
            </span>
          </div>
          <div className="font-body text-xs sm:text-sm mt-1" data-testid="budget-spent">Spent ₹{spent.toLocaleString("en-IN")} of ₹{BUDGET.toLocaleString("en-IN")}</div>
          <div className="mt-1.5 h-4 rounded-full border-2 border-[#2b2620] bg-[#f1e8d2] overflow-hidden">
            <div
              className="h-full transition-all"
              style={{
                width: `${Math.min(100, (spent / BUDGET) * 100)}%`,
                background: over ? "#c74a3c" : "#5a9e6f",
              }}
            />
          </div>
        </div>

        {/* zones */}
        <div className="grid grid-cols-2 gap-2.5">
          {ZONES.map((z) => (
            <div
              key={z}
              className="ink-border bg-[#fdf6e9] p-2.5 min-h-24"
              data-testid={`zone-${z}`}
            >
              <div className="font-display font-extrabold text-sm">
                {z}{" "}
                {!picked.some(
                  (id) => ITEMS.find((i) => i.id === id).zone === z,
                ) && <span className="text-[#c74a3c]">· needs something</span>}
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {picked
                  .filter((id) => ITEMS.find((i) => i.id === id).zone === z)
                  .map((id) => (
                    <span
                      key={id}
                      className="rounded-full border-2 border-[#2b2620] bg-[#e8a33d] px-2 py-0.5 text-xs font-bold"
                    >
                      {ITEMS.find((i) => i.id === id).name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* shop */}
        <div className="ink-border bg-[#f6ecdb] p-3">
          <div className="font-hand text-xl text-[#7a4a3a] mb-2">
            The market downstairs — tap to bring home, tap again to return:
          </div>
          <div className="flex flex-wrap gap-2">
            {ITEMS.map((i) => (
              <button
                key={i.id}
                data-testid={`item-${i.id}`}
                onClick={() => toggle(i.id)}
                className="ink-border px-2.5 py-1.5 text-sm font-bold tap-target"
                style={
                  picked.includes(i.id)
                    ? {
                        background: "#2a7f79",
                        color: "#fdf6e9",
                        transform: "translate(2px,2px)",
                        boxShadow: "1px 1px 0 rgba(43,38,32,.9)",
                      }
                    : { background: "#fdf6e9" }
                }
              >
                {i.name} · ₹{i.cost.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
        </div>

        <button
          data-testid="settle-in-button"
          disabled={!canSettle}
          className={`btn-hand ${canSettle ? "btn-red" : "btn-plain"} mt-auto w-full justify-center text-xl opacity-${canSettle ? 100 : 60}`}
          style={{ opacity: canSettle ? 1 : 0.55 }}
          onClick={() => {
            if (!canSettle) return;
            setSubmitted(true);
            sfx("tada");
          }}
        >
          {over ? "Over budget — swap something" : submitted ? "Submitted" : canSettle ? "Submit your budget" : "Every zone needs at least one thing"}
        </button>
      </div>

      {submitted && canSettle && (
        <DoneOverlay title="Home. On budget."
          line="Rest, work, kitchen, a corner that's just nice — prioritisation, learned at ₹15,000 a month."
          onContinue={onDone} />
      )}
    </div>
  );
}

// MILESTONE 4c — The Product Launch Board (ITC CandyMan Fantastik).

const STAGES = [
  "Market & competition analysis",
  "Consumer needs & usage occasions",
  "Consumer immersions",
  "Product & packaging concepts",
  "Pricing strategy",
  "Promotion plan",
  "Pilot markets",
  "Distribution channels",
  "Sales projections",
];
const SHUFFLE = [3, 6, 0, 8, 1, 5, 2, 7, 4];

export function LaunchBoard({ onDone }) {
  const [placed, setPlaced] = useState(Array(9).fill(null));
  const [sel, setSel] = useState(null);
  const [shake, setShake] = useState(false);
  const done = placed.every(Boolean);

  const tapSlot = (i) => {
    if (placed[i]) return;
    if (sel === null) return;
    if (sel === i) {
      sfx("chime");
      setPlaced((p) => p.map((v, j) => (j === i ? STAGES[i] : v)));
      setSel(null);
      if (placed.filter(Boolean).length + 1 === 9)
        setTimeout(() => sfx("tada"), 700);
    } else {
      sfx("click");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#e8ddd0" }}
    >
      <div
        className="scene-bg opacity-25"
        style={{ backgroundImage: "url(/art/npd-studio.jpg)" }}
      />
      <div className="relative flex-1 flex flex-col p-3 gap-3 overflow-y-auto nice-scroll">
        <div
          className="ink-border bg-[#fdf6e9] p-3"
          data-testid="launch-board"
          style={{ transform: shake ? "rotate(0.5deg)" : "rotate(-0.3deg)" }}
        >
          <div className="font-display font-extrabold text-lg">
            Launch plan — CandyMan Fantastik{" "}
            <span className="font-hand font-medium text-[#7a4a3a]">
              (ITC · 2021)
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1.5 mt-2">
            {STAGES.map((s, i) => (
              <button
                key={i}
                data-testid={`launch-slot-${i}`}
                onClick={() => tapSlot(i)}
                className={`ink-border flex items-center gap-2.5 px-3 py-2 text-left ${placed[i] ? "bg-[#e8f0e4]" : "bg-[#f1e8d2] border-dashed"}`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#2b2620] bg-[#e8a33d] font-display text-sm font-extrabold">
                  {i + 1}
                </span>
                <span className="font-body font-bold text-sm sm:text-base">
                  {placed[i] || "…"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="ink-border bg-[#f6ecdb] p-3">
          <div className="font-hand text-xl text-[#7a4a3a] mb-2">
            {sel === null
              ? "Stage cards — tap one:"
              : "Now tap slot number " + (sel + 1)}
          </div>
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s, i) =>
              placed.includes(s) ? null : (
                <button
                  key={i}
                  data-testid={`launch-card-${i}`}
                  onClick={() => {
                    setSel(i);
                    sfx("click");
                  }}
                  className="ink-border bg-[#fdf6e9] px-2.5 py-1.5 font-body text-sm font-bold tap-target"
                  style={
                    sel === i
                      ? {
                          background: "#e8a33d",
                          transform: "translate(2px,3px)",
                          boxShadow: "1px 1px 0 rgba(43,38,32,.9)",
                        }
                      : {}
                  }
                >
                  {s}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {done && (
        <DoneOverlay
          title="The launch board is set."
          line="36 consumer immersions, a pricing plan at 1.5x NSR, and a launch plan from analysis to projections — faithful to the ITC stint."
          onContinue={onDone}
        />
      )}
    </div>
  );
}
