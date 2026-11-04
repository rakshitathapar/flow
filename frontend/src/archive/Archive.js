import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { ART } from "../data/art";
import { SKILLS, CATEGORIES } from "../data/skills";
import {
  PROJECTS,
  PROJECT_CATS,
  AWARDS,
  CERTIFICATIONS,
  PROFILE,
} from "../data/projects";
import { MILESTONES } from "../data/milestones";
import { SkillIcon } from "../art/icons";
import { CaseStudy } from "../ui/Evidence";
import { Character } from "../art/Character";
import { useGame } from "../game/store";
import { sfx } from "../game/audio";

const MARQUEE = [
  "every place teaches you something",
  "every experience leaves something behind",
  "you carry all of it into whatever comes next",
  "still figuring it out · still becoming",
];

function Trophy({ a, onClick }) {
  return (
    <button
      data-testid={`award-${a.id}`}
      onClick={onClick}
      className="ink-border bg-[#fdf6e9] p-3 text-left tap-target"
      style={{ transform: "rotate(-0.5deg)" }}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" className="mb-1">
        <g
          fill="#e8a33d"
          stroke="#2b2620"
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <path d="M7 3h10v5a5 5 0 01-10 0z" />
          <path d="M7 5H4a3 3 0 003 4M17 5h3a3 3 0 01-3 4" fill="none" />
          <path d="M10 12.5L9 17h6l-1-4.5" />
          <path d="M7 20h10v2H7z" />
        </g>
      </svg>
      <div className="font-display font-extrabold text-sm leading-tight">
        {a.title}
      </div>
      <div className="font-hand text-lg text-[#7a4a3a] leading-tight">
        {a.org} · {a.date}
      </div>
    </button>
  );
}

