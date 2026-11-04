import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useGame } from "../game/store";
import { MILESTONES } from "../data/milestones";
import { ART } from "../data/art";
import { Character } from "../art/Character";
import { sfx } from "../game/audio";

// Side-scrolling walk between milestones — girl walks in place, the world pans past.

export default function WalkScene() {
  const { state, dispatch } = useGame();
  const next = MILESTONES[state.mi + 1];

  useEffect(() => {
    sfx("step");
    const t = setTimeout(() => dispatch({ type: "WALK_DONE" }), 7800);
    const steps = setInterval(() => sfx("step"), 850);
    return () => {
      clearTimeout(t);
      clearInterval(steps);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#f7f0e3]"
      data-testid="walk-scene"
      onClick={() => dispatch({ type: "WALK_DONE" })}
    >
      {/* panning painted world */}
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{
          width: "170%",
          backgroundImage: `url(${ART[next.art]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ x: "0%" }}
        animate={{ x: "-34%" }}
        transition={{ duration: 8, ease: "linear" }}
      />
      {/* foreground strip for parallax depth */}
      <motion.svg
        className="absolute bottom-0 left-0 h-[26%]"
        style={{ width: "260%" }}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        initial={{ x: "0%" }}
        animate={{ x: "-55%" }}
        transition={{ duration: 6.4, ease: "linear" }}
      >
        <g className="wobble-sm">
          <path
            d="M0 100 L0 70 Q 40 40 80 68 Q 130 30 180 66 Q 240 34 300 70 L 300 100 Z"
            fill="#2b2620"
            opacity="0.85"
          />
          <path
            d="M330 100 L330 74 Q 380 44 430 72 Q 490 38 550 70 Q 610 40 670 72 L 670 100 Z"
            fill="#2b2620"
            opacity="0.85"
          />
          <path
            d="M700 100 L700 72 Q 760 42 820 70 Q 880 36 940 70 Q 1000 42 1060 72 L 1060 100 Z"
            fill="#2b2620"
            opacity="0.85"
          />
        </g>
      </motion.svg>

      {/* the girl, walking */}
      <div className="absolute bottom-[10%] left-[16%] sm:left-[22%]">
        <Character
          stage={state.mi}
          walking
          balloons={state.balloons}
          width={120}
          className="drop-shadow-[0_6px_0_rgba(43,38,32,0.25)]"
        />
      </div>

      <div className="absolute bottom-5 inset-x-0 text-center">
        <span className="font-hand text-2xl text-[#fdf6e9] drop-shadow-[0_2px_0_rgba(43,38,32,0.9)]">
          walking to {next.place} — tap to hurry
        </span>
      </div>
    </div>
  );
}
