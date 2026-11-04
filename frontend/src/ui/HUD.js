import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../game/store";
import { MILESTONES } from "../data/milestones";
import { SKILL_MAP } from "../data/skills";
import { PROJECTS } from "../data/projects";
import { SkillIcon } from "../art/icons";
import { CaseStudy } from "./Evidence";
import * as A from "../game/audio";

function IconBtn({ onClick, testid, children, title, active }) {
  return (
    <button
      title={title}
      data-testid={testid}
      onClick={onClick}
      className="btn-hand !p-2 !shadow-[2px_3px_0_rgba(43,38,32,.9)]"
      style={active ? { background: "#c74a3c", color: "#fdf6e9" } : undefined}
    >
      {children}
    </button>
  );
}

export default function HUD() {
  const { state, dispatch } = useGame();
  const [mapOpen, setMapOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const ms = MILESTONES[state.mi];
  const skillCount = Object.keys(state.skills).length;
  if (state.phase === "journal" || state.phase === "archive") return null;

  const toggleMusic = () => {
    const on = !state.sound.music;
    dispatch({ type: "SET_SOUND", value: { music: on } });
    if (on) A.startMusic();
    else A.stopMusic();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[70] flex items-start justify-between p-2 sm:p-3 pointer-events-none">
        {/* progress pips */}
        <div
          className="paper-card pointer-events-auto flex items-center gap-1.5 px-3 py-2"
          style={{ transform: "rotate(-0.6deg)" }}
          data-testid="hud-progress"
        >
          {MILESTONES.map((m, i) => {
            const done = state.completed.includes(m.id);
            const cur = i === state.mi && state.phase !== "archive";
            return (
              <span
                key={m.id}
                title={`${m.n}. ${m.title}`}
                className="inline-block rounded-full border-2 border-[#2b2620]"
                style={{
                  width: 11,
                  height: 11,
                  background: done ? "#c74a3c" : cur ? "#e8a33d" : "#e4d9c3",
                  animation: cur ? "pulseSoft 2s infinite" : undefined,
                }}
              />
            );
          })}
          <span className="ml-1 hidden sm:inline font-hand text-lg leading-none text-[#6b5d49]">
            {ms ? `Ch. ${ms.n}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
          <div
            className="paper-card flex items-center gap-1.5 px-3 py-2"
            data-testid="hud-balloons"
            style={{ transform: "rotate(0.8deg)" }}
          >
            <span
              className="inline-block w-3.5 h-4 rounded-[50%] border-2 border-[#2b2620]"
              style={{ background: "#c74a3c" }}
            />
            <span className="font-display font-extrabold text-sm">
              ×{state.balloons}
            </span>
          </div>
          <IconBtn
            testid="hud-evidence-button"
            title="Journey & evidence"
            onClick={() => setMapOpen(true)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2b2620"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </IconBtn>
          <button
            data-testid="hud-backpack-button"
            title="Backpack"
            onClick={() => dispatch({ type: "TOGGLE_PANEL", key: "backpack" })}
            className="btn-hand btn-teal !p-2 relative !shadow-[2px_3px_0_rgba(43,38,32,.9)]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fdf6e9"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="7" width="14" height="13" rx="3" />
              <path d="M9 7V5a3 3 0 016 0v2M9 13h6" />
            </svg>
            {skillCount > 0 && (
              <span
                data-testid="hud-backpack-count"
                className="absolute -top-2 -right-2 rounded-full border-2 border-[#2b2620] bg-[#e8a33d] px-1.5 text-xs font-extrabold text-[#2b2620]"
              >
                {skillCount}
              </span>
            )}
          </button>
          <IconBtn
            testid="hud-sound-button"
            title="Sound"
            onClick={() => setSoundOpen((v) => !v)}
            active={state.sound.music}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2b2620"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6" />
            </svg>
          </IconBtn>
          <IconBtn
            testid="hud-pause-button"
            title="Pause"
            onClick={() => dispatch({ type: "TOGGLE_PANEL", key: "pause" })}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2b2620"
              strokeWidth="2.8"
              strokeLinecap="round"
            >
              <path d="M9 5v14M15 5v14" />
            </svg>
          </IconBtn>
        </div>
      </div>

      {/* sound popover */}
      <AnimatePresence>
        {soundOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="paper-card fixed right-2 top-16 z-[75] w-64 p-4 sm:right-3 sm:top-[68px]"
            data-testid="hud-sound-panel"
            style={{ transform: "rotate(0.5deg)" }}
          >
            <div className="font-display font-extrabold mb-3">Sound</div>
            <label className="flex items-center justify-between gap-3 font-body mb-2">
              <span>Music</span>
              <input
                type="checkbox"
                data-testid="hud-music-toggle"
                checked={state.sound.music}
                onChange={toggleMusic}
                className="w-5 h-5 accent-[#c74a3c]"
              />
            </label>
            <label className="block font-body mb-3">
              <span className="text-sm text-[#6b5d49]">Music volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                data-testid="hud-music-volume"
                value={state.sound.musicVol ?? 0.5}
                onChange={(e) => {
                  A.setVol("music", +e.target.value);
                  dispatch({
                    type: "SET_SOUND",
                    value: { musicVol: +e.target.value },
                  });
                }}
                className="w-full accent-[#c74a3c]"
              />
            </label>
            <label className="block font-body">
              <span className="text-sm text-[#6b5d49]">Sound effects</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                data-testid="hud-sfx-volume"
                value={state.sound.sfx}
                onChange={(e) => {
                  A.setVol("sfx", +e.target.value);
                  dispatch({
                    type: "SET_SOUND",
                    value: { sfx: +e.target.value },
                  });
                }}
                className="w-full accent-[#c74a3c]"
              />
            </label>
            <p className="font-hand text-base text-[#6b5d49] mt-2">
              Original music arrives later — everything here is a placeholder
              hum.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* pause menu */}
      <AnimatePresence>
        {state.panels.pause && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-center justify-center bg-[rgba(43,38,32,0.5)] p-4"
            data-testid="pause-menu"
          >
            <motion.div
              initial={{ scale: 0.9, rotate: 2 }}
              animate={{ scale: 1, rotate: -0.5 }}
              className="paper-card w-full max-w-sm p-6 text-center"
            >
              <div className="font-display text-3xl font-extrabold">Paused</div>
              <p className="font-hand text-xl text-[#7a4a3a] mt-1">
                The balloons will wait.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  data-testid="pause-resume"
                  className="btn-hand btn-red justify-center"
                  onClick={() =>
                    dispatch({ type: "SET_PANEL", key: "pause", value: null })
                  }
                >
                  Resume
                </button>
                <button
                  data-testid="pause-map"
                  className="btn-hand justify-center"
                  onClick={() => {
                    dispatch({ type: "SET_PANEL", key: "pause", value: null });
                    setMapOpen(true);
                  }}
                >
                  Journey & evidence
                </button>
                <button
                  data-testid="pause-archive"
                  className="btn-hand btn-teal justify-center"
                  onClick={() => dispatch({ type: "SKIP_TO_ARCHIVE" })}
                >
                  Open the archive
                </button>
                <button
                  data-testid="pause-restart"
                  className="btn-ghost justify-center"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Start the journey over? All balloons and skills will be lost.",
                      )
                    )
                      dispatch({ type: "RESTART" });
                  }}
                >
                  Restart journey
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* journey map + evidence */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-center justify-center bg-[rgba(43,38,32,0.55)] p-3 sm:p-6"
            data-testid="journey-map-modal"
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              className="paper-card nice-scroll w-full max-w-2xl max-h-[86vh] overflow-y-auto p-5 sm:p-7"
              style={{ transform: "rotate(-0.3deg)" }}
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-2xl font-extrabold">
                  The journey so far
                </div>
                <button
                  data-testid="map-close"
                  className="btn-ghost"
                  onClick={() => setMapOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {MILESTONES.map((m) => {
                  const done = state.completed.includes(m.id);
                  const cur = m.id === ms?.id && !done;
                  return (
                    <div
                      key={m.id}
                      className={`ink-border p-3 ${cur ? "bg-[#fdf0d5]" : "bg-[#fdf6e9]"}`}
                      style={{ opacity: done || cur ? 1 : 0.62 }}
                      data-testid={`map-milestone-${m.id}`}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-extrabold">
                          {m.n}. {m.title}
                        </span>
                        <span className="font-hand text-lg text-[#7a4a3a]">
                          · {m.place}
                        </span>
                        {done && (
                          <span className="ml-auto font-hand text-lg text-[#c74a3c]">
                            ✓ done
                          </span>
                        )}
                        {cur && (
                          <span className="ml-auto font-hand text-lg text-[#e8a33d]">
                            · you are here
                          </span>
                        )}
                      </div>
                      {(done || cur) && (m.evidence || []).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {m.evidence.map((pid) => {
                            const p = PROJECTS.find((x) => x.id === pid);
                            if (!p) return null;
                            return (
                              <button
                                key={pid}
                                data-testid={`map-evidence-${pid}`}
                                className="btn-ghost text-sm"
                                onClick={() => setCaseId(pid)}
                              >
                                {p.title.length > 44
                                  ? p.title.slice(0, 44) + "…"
                                  : p.title}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {(done || cur) && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.skills
                            .filter((s) => state.skills[s])
                            .map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-1 rounded-full border-2 border-[#2b2620] bg-[#e8f0e4] px-2 py-0.5 text-xs font-bold"
                              >
                                <SkillIcon
                                  icon={SKILL_MAP[s]?.icon}
                                  size={18}
                                  ring={false}
                                />
                                {SKILL_MAP[s]?.name}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* case study (from map) */}
      <AnimatePresence>
        {caseId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(43,38,32,0.6)] p-3 sm:p-6"
          >
            <CaseStudy id={caseId} onClose={() => setCaseId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
