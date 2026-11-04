import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "../game/audio";

// Frames every mini-game: hand-lettered header, how-to card, forgiving skip.

export default function GameShell({ game, children, onSkip }) {
  const [howto, setHowto] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 flex flex-col"
      data-testid={`game-shell-${game.id}`}
    >
      <div className="shrink-0 px-3 pt-[62px] sm:px-5 sm:pt-[60px]">
        <div
          className="paper-card mx-auto flex max-w-3xl items-center gap-3 px-4 py-2"
          style={{ transform: "rotate(-0.4deg)" }}
        >
          <div className="min-w-0 flex-1">
            <div className="font-display text-lg sm:text-2xl font-extrabold leading-tight">
              {game.title}
            </div>
            <div className="font-hand text-base sm:text-lg text-[#7a4a3a] leading-tight">
              {game.tagline}
            </div>
          </div>
          <button
            data-testid={`game-howto-${game.id}`}
            className="btn-ghost text-sm shrink-0"
            onClick={() => setHowto(true)}
          >
            How?
          </button>
        </div>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
      <div className="shrink-0 pb-2 pt-1 text-center">
        <button
          data-testid={`game-skip-${game.id}`}
          className="font-hand text-lg text-[#6b5d49] underline decoration-dotted hover:text-[#c74a3c]"
          onClick={() => {
            sfx("page");
            onSkip && onSkip();
          }}
        >
          skip this activity
        </button>
      </div>
      <AnimatePresence>
        {howto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center bg-[rgba(43,38,32,0.35)] p-4 sm:items-center"
          >
            <motion.div
              initial={{ y: 60, rotate: 1.5 }}
              animate={{ y: 0, rotate: -0.8 }}
              transition={{ type: "spring", stiffness: 180, damping: 17 }}
              className="paper-card max-w-md p-6"
              data-testid={`game-howto-card-${game.id}`}
            >
              <div className="font-hand text-2xl text-[#c74a3c]">
                How to play
              </div>
              <div className="font-display text-xl sm:text-2xl font-extrabold mt-1">
                {game.title}
              </div>
              <p className="mt-3 font-body text-base sm:text-lg leading-relaxed">
                {game.how}
              </p>
              <button
                data-testid={`game-begin-${game.id}`}
                className="btn-hand btn-red mt-5 text-lg w-full justify-center"
                onClick={() => {
                  sfx("page");
                  setHowto(false);
                }}
              >
                Let's go
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