export default function Archive() {
  const { state, dispatch } = useGame();
  const [skill, setSkill] = useState(null);
  const [project, setProject] = useState(null);
  const [tab, setTab] = useState("backpack");
  const owned = SKILLS.filter((s) => state.skills[s.id]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const skillEvidence = (s) => {
    const rec = state.skills[s.id] || { milestones: [], evidence: [] };
    return PROJECTS.filter(
      (p) => p.skills.includes(s.id) || rec.evidence.includes(p.id),
    );
  };

  return (
    <div className="min-h-full bg-[#f7f0e3] pb-24" data-testid="archive">
      {/* hero */}
      <header
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(rgba(43,38,32,0.18), rgba(43,38,32,0.18)), url(${ART.archive}) center/cover`,
        }}
      >
        <div className="px-5 pt-20 pb-14 sm:px-10 max-w-6xl mx-auto relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="flex-1">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="font-hand text-2xl sm:text-3xl text-[#fdf6e9] drop-shadow-[0_2px_0_rgba(43,38,32,0.9)]"
              >
                {PROFILE.name}
              </motion.div>
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.12 }}
                className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.02] text-[#fdf6e9] drop-shadow-[0_3px_0_rgba(43,38,32,0.9)]"
                data-testid="archive-title"
              >
                EVERYTHING I PICKED UP ALONG THE WAY.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-body text-lg sm:text-xl text-[#fdf6e9] mt-4 max-w-xl drop-shadow-[0_2px_0_rgba(43,38,32,0.9)]"
              >
                “{PROFILE.positioning}” · {PROFILE.lines.join(" · ")}
              </motion.p>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Character stage={5} balloons={state.balloons} width={150} />
            </motion.div>
          </div>
        </div>
      </header>

      {/* editorial marquee */}
      <div
        className="overflow-hidden border-y-[2.5px] border-[#2b2620] bg-[#c74a3c] py-2.5"
        data-testid="archive-marquee"
      >
        <div className="marquee-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {MARQUEE.map((m, i) => (
                <span
                  key={i}
                  className="mx-6 font-display font-extrabold text-lg text-[#fdf6e9] whitespace-nowrap"
                >
                  {m} ·
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* tabs */}
      <nav className="sticky top-0 z-40 bg-[#f7f0e3]/95 border-b-2 border-[#2b2620] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap gap-2 items-center">
          {[
            ["backpack", "The Backpack"],
            ["workroom", "The Workroom"],
            ["trophies", "The Trophy Shelf"],
            ["profile", "About & Contact"],
          ].map(([k, label]) => (
            <button
              key={k}
              data-testid={`archive-tab-${k}`}
              onClick={() => {
                setTab(k);
                sfx("click");
              }}
              className="btn-hand text-sm sm:text-base"
              style={
                tab === k
                  ? { background: "#c74a3c", color: "#fdf6e9" }
                  : { background: "#fdf6e9" }
              }
            >
              {label}
            </button>
          ))}
          <button
            data-testid="archive-back-to-journey"
            className="btn-ghost ml-auto text-sm"
            onClick={() => dispatch({ type: "BACK_TO_JOURNEY" })}
          >
            back to the journey
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* ── A. THE BACKPACK ── */}
        {tab === "backpack" && (
          <section className="py-10" data-testid="archive-backpack">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">
              The Backpack — complete skills archive
            </h2>
            <p className="font-body text-lg text-[#4a4238] mt-2 max-w-2xl">
              Every unique skill from the journey, and the work where it showed
              up in real life. {owned.length} of {SKILLS.length} collected — the
              rest are still findable in the game.
            </p>
            {CATEGORIES.map((cat) => {
              const list = SKILLS.filter((s) => s.cat === cat);
              return (
                <div key={cat} className="mt-8">
                  <h3 className="font-display text-2xl font-extrabold text-[#c74a3c]">
                    {cat.toUpperCase()}
                  </h3>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((s) => {
                      const has = !!state.skills[s.id];
                      return (
                        <motion.button
                          key={s.id}
                          data-testid={`archive-skill-${s.id}`}
                          whileHover={{ y: -3, rotate: -0.5 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSkill(s);
                            sfx("click");
                          }}
                          className={`ink-border flex items-start gap-3 p-3 text-left ${has ? "bg-[#fdf6e9]" : "bg-[#efe6d4] opacity-60"}`}
                        >
                          <SkillIcon icon={s.icon} size={44} />
                          <div className="min-w-0">
                            <div className="font-display font-extrabold leading-tight">
                              {s.name}{" "}
                              {!has && (
                                <span className="font-hand font-medium text-[#8a7a5f]">
                                  · not yet collected
                                </span>
                              )}
                            </div>
                            <div className="font-body text-sm text-[#4a4238] leading-snug">
                              {s.desc}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* ── B. THE WORKROOM ── */}
        {tab === "workroom" && (
          <section className="py-10" data-testid="archive-workroom">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">
              The Workroom — project archive
            </h2>
            <p className="font-body text-lg text-[#4a4238] mt-2 max-w-2xl">
              The actual work, sorted into drawers. Open anything — every case
              study links back to the skills it used.
            </p>
            {PROJECT_CATS.map((cat) => {
              const list = PROJECTS.filter((p) => p.cat === cat);
              if (!list.length) return null;
              return (
                <div key={cat} className="mt-8">
                  <h3 className="font-display text-2xl font-extrabold text-[#c74a3c]">
                    {cat}
                  </h3>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((p) => (
                      <motion.button
                        key={p.id}
                        data-testid={`archive-project-${p.id}`}
                        whileHover={{ y: -3, rotate: 0.5 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setProject(p.id);
                          sfx("page");
                        }}
                        className="ink-border bg-[#fdf6e9] p-3.5 text-left"
                      >
                        <div className="font-hand text-lg text-[#7a4a3a] leading-tight">
                          {p.kind}
                        </div>
                        <div className="font-display font-extrabold leading-snug">
                          {p.title}
                        </div>
                        <p className="font-body text-sm text-[#4a4238] mt-1">
                          {p.oneLiner}
                        </p>
                        {p.metric && (
                          <div className="mt-2 font-display font-extrabold text-sm text-[#c74a3c]">
                            {p.metric}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* ── C. THE TROPHY SHELF ── */}
        {tab === "trophies" && (
          <section className="py-10" data-testid="archive-trophies">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">
              The Trophy Shelf
            </h2>
            <div
              className="ink-border bg-[#e8ddd0] mt-5 p-4"
              style={{ transform: "rotate(-0.3deg)" }}
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {AWARDS.map((a) => (
                  <Trophy
                    key={a.id}
                    a={a}
                    onClick={() => setSkill({ trophy: a })}
                  />
                ))}
              </div>
              {/* shelf line */}
              <div className="mt-3 h-2 bg-[#b58d6f] border-2 border-[#2b2620]" />
            </div>
            <h3 className="font-display text-2xl font-extrabold mt-10">
              Certifications & programmes
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {CERTIFICATIONS.map((c) => (
                <span
                  key={c}
                  className="ink-border bg-[#fdf6e9] px-3 py-1.5 font-body font-bold text-sm"
                  data-testid="certification-chip"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="ink-border bg-[#e8f0e4] mt-6 p-4 font-body">
              <b>Academic record:</b> B.A. (Hons.) Applied Psychology,
              Vivekananda College, University of Delhi (2017–2020, GPA 8.16) ·
              PGDM Marketing, IMT Ghaziabad (2020–2022, GPA 7.74)
            </div>
          </section>
        )}

        {/* ── PROFILE & CONTACT ── */}
        {tab === "profile" && (
          <section className="py-10 max-w-3xl" data-testid="archive-profile">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">
              About & contact
            </h2>
            <p className="font-hand text-2xl text-[#c74a3c] mt-3">
              “{PROFILE.positioning}”
            </p>
            <ul className="mt-4 font-body text-lg leading-relaxed list-disc pl-5">
              {PROFILE.background.map((b, i) => (
                <li key={i} className="mt-1.5">
                  {b}
                </li>
              ))}
            </ul>
            <div
              className="ink-border bg-[#fdf6e9] p-5 mt-8"
              data-testid="contact-card"
            >
              <div className="font-display font-extrabold text-xl">
                Get in touch
              </div>
              <div className="mt-3 flex flex-col gap-2.5">
                {PROFILE.contact.map((c) => (
                  <div
                    key={c.label}
                    className="flex flex-wrap items-baseline gap-2 font-body text-lg"
                  >
                    <b>{c.label}:</b>{" "}
                    <span className="placeholder-edit">{c.value}</span>
                  </div>
                ))}
              </div>
              <p className="font-hand text-lg text-[#6b5d49] mt-3">
                Dashed boxes are placeholders — edit them in the content file,
                never invented for you.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t-[2.5px] border-[#2b2620] bg-[#2b2620] text-[#fdf6e9] mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="font-display text-3xl font-extrabold">
            Still figuring it out. Still becoming.
          </div>
          <button
            data-testid="footer-restart"
            className="btn-ghost mt-4 !text-[#fdf6e9] !border-[#fdf6e9]"
            onClick={() => {
              if (window.confirm("Restart the whole journey?"))
                dispatch({ type: "RESTART" });
            }}
          >
            replay the journey
          </button>
        </div>
      </footer>

      {/* skill detail modal */}
      {skill?.trophy ? (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(43,38,32,0.6)] p-4">
          <div
            className="paper-card max-w-md w-full p-6"
            style={{ transform: "rotate(-0.6deg)" }}
            data-testid="award-detail"
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <div className="font-display text-2xl font-extrabold">
                  {skill.trophy.title}
                </div>
                <div className="font-hand text-xl text-[#7a4a3a]">
                  {skill.trophy.org} · {skill.trophy.date}
                </div>
              </div>
              <button
                className="btn-ghost"
                data-testid="award-close"
                onClick={() => setSkill(null)}
              >
                Close
              </button>
            </div>
            <p
              className={`mt-3 font-body text-lg ${skill.trophy.desc.startsWith("⟂") ? "placeholder-edit" : ""}`}
            >
              {skill.trophy.desc}
            </p>
          </div>
        </div>
      ) : skill ? (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(43,38,32,0.6)] p-4"
          onClick={() => setSkill(null)}
        >
          <div
            className="paper-card nice-scroll max-w-lg w-full max-h-[86vh] overflow-y-auto p-6"
            style={{ transform: "rotate(-0.4deg)" }}
            onClick={(e) => e.stopPropagation()}
            data-testid={`skill-detail-${skill.id}`}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-center gap-3">
                <SkillIcon icon={skill.icon} size={54} />
                <div>
                  <div className="font-display text-2xl font-extrabold">
                    {skill.name}
                  </div>
                  <div className="font-hand text-xl text-[#7a4a3a]">
                    {skill.cat}
                  </div>
                </div>
              </div>
              <button
                className="btn-ghost"
                data-testid="skill-detail-close"
                onClick={() => setSkill(null)}
              >
                Close
              </button>
            </div>
            <p className="mt-3 font-body text-lg">{skill.desc}</p>
            {state.skills[skill.id] && (
              <div className="mt-4">
                <div className="font-display font-extrabold text-sm uppercase tracking-wide text-[#7a4a3a]">
                  Collected at
                </div>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {state.skills[skill.id].milestones.map((mid) => {
                    const m = MILESTONES.find((x) => x.id === mid);
                    return (
                      <span
                        key={mid}
                        className="ink-border bg-[#f6ecdb] px-2.5 py-1 font-body text-sm font-bold"
                      >
                        {m ? `Ch.${m.n} — ${m.place}` : mid}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="mt-4">
              <div className="font-display font-extrabold text-sm uppercase tracking-wide text-[#7a4a3a]">
                Demonstrated professionally in
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {skillEvidence(skill).map((p) => (
                  <button
                    key={p.id}
                    data-testid={`skill-project-${p.id}`}
                    className="ink-border bg-[#fdf6e9] p-2.5 text-left hover:bg-[#f6ecdb] transition-colors"
                    onClick={() => setProject(p.id)}
                  >
                    <span className="font-display font-extrabold text-sm">
                      {p.title}
                    </span>
                    <span className="font-body text-sm text-[#6b5d49]">
                      {" "}
                      — {p.org}
                    </span>
                  </button>
                ))}
                {skillEvidence(skill).length === 0 && (
                  <p className="font-body text-sm text-[#8a7a5f] italic">
                    No professional evidence linked yet — some skills live in
                    life, not in decks.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {project && (
        <div className="fixed inset-0 z-[96] flex items-center justify-center bg-[rgba(43,38,32,0.65)] p-3 sm:p-6">
          <CaseStudy id={project} onClose={() => setProject(null)} />
        </div>
      )}
    </div>
  );
}
