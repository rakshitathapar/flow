import React from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../data/projects";
import { SKILL_MAP } from "../data/skills";
import { SkillIcon } from "../art/icons";

const isPlaceholder = (t) => typeof t === "string" && t.trim().startsWith("⟂");

function Field({ label, text }) {
  return (
    <div
      className="mt-3"
      data-testid={`case-field-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
    >
      <div className="font-display font-extrabold text-sm uppercase tracking-wide text-[#7a4a3a]">
        {label}
      </div>
      <p
        className={`font-body text-[15px] sm:text-base leading-relaxed mt-1 ${isPlaceholder(text) ? "placeholder-edit" : ""}`}
      >
        {text}
      </p>
    </div>
  );
}

export function CaseStudy({ id, onClose }) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return null;
  return (
    <motion.div
      initial={{ y: 60, rotate: 1.4 }}
      animate={{ y: 0, rotate: -0.4 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
      className="paper-card nice-scroll w-full max-w-2xl max-h-[88vh] overflow-y-auto p-5 sm:p-7"
      data-testid={`case-study-${p.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-hand text-xl text-[#7a4a3a]">{p.kind}</div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight">
            {p.title}
          </h3>
          <div className="font-body font-bold text-[#4a4238] mt-1">{p.org}</div>
        </div>
        <button
          data-testid={`case-close-${p.id}`}
          className="btn-ghost shrink-0"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {p.metric && (
        <div
          className="ink-border mt-4 inline-block bg-[#e8a33d] px-3 py-1.5 font-display font-extrabold text-sm sm:text-base"
          style={{ transform: "rotate(-0.7deg)" }}
          data-testid={`case-metric-${p.id}`}
        >
          {p.metric}
        </div>
      )}

      <div className="mt-2">
        <Field label="The brief" text={p.brief} />
        <Field label="The thinking" text={p.thinking} />
        <Field label="The work" text={p.work} />
        <Field label="The outcome" text={p.outcome} />
        <Field label="My role" text={p.role} />
        {(p.extra || []).map((x) => (
          <Field key={x.label} label={x.label} text={x.text} />
        ))}
      </div>

      <div className="mt-4">
        <div className="font-display font-extrabold text-sm uppercase tracking-wide text-[#7a4a3a]">
          Skills demonstrated
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(p.skills || []).map(
            (s) =>
              SKILL_MAP[s] && (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#2b2620] bg-[#e8f0e4] px-2.5 py-1 text-sm font-bold"
                  data-testid={`case-skill-${s}`}
                >
                  <SkillIcon icon={SKILL_MAP[s].icon} size={20} ring={false} />
                  {SKILL_MAP[s].name}
                </span>
              ),
          )}
        </div>
      </div>
      <p className="font-hand text-lg text-[#6b5d49] mt-4">
        Everything in dashed boxes is yours to fill in — nothing here is
        invented.
      </p>
    </motion.div>
  );
}

export function EvidenceCard({ id, onOpen }) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return null;
  return (
    <div
      className="ink-border bg-[#fdf6e9] p-3.5 text-left"
      style={{ transform: "rotate(-0.4deg)" }}
      data-testid={`evidence-card-${p.id}`}
    >
      <div className="font-hand text-lg text-[#7a4a3a] leading-tight">
        {p.kind}
      </div>
      <div className="font-display font-extrabold leading-snug">{p.title}</div>
      <p className="font-body text-[15px] text-[#4a4238] mt-1">{p.oneLiner}</p>
      {p.metric && (
        <div className="mt-2 font-display font-extrabold text-sm text-[#c74a3c]">
          {p.metric}
        </div>
      )}
      <button
        data-testid={`evidence-open-${p.id}`}
        className="btn-ghost mt-2.5 text-sm"
        onClick={() => onOpen(p.id)}
      >
        Read more
      </button>
    </div>
  );
}
