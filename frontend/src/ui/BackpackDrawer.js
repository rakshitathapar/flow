import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../game/store";
import { MILESTONES } from "../data/milestones";
import { SKILL_MAP, SKILLS } from "../data/skills";
import { PROJECTS } from "../data/projects";
import { SkillIcon } from "../art/icons";
import { CaseStudy } from "./Evidence";

export default function BackpackDrawer() {
  const { state, dispatch } = useGame();
  const [openSkill, setOpenSkill] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const open = !!state.panels.backpack;

  const owned = SKILLS.filter((s) => state.skills[s.id]);
  const msIndex = (mid) => {
    const i = MILESTONES.findIndex((m) => m.id === mid);
    return i;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[88] bg-[rgba(43,38,32,0.45)]"
          onClick={() =>
            dispatch({ type: "SET_PANEL", key: "backpack", value: null })
          }
        >
          <motion.aside
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 210, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="paper-card nice-scroll absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto p-5"
            style={{ borderRadius: "15px 0 0 255px / 15px 0 0 225px" }}
            data-testid="backpack-drawer"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-2xl font-extrabold">
                  The Backpack
                </div>
                <div className="font-hand text-xl text-[#7a4a3a]">
                  {owned.length} of {SKILLS.length} things picked up
                </div>
              </div>
              <button
                data-testid="backpack-close"
                className="btn-ghost"
                onClick={() =>
                  dispatch({ type: "SET_PANEL", key: "backpack", value: null })
                }
              >
                Close
              </button>
            </div>

            {owned.length === 0 && (
              <p className="mt-8 font-hand text-2xl text-[#6b5d49] text-center">
                Nothing in here yet.
                <br />
                Play a milestone and see what sticks.
              </p>
            )}

            <div className="mt-4 flex flex-col gap-2.5">
              {owned
                .sort(
                  (a, b) =>
                    msIndex(state.skills[a.id].milestones[0]) -
                    msIndex(state.skills[b.id].milestones[0]),
                )
                .map((s) => {
                  const rec = state.skills[s.id];
                  const msNames = rec.milestones
                    .map((mid) => MILESTONES.find((m) => m.id === mid))
                    .filter(Boolean);
                  return (
                    <button
                      key={s.id}
                      data-testid={`backpack-skill-${s.id}`}
                      className="ink-border flex items-start gap-3 bg-[#fdf6e9] p-3 text-left hover:bg-[#f6ecdb] transition-colors"
                      onClick={() =>
                        setOpenSkill(openSkill === s.id ? null : s.id)
                      }
                    >
                      <SkillIcon icon={s.icon} size={46} />
                      <div className="min-w-0 flex-1">
                        <div className="font-display font-extrabold leading-tight">
                          {s.name}
                        </div>
                        <div className="font-hand text-lg text-[#7a4a3a] leading-tight">
                          {msNames.map((m) => `Ch.${m.n}`).join(" · ")}
                        </div>
                        {openSkill === s.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="overflow-hidden"
                          >
                            <p className="font-body text-[15px] text-[#4a4238] mt-1.5">
                              {s.desc}
                            </p>
                            <div className="font-body text-sm mt-1">
                              <b>Collected at:</b>{" "}
                              {msNames.map((m) => m.title).join(", ")}
                            </div>
                            {rec.evidence.length > 0 && (
                              <div className="mt-2">
                                <div className="font-body text-sm font-bold">
                                  Demonstrated in:
                                </div>
                                {rec.evidence.map((pid) => {
                                  const p = PROJECTS.find((x) => x.id === pid);
                                  return p ? (
                                    <span
                                      key={pid}
                                      data-testid={`backpack-evidence-${pid}`}
                                      className="btn-ghost inline-block mr-1.5 mt-1 text-xs"
                                      role="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCaseId(pid);
                                      }}
                                    >
                                      {p.title.length > 34
                                        ? p.title.slice(0, 34) + "…"
                                        : p.title}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                      <span
                        className="mt-1 inline-block h-2.5 w-2.5 rounded-full border-2 border-[#2b2620]"
                        style={{
                          background:
                            s.cat === "People"
                              ? "#4a7fb5"
                              : s.cat === "Thinking"
                                ? "#5a9e6f"
                                : s.cat === "Strategy"
                                  ? "#e8a33d"
                                  : s.cat === "Marketing"
                                    ? "#c74a3c"
                                    : s.cat === "Digital"
                                      ? "#7b5ea7"
                                      : "#2a7f79",
                        }}
                        title={s.cat}
                      />
                    </button>
                  );
                })}
            </div>
          </motion.aside>
        </motion.div>
      )}
      {caseId && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(43,38,32,0.6)] p-3 sm:p-6">
          <CaseStudy id={caseId} onClose={() => setCaseId(null)} />
        </div>
      )}
    </AnimatePresence>
  );
}
