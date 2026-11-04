import React from "react";
import { motion } from "framer-motion";

// Skill icons fly from the centre of the screen into the backpack (top-right).

export default function SkillFly({ skills, onDone }) {
  React.useEffect(() => {
    if (!skills.length) return;
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [skills]);
  if (!skills.length) return null;
  const tx = () =>
    typeof window !== "undefined" ? window.innerWidth - 74 : 300;
  const ty = () => (typeof window !== "undefined" ? 34 : 30);
  return (
    <div
      className="fixed inset-0 z-[90] pointer-events-none"
      data-testid="skill-fly-overlay"
    >
      {skills.map((s, i) => (
        <motion.div
          key={s.id}
          className="absolute left-1/2 top-1/2"
          initial={{
            x: "-50%",
            y: "-50%",
            scale: 2.1,
            rotate: i * 8 - 4,
            opacity: 0,
          }}
          animate={{
            x: `${tx()}px`,
            y: `${ty()}px`,
            scale: 0.55,
            rotate: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.25 + i * 0.22,
            duration: 0.85,
            ease: [0.3, 0.9, 0.4, 1.1],
          }}
        >
          <div className="paper-card p-1" style={{ borderRadius: "50%" }}>
            {s.icon && <SkillIconLazy icon={s.icon} size={52} />}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// lazy circular import guard
import SkillIcon from "../art/icons";
function SkillIconLazy(props) {
  return <SkillIcon {...props} />;
}
