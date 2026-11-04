import React, { useState } from "react";
import { motion } from "framer-motion";
import { DoneOverlay, ProgressPips } from "./kit";
import { ART } from "../data/art";
import { sfx } from "../game/audio";

// MILESTONE 6a — The Packaging Studio: assemble a pack, layer by layer.

const LAYERS = [
  { id: "insight", label: "Consumer insight", at: "top" },
  { id: "proposition", label: "Hero proposition", at: "middle" },
  { id: "benefits", label: "Benefits", at: "upper" },
  { id: "claims", label: "Claims", at: "lower" },
  { id: "design", label: "Pack design", at: "skin" },
  { id: "gtm", label: "Go-to-market", at: "badge" },
];

export function PackStudio({ onDone }) {
  const [placed, setPlaced] = useState([]);
  const done = placed.length >= LAYERS.length;
  const has = (id) => placed.includes(id);

  const tap = (id) => {
    if (!has(id)) {
      sfx("pop");
      setPlaced((p) => [...p, id]);
      if (placed.length + 1 >= LAYERS.length)
        setTimeout(() => sfx("tada"), 800);
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#efe6d4" }}
    >
      <div
        className="scene-bg opacity-20"
        style={{ backgroundImage: `url(${ART.packaging})` }}
      />
      <div className="relative flex-1 flex flex-col items-center justify-center gap-4 p-3 overflow-y-auto nice-scroll">
        {/* the pack */}
        <div className="relative" data-testid="pack-under-construction">
          <svg
            width="230"
            height="280"
            viewBox="0 0 23 28"
            className="wobble-sm"
          >
            <path
              d="M2 4 L11.5 1 L21 4 V24 L11.5 27 L2 24 Z"
              fill={has("design") ? "#e8a33d" : "#e8ddd0"}
              stroke="#2b2620"
              strokeWidth="0.55"
              strokeLinejoin="round"
            />
            <path
              d="M2 4 L11.5 7 L21 4 M11.5 7 V27"
              fill="none"
              stroke="#2b2620"
              strokeWidth="0.45"
            />
            {has("insight") && (
              <text
                x="11.5"
                y="11"
                textAnchor="middle"
                fontSize="1.5"
                fill="#2b2620"
                fontFamily="Caveat"
              >
                “Will it suit my baby?”
              </text>
            )}
            {has("proposition") && (
              <text
                x="11.5"
                y="14.5"
                textAnchor="middle"
                fontSize="1.9"
                fontWeight="800"
                fill="#c74a3c"
                fontFamily="Shantell Sans"
              >
                Gentle. Proven. Every day.
              </text>
            )}
            {has("benefits") && (
              <text
                x="11.5"
                y="18"
                textAnchor="middle"
                fontSize="1.3"
                fill="#2b2620"
                fontFamily="Alegreya Sans"
              >
                · easier digestion · steady growth
              </text>
            )}
            {has("claims") && (
              <text
                x="11.5"
                y="21"
                textAnchor="middle"
                fontSize="1.2"
                fill="#2a7f79"
                fontFamily="Alegreya Sans"
              >
                clinically tested nutrients
              </text>
            )}
            {has("gtm") && (
              <g>
                <rect
                  x="14"
                  y="22.5"
                  width="6"
                  height="3"
                  rx="1"
                  fill="#2a7f79"
                  stroke="#2b2620"
                  strokeWidth="0.4"
                />
                <text
                  x="17"
                  y="24.6"
                  textAnchor="middle"
                  fontSize="1.2"
                  fill="#fdf6e9"
                  fontFamily="Alegreya Sans"
                >
                  GTM ready
                </text>
              </g>
            )}
          </svg>
          {!has("design") && (
            <span className="absolute inset-0 flex items-start justify-center pt-8 font-hand text-xl text-[#8a7a5f]">
              a blank pack, waiting
            </span>
          )}
        </div>

        {/* layers */}
        <div className="flex flex-wrap justify-center gap-2 max-w-lg">
          {LAYERS.map((l) => (
            <button
              key={l.id}
              data-testid={`pack-layer-${l.id}`}
              onClick={() => tap(l.id)}
              disabled={has(l.id)}
              className="ink-border px-3 py-1.5 font-body font-bold text-sm tap-target"
              style={
                has(l.id)
                  ? { background: "#5a9e6f", color: "#fdf6e9", opacity: 0.85 }
                  : { background: "#fdf6e9" }
              }
            >
              {l.label}
            </button>
          ))}
        </div>
        <p className="font-hand text-lg text-[#6b5d49] text-center">
          A fictional pack — the real one stayed in meetings. The layers didn't.
        </p>
      </div>

      {done && (
        <DoneOverlay
          title="The pack has a voice."
          line="20 user immersions across 4 cities, category research, agency teams, print proofing — and a hero proposition that earns its place."
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 6b — The 28-Day Journey: connect the chatbot flow in order.

const FLOW = [
  { id: "qr", label: "QR on pack", bubble: "scan… beep!" },
  {
    id: "bot",
    label: "WhatsApp chatbot",
    bubble: "Hi! Tell me about your little one.",
  },
  {
    id: "plan",
    label: "Personalised diet plan",
    bubble: "Here's a plan made for you.",
  },
  {
    id: "days",
    label: "28-day wellness journey",
    bubble: "Day 1 … Day 28 — one step at a time.",
  },
  {
    id: "follow",
    label: "Follow-up",
    bubble: "How did the month go? We're here.",
  },
];

export function ChatbotJourney({ onDone }) {
  const [step, setStep] = useState(0);
  const [shakeId, setShakeId] = useState(null);
  const done = step >= FLOW.length;

  const tap = (id, i) => {
    if (i === step) {
      sfx("chime");
      setStep((s) => s + 1);
    } else {
      sfx("click");
      setShakeId(id);
      setTimeout(() => setShakeId(null), 450);
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-3"
      style={{ background: "#2a4a3a" }}
    >
      <div
        className="scene-bg opacity-25"
        style={{ backgroundImage: `url(${ART.mumbai})` }}
      />
      {/* phone */}
      <div
        className="relative ink-border bg-[#fdf6e9] p-4 w-[min(92vw,340px)]"
        data-testid="chatbot-phone"
        style={{ transform: "rotate(-0.6deg)" }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-2 w-16 rounded-full bg-[#2b2620]" />
        <div className="font-display font-extrabold text-center mt-4">
          Nutrition companion{" "}
          <span className="font-hand font-medium text-[#7a4a3a]">
            (fictional)
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          {FLOW.map((f, i) => (
            <div key={f.id} className="relative">
              <button
                data-testid={`chatbot-node-${f.id}`}
                onClick={() => tap(f.id, i)}
                disabled={i < step}
                className={`ink-border w-full flex items-center gap-2.5 px-3 py-2.5 text-left font-display font-extrabold ${shakeId === f.id ? "animate-[walkA_0.2s_linear_2]" : ""}`}
                style={
                  i < step
                    ? { background: "#e8f0e4" }
                    : { background: i === step ? "#e8a33d" : "#f1e8d2" }
                }
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#2b2620] bg-[#fdf6e9] text-sm">
                  {i + 1}
                </span>
                {f.label}
              </button>
              {i < step && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ml-8 mt-1 rounded-2xl border-2 border-[#2b2620] bg-[#e8f0e4] px-3 py-1.5 font-body text-sm w-fit"
                >
                  {f.bubble}
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 font-hand text-lg text-[#7a4a3a] text-center">
          {done
            ? "Journey complete — day 28 and beyond."
            : "Tap the next step in the journey."}
        </div>
      </div>

      {done && (
        <DoneOverlay
          title="From one scan to 28 days."
          line="Conversational architecture, a diet-plan database, personalisation logic and creatives — designed end to end, for full-funnel impact."
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 6c — The Campaign Control Room: tune the ROAS machine.

const IDEAL = { breadth: 15, keywords: 55, creative: 30 };

export function CampaignRoom({ onDone }) {
  const [alloc, setAlloc] = useState({
    breadth: 33,
    keywords: 33,
    creative: 34,
  });
  const [roas, setRoas] = useState(null);
  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState(0);
  const [won, setWon] = useState(false);
  const [done, setDone] = useState(false);

  const score =
    2 +
    7.81 *
      Math.max(
        0,
        1 -
          (Math.abs(alloc.breadth - IDEAL.breadth) +
            Math.abs(alloc.keywords - IDEAL.keywords) +
            Math.abs(alloc.creative - IDEAL.creative)) /
            170,
      );

  const run = () => {
    setRunning(true);
    sfx("click");
    setTimeout(() => {
      setRoas(score);
      setRuns((r) => r + 1);
      setRunning(false);
      sfx("chime");
      if (score >= 8.5) {
        setWon(true);
        setTimeout(() => {
          sfx("tada");
          setDone(true);
        }, 1200);
      }
    }, 900);
  };

  const slider = (key, label, testid) => (
    <label className="block font-body font-bold">
      {label} <span className="font-display text-[#c74a3c]">{alloc[key]}%</span>
      <input
        type="range"
        min="0"
        max="100"
        value={alloc[key]}
        data-testid={testid}
        onChange={(e) => {
          const v = +e.target.value;
          setAlloc((a) => ({ ...a, [key]: v }));
        }}
        className="w-full accent-[#c74a3c]"
        disabled={running || won}
      />
    </label>
  );

  return (
    <div className="absolute inset-0" style={{ background: "#12242e" }}>
      <div
        className="scene-bg opacity-40"
        style={{ backgroundImage: `url(${ART.control})` }}
      />
      <div className="relative h-full flex items-center justify-center p-3">
        <div
          className="paper-card w-full max-w-md p-5"
          style={{ transform: "rotate(-0.5deg)" }}
          data-testid="campaign-dashboard"
        >
          <div className="font-display text-2xl font-extrabold">
            Apollo 24x7 · live campaign
          </div>
          <div className="font-hand text-xl text-[#7a4a3a]">
            Split the budget. Watch the ROAS meter.
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {slider(
              "breadth",
              "Budget breadth (spread wide)",
              "campaign-slider-breadth",
            )}
            {slider("keywords", "Keyword depth", "campaign-slider-keywords")}
            {slider(
              "creative",
              "Creative rotation",
              "campaign-slider-creative",
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              data-testid="campaign-run"
              className="btn-hand btn-red"
              onClick={run}
              disabled={running || won}
            >
              {running ? "Running…" : runs === 0 ? "Run campaign" : "Run again"}
            </button>
            {runs >= 2 && !won && (
              <button
                data-testid="campaign-optimal"
                className="btn-ghost"
                onClick={() => {
                  setAlloc({ ...IDEAL });
                  sfx("chime");
                }}
              >
                use the optimal split
              </button>
            )}
            <div
              className="font-display font-extrabold text-3xl"
              data-testid="campaign-roas"
              style={{ color: won ? "#2a7f79" : "#2b2620" }}
            >
              {roas ? roas.toFixed(2) : "—"}
            </div>
          </div>

          {roas !== null && !won && (
            <div
              className="mt-2 font-hand text-xl text-[#c74a3c]"
              data-testid="campaign-hint"
            >
              ROAS {roas.toFixed(2)} — push budget out of breadth, into keywords
              and creative.
            </div>
          )}
          {won && (
            <div
              className="mt-2 font-body font-bold"
              data-testid="campaign-result"
            >
              ROAS 9.81 · 1.7 lakh ad impressions · 3,300+ clicks — budget,
              keyword and creative enhancements, aligned to brand strategy.
            </div>
          )}
        </div>
      </div>

      {done && (
        <DoneOverlay
          title="The meter says 9.81."
          line="Real numbers from the real campaign. The machine is just sliders until someone reads it properly."
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 6d — The Business Control Room: match brands to platforms, build the NSV.

const MATCHES = [
  {
    id: "baby",
    brand: "Baby nutrition range",
    platform: "Tata 1mg · e-pharmacy",
  },
  {
    id: "impulse",
    brand: "Impulse & small packs",
    platform: "Blinkit · quick commerce",
  },
  {
    id: "combos",
    brand: "Combos & storefront",
    platform: "Flipkart · marketplace",
  },
  { id: "portfolio", brand: "Portfolio deals", platform: "Other platforms" },
];

export function BizRoom({ onDone }) {
  const [matched, setMatched] = useState([]);
  const [sel, setSel] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const done = matched.length >= MATCHES.length;

  const tapPlatform = (pid) => {
    if (!sel) return;
    const m = MATCHES.find((x) => x.id === sel);
    if (m && pid === m.platform) {
      sfx("chime");
      setMatched((p) => [...p, sel]);
      setSel(null);
      if (matched.length + 1 >= MATCHES.length)
        setTimeout(() => sfx("tada"), 800);
    } else {
      sfx("click");
      setShakeId(pid);
      setTimeout(() => setShakeId(null), 450);
      setSel(null);
    }
  };

  const nsv = matched.length * 50;

  return (
    <div className="absolute inset-0" style={{ background: "#0e2233" }}>
      <div
        className="scene-bg opacity-35"
        style={{ backgroundImage: `url(${ART.bizroom})` }}
      />
      <div className="relative h-full overflow-y-auto nice-scroll p-3 flex flex-col gap-3">
        <div
          className="paper-card px-4 py-3 mx-auto w-full max-w-xl"
          style={{ transform: "rotate(-0.4deg)" }}
        >
          <div className="flex items-center justify-between">
            <div className="font-display font-extrabold text-lg">
              Managed portfolio NSV
            </div>
            <div
              className="font-display font-extrabold text-2xl text-[#c74a3c]"
              data-testid="nsv-meter"
            >
              ₹{nsv} Cr {done ? "· ~₹200 Cr annual" : ""}
            </div>
          </div>
          <div className="mt-1.5 h-4 rounded-full border-2 border-[#2b2620] bg-[#f1e8d2] overflow-hidden">
            <div
              className="h-full bg-[#5a9e6f] transition-all duration-700"
              style={{ width: `${(nsv / 200) * 100}%` }}
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="ink-border bg-[#fdf6e9] p-3" data-testid="biz-brands">
            <div className="font-hand text-xl text-[#7a4a3a] mb-1.5">
              Brand chips {sel ? "— now pick its platform" : "— tap one"}:
            </div>
            {MATCHES.map((m) =>
              matched.includes(m.id) ? (
                <div
                  key={m.id}
                  className="ink-border mb-1.5 bg-[#e8f0e4] px-2.5 py-1.5 text-sm font-bold"
                >
                  {m.brand} ✓
                </div>
              ) : (
                <button
                  key={m.id}
                  data-testid={`biz-brand-${m.id}`}
                  onClick={() => {
                    setSel(m.id);
                    sfx("click");
                  }}
                  className="ink-border block w-full mb-1.5 bg-[#fdf6e9] px-2.5 py-1.5 text-left text-sm font-bold tap-target"
                  style={
                    sel === m.id
                      ? {
                          background: "#e8a33d",
                          transform: "translate(2px,3px)",
                          boxShadow: "1px 1px 0 rgba(43,38,32,.9)",
                        }
                      : {}
                  }
                >
                  {m.brand}
                </button>
              ),
            )}
            <div className="font-hand text-base text-[#8a7a5f] mt-1">
              a simplified board from the real portfolio
            </div>
          </div>

          <div
            className="ink-border bg-[#fdf6e9] p-3"
            data-testid="biz-platforms"
          >
            <div className="font-hand text-xl text-[#7a4a3a] mb-1.5">
              Platforms:
            </div>
            {[
              "Tata 1mg · e-pharmacy",
              "Blinkit · quick commerce",
              "Flipkart · marketplace",
              "Other platforms",
            ].map((p) => (
              <button
                key={p}
                data-testid={`biz-platform-${p.split(" ")[0].toLowerCase()}`}
                onClick={() => tapPlatform(p)}
                className={`ink-border block w-full mb-1.5 px-2.5 py-1.5 text-left text-sm font-bold tap-target ${shakeId === p ? "animate-[walkA_0.2s_linear_2]" : ""}`}
                style={
                  matched.some(
                    (id) => MATCHES.find((x) => x.id === id).platform === p,
                  )
                    ? { background: "#e8f0e4" }
                    : { background: "#f1e8d2", borderStyle: "dashed" }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {done && (
        <DoneOverlay
          title="Seven accounts, one portfolio."
          line="Blinkit, Flipkart, Tata 1mg and others — planned and executed to roughly ₹200 Cr annual NSV, with e-pharma scaled to 2x in 11 months."
          onContinue={onDone}
        />
      )}
    </div>
  );
}

// MILESTONE 6e — Connect the Dots: every team owns a piece of the launch.

const TEAMS = [
  "Supply",
  "Marketing",
  "Platform",
  "Operations",
  "Sales",
  "Agency",
];
const TASKS = [
  { id: "t1", label: "Demand forecast & stock", team: "Supply" },
  { id: "t2", label: "Artwork & claims", team: "Marketing" },
  { id: "t3", label: "Platform listing setup", team: "Platform" },
  { id: "t4", label: "Campaign creatives", team: "Agency" },
  { id: "t5", label: "Trade terms & pricing", team: "Sales" },
  { id: "t6", label: "Launch day review", team: "Operations" },
];

export function ConnectDots({ onDone }) {
  const [links, setLinks] = useState({});
  const [sel, setSel] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const done = Object.keys(links).length >= TASKS.length;

  const tapTeam = (team) => {
    if (!sel) return;
    const t = TASKS.find((x) => x.id === sel);
    if (t.team === team) {
      sfx("chime");
      setLinks((l) => ({ ...l, [sel]: team }));
      setSel(null);
      if (Object.keys(links).length + 1 >= TASKS.length)
        setTimeout(() => sfx("tada"), 800);
    } else {
      sfx("click");
      setShakeId(team);
      setTimeout(() => setShakeId(null), 450);
      setSel(null);
    }
  };

  return (
    <div className="absolute inset-0" style={{ background: "#e8ddd0" }}>
      <div
        className="scene-bg opacity-20"
        style={{ backgroundImage: `url(${ART.teamroom})` }}
      />
      <div className="relative h-full overflow-y-auto nice-scroll p-3 flex flex-col gap-3">
        <div
          className="ink-border bg-[#fdf6e9] p-3 mx-auto w-full max-w-xl"
          data-testid="dots-tasks"
        >
          <div className="font-hand text-xl text-[#7a4a3a]">
            {sel ? "Now tap the team that owns it" : "Tap a task to assign it"}:
          </div>
          <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {TASKS.map((t) => (
              <button
                key={t.id}
                data-testid={`dots-task-${t.id}`}
                disabled={links[t.id]}
                onClick={() => {
                  setSel(t.id);
                  sfx("click");
                }}
                className="ink-border px-2.5 py-1.5 text-left text-sm font-bold"
                style={
                  links[t.id]
                    ? { background: "#e8f0e4" }
                    : { background: "#fdf6e9" }
                }
              >
                {t.label}{" "}
                {links[t.id] && (
                  <span className="font-hand text-[#2a7f79]">
                    → {links[t.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          className="ink-border bg-[#fdf6e9] p-3 mx-auto w-full max-w-xl"
          data-testid="dots-teams"
        >
          <div className="font-display font-extrabold">The room:</div>
          <div className="mt-2 flex flex-wrap justify-between gap-2">
            {TEAMS.map((t) => (
              <button
                key={t}
                data-testid={`dots-team-${t.toLowerCase()}`}
                onClick={() => tapTeam(t)}
                className={`flex flex-col items-center tap-target ${shakeId === t ? "animate-[walkA_0.2s_linear_2]" : ""}`}
              >
                <svg width="52" height="52" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="8"
                    r="5"
                    fill="#f2b58c"
                    stroke="#2b2620"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M4 22c0-5 3.6-8 8-8s8 3 8 8"
                    fill={
                      [
                        "#c74a3c",
                        "#e8a33d",
                        "#2a7f79",
                        "#7b5ea7",
                        "#4a7fb5",
                        "#5a9e6f",
                      ][TEAMS.indexOf(t)]
                    }
                    stroke="#2b2620"
                    strokeWidth="2.2"
                  />
                  {links[t] && (
                    <circle
                      cx="19"
                      cy="5"
                      r="3"
                      fill="#5a9e6f"
                      stroke="#2b2620"
                      strokeWidth="1.6"
                    />
                  )}
                </svg>
                <span className="font-display font-extrabold text-xs mt-0.5">
                  {t}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {done && (
        <DoneOverlay
          title="Everyone owns a dot."
          line="Joint business planning with platform and internal teams — seamless go-to-market, maximum campaign impact."
          onContinue={onDone}
        />
      )}
    </div>
  );
}
