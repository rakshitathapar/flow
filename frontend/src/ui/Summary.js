import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../game/store";
import { MILESTONES } from "../data/milestones";
import { SKILL_MAP } from "../data/skills";
import { SkillIcon } from "../art/icons";
import { CaseStudy, EvidenceCard } from "./Evidence";
import { sfx } from "../game/audio";

// Video-game level-clear screen with evidence preview.

export default function Summary() {
  const { state, dispatch } = useGame();
  const ms = MILESTONES[state.mi];
  const [caseId, setCaseId] = useState(null);
  const earned = ms.skills.filter((s) => state.skills[s]);
  const totalSkills = Object.keys(state.skills).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-30 flex items-center justify-center overflow-y-auto nice-scroll bg-[rgba(43,38,32,0.42)] p-3 sm:p-6"
      data-testid="milestone-summary"
    >
      <motion.div
        initial={{ y: 70, rotate: 1.6, scale: 0.94 }}
        animate={{ y: 0, rotate: -0.5, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 16 }}
        className="paper-card relative my-auto w-full max-w-2xl p-5 sm:p-8"
        data-testid="milestone-summary-card"
      >
        <div
          className="absolute -top-4 right-6 rotate-3 rounded-full border-[2.5px] border-[#2b2620] bg-[#c74a3c] px-4 py-1 font-display text-sm font-extrabold text-[#fdf6e9]"
          style={{ boxShadow: "3px 3px 0 rgba(43,38,32,.9)" }}
        >
          +1 balloon
        </div>
        <div className="font-hand text-2xl text-[#7a4a3a]">Level complete</div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">
          {ms.title.toUpperCase()}
        </h2>
        <div className="font-body font-bold text-[#4a4238]">
          {ms.place} · age {ms.age}
        </div>

        <div className="mt-4">
          <div className="font-display font-extrabold text-sm uppercase tracking-wide text-[#7a4a3a]">
            Skills collected
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {earned.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="ink-border flex items-center gap-2.5 bg-[#fdf6e9] p-2"
                data-testid={`summary-skill-${s}`}
              >
                <SkillIcon icon={SKILL_MAP[s].icon} size={38} />
                <div className="min-w-0">
                  <div className="font-display font-extrabold leading-tight">
                    {SKILL_MAP[s].name}
                  </div>
                  <div className="font-body text-sm text-[#6b5d49] leading-tight">
                    {SKILL_MAP[s].desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="font-body text-base sm:text-lg leading-relaxed mt-4 text-[#4a4238]">
          {ms.summaryLine}
        </p>

        <div
          className="mt-4 flex flex-wrap gap-4 font-display font-extrabold text-sm"
          data-testid="summary-totals"
        >
          <span className="ink-border bg-[#e8f0e4] px-3 py-1.5">
            Balloons: {state.balloons}
          </span>
          <span className="ink-border bg-[#f6e3c8] px-3 py-1.5">
            Unique skills: {totalSkills}
          </span>
        </div>

        {ms.evidence.length > 0 && (
          <div className="mt-5">
            <div className="font-display font-extrabold text-sm uppercase tracking-wide text-[#7a4a3a]">
              Evidence unlocked
            </div>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ms.evidence.map((pid) => (
                <EvidenceCard key={pid} id={pid} onOpen={setCaseId} />
              ))}
            </div>
          </div>
        )}

        <button
          data-testid="summary-continue"
          className="btn-hand btn-red mt-6 w-full justify-center text-xl"
          onClick={() => {
            sfx("whoosh");
            dispatch({ type: "SUMMARY_CONTINUE" });
          }}
        >
          {state.mi >= MILESTONES.length - 1
            ? "To the crossroads"
            : "Continue the journey"}
        </button>
      </motion.div>

      {caseId && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(43,38,32,0.6)] p-3 sm:p-6">
          <CaseStudy id={caseId} onClose={() => setCaseId(null)} />
        </div>
      )}
    </motion.div>
  );
}
