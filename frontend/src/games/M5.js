import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AimThrow, DoneOverlay, ProgressPips } from "./kit";
import { ART } from "../data/art";
import { Character } from "../art/Character";
import { SkillIcon } from "../art/icons";
import { sfx } from "../game/audio";

// MILESTONE 5a — The Last-Mile Delivery: ride pillion, aim, deliver.

const SHOPS = [
  { id: "s1", x: 58, y: 40 },
  { id: "s2", x: 78, y: 56 },
  { id: "s3", x: 64, y: 72 },
  { id: "s4", x: 88, y: 34 },
];
const BIKE = { x: 16, y: 66 };

export function LastMile({ onDone }) {
  const boardRef = useRef(null);
  const [delivered, setDelivered] = useState([]);
  const [box, setBox] = useState(null);
  const [missAt, setMissAt] = useState(null);
  const [done, setDone] = useState(false);

  const release = (opts) => {
    if (box || done) return;
    const r = boardRef.current.getBoundingClientRect();
    let land, hitIdx;
    if (opts.tap) {
      land = { x: opts.tap.x, y: opts.tap.y };
      hitIdx = SHOPS.findIndex(
        (s) =>
          !delivered.includes(s.id) &&
          Math.hypot(
            land.x - (s.x / 100) * r.width,
            land.y - (s.y / 100) * r.height,
          ) < 95,
      );
      if (hitIdx >= 0) {
        const s = SHOPS[hitIdx];
        land = { x: (s.x / 100) * r.width, y: (s.y / 100) * r.height };
      }
    } else {
      const mag = Math.hypot(opts.dx, opts.dy) || 1;
      const dist = opts.power * r.width * 1.35;
      land = {
        x: (BIKE.x / 100) * r.width + (opts.dx / mag) * dist,
        y: (BIKE.y / 100) * r.height + (opts.dy / mag) * dist,
      };
      hitIdx = SHOPS.findIndex(
        (s, i) =>
          !delivered.includes(s.id) &&
          Math.hypot(
            land.x - (s.x / 100) * r.width,
            land.y - (s.y / 100) * r.height,
          ) <
            82 + delivered.length * 8,
      );
    }
    setBox({
      x: (land.x / r.width) * 100,
      y: (land.y / r.height) * 100,
      hit: hitIdx >= 0 ? SHOPS[hitIdx].id : null,
    });
    sfx("whoosh");
    setTimeout(() => {
      if (hitIdx >= 0) {
        sfx("chime");
        const next = [...delivered, SHOPS[hitIdx].id];
        setDelivered(next);
        if (next.length >= SHOPS.length) {
          setTimeout(() => {
            sfx("tada");
            setDone(true);
          }, 700);
        }
      } else {
        sfx("thud");
        setMissAt({
          x: (land.x / r.width) * 100,
          y: (land.y / r.height) * 100,
        });
        setTimeout(() => setMissAt(null), 900);
      }
      setBox(null);
    }, 640);
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-4 pt-1 flex flex-wrap items-center justify-between gap-2">
        <span className="font-hand text-xl text-[#fdf6e9] drop-shadow-[0_2px_0_rgba(43,38,32,0.9)]">
          Tap a glowing shop to deliver there — drag-release works too.
        </span>
        <ProgressPips total={4} done={delivered.length} label="drops" />
      </div>

      <AimThrow
        onRelease={release}
        disabled={!!box || done}
        className="flex-1 m-2 sm:m-4"
      >
        <div
          ref={boardRef}
          className="relative h-full w-full"
          data-testid="lastmile-board"
        >
          <div
            className="scene-bg"
            style={{ backgroundImage: `url(${ART.kolkata})` }}
          />

          {/* shop targets */}
          {SHOPS.map((s) => (
            <div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              {delivered.includes(s.id) ? (
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  className="anim-bob-sm"
                >
                  <path
                    d="M12 20l-6.5-6C3 11.5 3 7.5 6 6c2-1 4.3-.3 6 1.8C13.7 5.7 16 5 18 6c3 1.5 3 5.5.5 8z"
                    fill="#c74a3c"
                    stroke="#2b2620"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <div
                  className="anim-pulse-soft rounded-full border-4 border-dashed border-[#e8a33d]"
                  style={{
                    width: 58,
                    height: 58,
                    boxShadow: "0 0 0 3px rgba(43,38,32,0.7)",
                  }}
                  data-testid={`shop-target-${s.id}`}
                />
              )}
            </div>
          ))}

          {/* the bike + rider */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${BIKE.x}%`, top: `${BIKE.y}%` }}
          >
            <svg
              width="110"
              height="80"
              viewBox="0 0 110 80"
              className="anim-bob-sm"
            >
              <g className="wobble-sm">
                <circle
                  cx="24"
                  cy="62"
                  r="14"
                  fill="none"
                  stroke="#2b2620"
                  strokeWidth="5"
                />
                <circle
                  cx="86"
                  cy="62"
                  r="14"
                  fill="none"
                  stroke="#2b2620"
                  strokeWidth="5"
                />
                <path
                  d="M24 62 L48 40 L74 40 M48 40 L58 62 L24 62 M58 62 H86 M74 40 l8 -10 h10"
                  fill="none"
                  stroke="#2b2620"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <rect
                  x="38"
                  y="18"
                  width="26"
                  height="18"
                  rx="6"
                  fill="#c74a3c"
                  stroke="#2b2620"
                  strokeWidth="3.4"
                />
                <rect
                  x="58"
                  y="22"
                  width="18"
                  height="14"
                  rx="5"
                  fill="#e8a33d"
                  stroke="#2b2620"
                  strokeWidth="3"
                />
              </g>
            </svg>
          </div>

          {/* flying / missed box */}
          <AnimatePresence>
            {box && (
              <motion.div
                className="absolute z-10"
                initial={{ left: `${BIKE.x}%`, top: `${BIKE.y}%` }}
                animate={{ left: `${box.x}%`, top: `${box.y - 6}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div
                  style={{
                    width: 26,
                    height: 22,
                    background: "#c99e56",
                    border: "3px solid #2b2620",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {missAt && (
            <div
              className="absolute font-hand text-xl text-[#c74a3c]"
              style={{
                left: `${missAt.x}%`,
                top: `${missAt.y}%`,
                transform: "translate(-50%,-120%)",
              }}
            >
              the road ate that one — again!
            </div>
          )}
        </div>
      </AimThrow>

      {done && (
        <DoneOverlay
          title="Four drops, four doors."
          line="₹14 Cr of General Trade across 10,000+ outlets starts exactly here: aim, deliver, repeat, remember every name."
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 5b — The Perfect Shelf: list → cart → eye-level shelf.

const PACKS = [
  { id: "shampoo", name: "Shampoo", hue: "#4a7fb5" },
  { id: "cream", name: "Body cream", hue: "#e8a33d" },
  { id: "soap", name: "Soap", hue: "#7b5ea7" },
  { id: "toothpaste", name: "Toothpaste", hue: "#5a9e6f" },
  { id: "talc", name: "Talc", hue: "#d9768f" },
  { id: "hairoil", name: "Hair oil", hue: "#2a7f79" },
];
const LIST = ["shampoo", "cream", "toothpaste", "hairoil"];

export function PerfectShelf({ onDone }) {
  const [cart, setCart] = useState([]);
  const [sel, setSel] = useState(null);
  const [shelf, setShelf] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(4).fill(null)),
  );
  const [hint, setHint] = useState(null);
  const cartDone = cart.length >= LIST.length;
  const allPlaced = shelf.flat().filter(Boolean).length >= LIST.length;

  const tapPack = (id) => {
    if (!cartDone && !cart.includes(id)) {
      if (sel && LIST.includes(id)) {
        sfx("chime");
        setCart((c) => [...c, id]);
        setSel(null);
      } else if (sel && !LIST.includes(id)) {
        sfx("click");
        setHint("It's a fine product — just not on today's list.");
        setTimeout(() => setHint(null), 1600);
        setSel(null);
      } else {
        sfx("click");
        setHint("Tap an item on the list first.");
        setTimeout(() => setHint(null), 1500);
      }
    }
  };

  const place = (row, col) => {
    if (!cartDone || shelf[row][col]) return;
    if (shelf.flat().filter(Boolean).length >= cart.length) return;
    sfx("pop");
    const nextShelf = shelf.map((r) => [...r]);
    nextShelf[row][col] = cart[shelf.flat().filter(Boolean).length];
    setShelf(nextShelf);
    if (nextShelf.flat().filter(Boolean).length >= LIST.length)
      setTimeout(() => {
        sfx("tada");
        setDone(true);
      }, 800);
  };

  const [done, setDone] = useState(false);
  const eyeRow =
    shelf.flat().filter(Boolean).length >= LIST.length
      ? shelf[1].filter(Boolean).length
      : 0;

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#efe6d4" }}
    >
      <div
        className="scene-bg opacity-20"
        style={{ backgroundImage: `url(${ART.supermarket})` }}
      />
      <div className="relative flex-1 flex flex-col gap-2 overflow-y-auto nice-scroll p-2.5">
        <div
          className="paper-card px-3.5 py-2"
          style={{ transform: "rotate(-0.4deg)" }}
        >
          <div className="font-hand text-xl text-[#7a4a3a]">
            Today's planogram list:
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {LIST.map((id) => (
              <button
                key={id}
                data-testid={`shelf-list-${id}`}
                onClick={() => {
                  setSel(id);
                  sfx("click");
                }}
                className="ink-border bg-[#fdf6e9] px-2.5 py-1 text-sm font-bold"
                style={
                  cart.includes(id)
                    ? {
                        background: "#5a9e6f",
                        color: "#fdf6e9",
                        textDecoration: "line-through",
                      }
                    : sel === id
                      ? {
                          background: "#e8a33d",
                          transform: "translate(2px,3px)",
                          boxShadow: "1px 1px 0 rgba(43,38,32,.9)",
                        }
                      : {}
                }
              >
                {PACKS.find((p) => p.id === id).name}
              </button>
            ))}
          </div>
          {hint && (
            <div
              className="font-hand text-lg text-[#c74a3c] mt-1"
              data-testid="shelf-hint"
            >
              {hint}
            </div>
          )}
        </div>

        {/* packs on the aisle floor */}
        <div
          className="ink-border bg-[#f6ecdb] p-2.5"
          data-testid="shelf-packs"
        >
          <div className="font-hand text-lg text-[#7a4a3a] mb-1.5">
            {cartDone
              ? "Now place them — the lit row is where eyes land first:"
              : "The aisle floor — tap the pack that matches the highlighted list item:"}
          </div>
          <div className="flex flex-wrap gap-2">
            {PACKS.map((p) =>
              cart.includes(p.id) ? null : (
                <button
                  key={p.id}
                  data-testid={`shelf-pack-${p.id}`}
                  onClick={() => tapPack(p.id)}
                  className="tap-target"
                >
                  <svg width="58" height="72" viewBox="0 0 24 30">
                    <g>
                      <rect
                        x="3"
                        y="2"
                        width="18"
                        height="26"
                        rx="3"
                        fill={p.hue}
                        stroke="#2b2620"
                        strokeWidth="2.6"
                      />
                      <rect
                        x="6"
                        y="6"
                        width="12"
                        height="7"
                        rx="1.5"
                        fill="#fdf6e9"
                        stroke="#2b2620"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M7 18h10M7 21h7"
                        stroke="#2b2620"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                </button>
              ),
            )}
          </div>
        </div>

        {/* the shelf */}
        <div className="ink-border bg-[#fdf6e9] p-2.5" data-testid="the-shelf">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-2 my-1.5">
              <div className="flex-1 grid grid-cols-4 gap-2">
                {shelf[row].map((p, col) => (
                  <button
                    key={col}
                    data-testid={`shelf-slot-${row}-${col}`}
                    onClick={() => place(row, col)}
                    className="h-14 border-2 border-[#2b2620] flex items-center justify-center"
                    style={{
                      background:
                        cartDone && !allPlaced && row === 1
                          ? "#f8ecc9"
                          : "#f1e8d2",
                      borderStyle: shelf[row][col] ? "solid" : "dashed",
                    }}
                  >
                    {p && (
                      <svg width="34" height="44" viewBox="0 0 24 30">
                        <rect
                          x="3"
                          y="2"
                          width="18"
                          height="26"
                          rx="3"
                          fill={PACKS.find((x) => x.id === p).hue}
                          stroke="#2b2620"
                          strokeWidth="2.4"
                        />
                        <rect
                          x="6"
                          y="6"
                          width="12"
                          height="7"
                          rx="1.5"
                          fill="#fdf6e9"
                          stroke="#2b2620"
                          strokeWidth="1.4"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              {row === 1 && (
                <span className="font-hand text-lg text-[#c74a3c] whitespace-nowrap">
                  eye level
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {done && (
        <DoneOverlay
          title="A shelf that sells."
          line={`You put ${eyeRow} of ${LIST.length} at eye level — that instinct is half of merchandising. The other half is doing it across 10,000+ outlets.`}
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 5c — Spot the Difference: fix the broken product page.

export function SpotDifference({ onDone }) {
  const [fixed, setFixed] = useState([]);
  const [oops, setOops] = useState(null);
  const [done, setDone] = useState(false);
  const ERRORS = ["logo", "price", "image", "title", "claims", "description"];

  const tap = (area) => {
    if (fixed.includes(area)) return;
    if (ERRORS.includes(area)) {
      sfx("pop");
      const f = [...fixed, area];
      setFixed(f);
      if (f.length >= ERRORS.length)
        setTimeout(() => {
          sfx("tada");
          setDone(true);
        }, 700);
    } else {
      sfx("click");
      setOops(area);
      setTimeout(() => setOops(null), 700);
    }
  };

  const F = (id) => fixed.includes(id);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center overflow-y-auto nice-scroll p-3"
      style={{ background: "#2b3a4a" }}
      data-testid="spotdiff-page"
    >
      <div
        className="paper-card w-full max-w-2xl p-4 mb-2"
        style={{ transform: "rotate(-0.3deg)" }}
      >
        <ProgressPips total={6} done={fixed.length} label="errors" />
      </div>
      <div
        className="paper-card w-full max-w-2xl p-4"
        data-testid="fake-pdp"
        style={{ transform: "rotate(0.2deg)" }}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b-2 border-[#2b2620] pb-2">
          <button
            data-testid="pdp-logo"
            onClick={() => tap("logo")}
            className="tap-target"
          >
            {F("logo") ? (
              <span className="font-display text-2xl font-extrabold text-[#c74a3c]">
                ShopKart
              </span>
            ) : (
              <span
                className="font-display text-2xl font-extrabold text-[#c74a3c] tracking-widest"
                style={{
                  transform: "skewX(-14deg) scaleY(1.2)",
                  display: "inline-block",
                }}
              >
                Sh0pK4RT?
              </span>
            )}
          </button>
          <div className="hidden sm:block font-body text-sm text-[#6b5d49]">
            fictional platform — errors on purpose
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* product image */}
          <button
            data-testid="pdp-image"
            onClick={() => tap("image")}
            className="tap-target ink-border p-3 bg-[#f1e8d2] flex items-center justify-center"
            style={{ minHeight: 160 }}
          >
            {F("image") ? (
              <svg width="110" height="140" viewBox="0 0 24 30">
                <rect
                  x="3"
                  y="2"
                  width="18"
                  height="26"
                  rx="4"
                  fill="#5a9e6f"
                  stroke="#2b2620"
                  strokeWidth="2.6"
                />
                <rect
                  x="6"
                  y="6"
                  width="12"
                  height="7"
                  rx="1.5"
                  fill="#fdf6e9"
                  stroke="#2b2620"
                  strokeWidth="1.6"
                />
                <path
                  d="M7 18h10M7 21h7"
                  stroke="#2b2620"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="110" height="140" viewBox="0 0 24 30">
                <g>
                  <rect
                    x="9"
                    y="2"
                    width="6"
                    height="24"
                    rx="3"
                    fill="#c74a3c"
                    stroke="#2b2620"
                    strokeWidth="2.4"
                  />
                  <rect
                    x="8"
                    y="20"
                    width="8"
                    height="6"
                    rx="2"
                    fill="#fdf6e9"
                    stroke="#2b2620"
                    strokeWidth="2"
                  />
                  <path d="M10.5 8h3" stroke="#2b2620" strokeWidth="1.6" />
                </g>
              </svg>
            )}
          </button>

          <div className="text-left">
            <button
              data-testid="pdp-title"
              onClick={() => tap("title")}
              className="tap-target block text-left"
            >
              {F("title") ? (
                <span className="font-display text-xl font-extrabold">
                  Aloe Face Cream with Vitamin E
                </span>
              ) : (
                <span className="font-display text-xl font-extrabold">
                  Aloe Face Cre…
                </span>
              )}
            </button>

            <button
              data-testid="pdp-claims"
              onClick={() => tap("claims")}
              className="tap-target block text-left mt-2"
            >
              {F("claims") ? (
                <span className="font-body text-sm bg-[#e8f0e4] border-2 border-[#2b2620] rounded-full px-2.5 py-0.5 inline-block">
                  No parabens · Dermatologically tested
                </span>
              ) : (
                <span className="font-body text-sm text-[#b8a98c] italic">
                  [ no claims shown ]
                </span>
              )}
            </button>

            <button
              data-testid="pdp-price"
              onClick={() => tap("price")}
              className="tap-target block text-left mt-3"
            >
              {F("price") ? (
                <span className="font-display text-3xl font-extrabold text-[#c74a3c]">
                  ₹249
                </span>
              ) : (
                <span className="font-display text-3xl font-extrabold text-[#b8a98c]">
                  —
                </span>
              )}
            </button>

            <button
              data-testid="pdp-description"
              onClick={() => tap("description")}
              className="tap-target block text-left mt-3 w-full"
            >
              {F("description") ? (
                <span className="font-body text-sm leading-snug block">
                  Light daily hydration with aloe and vitamin E. Non-greasy
                  finish. (Fictional listing.)
                </span>
              ) : (
                <span className="font-body text-sm text-[#b8a98c] italic block">
                  [ description missing ]
                </span>
              )}
            </button>
          </div>
        </div>
        {oops && (
          <div
            className="mt-3 font-hand text-xl text-[#7a4a3a]"
            data-testid="pdp-oops"
          >
            …that part looks fine. Keep looking.
          </div>
        )}
      </div>

      {done && (
        <DoneOverlay
          title="Shelf-ready, digitally."
          line="Every pixel a shopper trips over is a lost cart. This was the daily craft of a ₹46 Cr+ e-commerce account."
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 5d — Build the Activation: community + on-ground, one connected journey.

const CHIPS = [
  { id: "purpose", label: "Purpose: support physios", side: "digital" },
  { id: "cat1", label: "Case discussions", side: "digital" },
  { id: "cat2", label: "Expert AMAs", side: "digital" },
  { id: "cat3", label: "Patient stories", side: "digital" },
  { id: "creator1", label: "Creator onboarding", side: "digital" },
  { id: "creator2", label: "Field experts", side: "digital" },
  { id: "clinics", label: "Physio clinics", side: "ground" },
  { id: "gyms", label: "Gyms", side: "ground" },
  { id: "trial", label: "Product trial station", side: "ground" },
  { id: "posters", label: "Posters & detailers", side: "ground" },
  { id: "promoter", label: "Promoter pitch", side: "ground" },
];

export function BuildActivation({ onDone }) {
  const [placed, setPlaced] = useState([]);
  const [journey, setJourney] = useState(false);
  const [done, setDone] = useState(false);
  const complete = placed.length >= CHIPS.length;

  const tap = (id) => {
    if (placed.includes(id)) return;
    sfx("click");
    setPlaced((p) => [...p, id]);
    if (placed.length + 1 >= CHIPS.length) sfx("chime");
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#efe6d4" }}
    >
      <div
        className="scene-bg opacity-20"
        style={{ backgroundImage: `url(${ART.teamroom})` }}
      />
      <div className="relative flex-1 overflow-y-auto nice-scroll p-3">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* digital board */}
          <div
            className="ink-border bg-[#fdf6e9] p-3"
            data-testid="activation-digital"
          >
            <div className="font-display font-extrabold text-lg">
              Part A · The digital community
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {CHIPS.filter((c) => c.side === "digital").map((c) => (
                <button
                  key={c.id}
                  data-testid={`activation-chip-${c.id}`}
                  onClick={() => tap(c.id)}
                  className="ink-border px-2.5 py-1.5 text-sm font-bold"
                  style={
                    placed.includes(c.id)
                      ? {
                          background: "#4a7fb5",
                          color: "#fdf6e9",
                          transform: "translate(2px,2px)",
                          boxShadow: "1px 1px 0 rgba(43,38,32,.9)",
                        }
                      : { background: "#fdf6e9" }
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="mt-3 font-hand text-lg text-[#7a4a3a]">
              A Facebook community for physiotherapists — mission, creators,
              calendar.
            </div>
          </div>

          {/* ground board */}
          <div
            className="ink-border bg-[#fdf6e9] p-3"
            data-testid="activation-ground"
          >
            <div className="font-display font-extrabold text-lg">
              Part B · The on-ground activation
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {CHIPS.filter((c) => c.side === "ground").map((c) => (
                <button
                  key={c.id}
                  data-testid={`activation-chip-${c.id}`}
                  onClick={() => tap(c.id)}
                  className="ink-border px-2.5 py-1.5 text-sm font-bold"
                  style={
                    placed.includes(c.id)
                      ? {
                          background: "#e8a33d",
                          transform: "translate(2px,2px)",
                          boxShadow: "1px 1px 0 rgba(43,38,32,.9)",
                        }
                      : { background: "#fdf6e9" }
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="mt-3 font-hand text-lg text-[#7a4a3a]">
              Clinics and gyms — trials linked, visibly, to sales uplift.
            </div>
          </div>
        </div>

        <ProgressPips
          total={CHIPS.length}
          done={placed.length}
          label="pieces"
        />
        {complete && !journey && (
          <button
            data-testid="activation-draw-journey"
            className="btn-hand btn-red mt-2 w-full justify-center"
            onClick={() => {
              sfx("whoosh");
              setJourney(true);
              setTimeout(() => {
                sfx("tada");
                setDone(true);
              }, 1600);
            }}
          >
            Connect the journey
          </button>
        )}
        {journey && (
          <div
            className="ink-border bg-[#fdf6e9] mt-2 p-3 font-body font-bold"
            data-testid="activation-journey"
          >
            Clinic visit → poster catches the eye → promoter pitch → product
            trial → community invite → expert content → repeat purchase. Trials
            tied to sales uplift — the operational model she proposed.
          </div>
        )}
      </div>

      {done && (
        <DoneOverlay
          title="The activation is live."
          line="A year-long engagement calendar on one side, a clinic-to-checkout journey on the other."
          onContinue={onDone}
        />
      )}
    </div>
  );
}
