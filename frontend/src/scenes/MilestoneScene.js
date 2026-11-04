import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../game/store";
import { MILESTONES } from "../data/milestones";
import { ART } from "../data/art";
import { Character, Cat } from "../art/Character";
import { sfx } from "../game/audio";
import GameShell from "../ui/GameShell";
import Summary from "../ui/Summary";
import { Burst } from "../games/kit";

import Pithoo from "../games/M1";
import { LibraryMaze } from "../games/M2";
import { ObservationRoom, FindAudience } from "../games/M3";
import { BuildBusiness, IndependentLife, LaunchBoard } from "../games/M4";
import {
  LastMile,
  PerfectShelf,
  SpotDifference,
  BuildActivation,
} from "../games/M5";
import {
  PackStudio,
  ChatbotJourney,
  CampaignRoom,
  BizRoom,
  ConnectDots,
} from "../games/M6";

export const GAME_COMPONENTS = {
  pithoo: Pithoo,
  maze: LibraryMaze,
  observation: ObservationRoom,
  "find-audience": FindAudience,
  "build-business": BuildBusiness,
  "independent-life": IndependentLife,
  "launch-board": LaunchBoard,
  "last-mile": LastMile,
  "perfect-shelf": PerfectShelf,
  "spot-difference": SpotDifference,
  "build-activation": BuildActivation,
  "pack-studio": PackStudio,
  "chatbot-journey": ChatbotJourney,
  "campaign-room": CampaignRoom,
  "biz-room": BizRoom,
  "connect-dots": ConnectDots,
};

export default function MilestoneScene() {
  const { state, dispatch } = useGame();
  const ms = MILESTONES[state.mi];
  const game = ms.games[state.gi];
  const GameComp = GAME_COMPONENTS[game.key];
  const [girlX, setGirlX] = useState(false);
  const [balloonIn, setBalloonIn] = useState(false);

  // arrival walk — unhurried, with a storybook caption
  useEffect(() => {
    if (state.stage !== "arrive") return;
    if (state.skipWalk) {
      setGirlX(true);
      const d = setTimeout(() => dispatch({ type: "ARRIVE_DONE" }), 4400);
      return () => clearTimeout(d);
    }
    const t = setTimeout(() => {
      setGirlX(true);
      sfx("step");
    }, 500);
    const walkT = setInterval(() => sfx("step"), 850);
    const done = setTimeout(() => dispatch({ type: "ARRIVE_DONE" }), 6400);
    return () => {
      clearTimeout(t);
      clearTimeout(done);
      clearInterval(walkT);
    };
  }, [state.stage, state.mi]);

  // balloon arrival animation
  useEffect(() => {
    if (state.stage !== "balloon" || !state.balloonPending) return;
    sfx("balloon");
    setBalloonIn(true);
    const t = setTimeout(() => dispatch({ type: "BALLOON_DONE" }), 3800);
    return () => clearTimeout(t);
  }, [state.stage, state.balloonPending]);

  const isFirst = state.mi === 0;

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#f7f0e3]"
      data-testid={`milestone-scene-${ms.id}`}
    >
      {/* painted environment with gentle parallax */}
      <motion.div
        className="scene-bg"
        style={{ backgroundImage: `url(${ART[ms.art]})` }}
        animate={{ scale: 1.08, x: "0%" }}
        transition={{ duration: 2 }}
      />

      {/* signpost painted into scene */}
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="300" height="86" viewBox="0 0 300 86" className="wobble-sm">
          <path
            d="M 150 84 L 154 34"
            stroke="#2b2620"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 8 14 h 250 l 16 14 -16 14 H 8 Z"
            fill="#e8a33d"
            stroke="#2b2620"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <text
            x="136"
            y="33"
            textAnchor="middle"
            fontFamily="Shantell Sans"
            fontWeight="800"
            fontSize="17"
            fill="#2b2620"
          >
            {ms.sign}
          </text>
        </svg>
      </div>

      {/* the girl */}
      <motion.div
        className="absolute bottom-[7%]"
        initial={{ left: state.skipWalk ? "34%" : "-14%" }}
        animate={{ left: girlX ? "34%" : "-14%" }}
        transition={{ duration: 5.6, ease: "easeInOut" }}
      >
        <Character
          stage={state.mi}
          walking={state.stage === "arrive"}
          balloons={state.balloons + (balloonIn ? 1 : 0)}
          width={150}
          className="drop-shadow-[0_8px_0_rgba(43,38,32,0.22)]"
        />
      </motion.div>

      {/* chapter cat appears in chapter one */}
      {isFirst && state.stage === "arrive" && (
        <motion.div
          className="absolute bottom-[6%] left-[52%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <Cat width={62} />
        </motion.div>
      )}

      {/* balloon flight-in */}
      {state.stage === "balloon" && (
        <motion.div
          className="absolute z-20"
          initial={{ top: "-12%", left: "78%", opacity: 0 }}
          animate={{ top: "52%", left: "52%", opacity: 1 }}
          transition={{ duration: 2.6, ease: "easeInOut" }}
        >
          <svg width="72" height="100" viewBox="0 0 72 100">
            <g className="wobble-sm">
              <ellipse
                cx="36"
                cy="34"
                rx="26"
                ry="31"
                fill="#e8a33d"
                stroke="#2b2620"
                strokeWidth="5"
              />
              <path
                d="M30 64 l6 8 6 -8z"
                fill="#e8a33d"
                stroke="#2b2620"
                strokeWidth="4"
              />
              <path
                d="M36 72 q -8 14 0 26"
                fill="none"
                stroke="#2b2620"
                strokeWidth="3"
              />
            </g>
          </svg>
        </motion.div>
      )}
      {state.stage === "balloon" && (
        <div className="absolute inset-0 z-10">
          <Burst />
        </div>
      )}

      {/* storybook caption while she walks in */}
      {state.stage === "arrive" && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute inset-x-0 bottom-4 z-20 flex justify-center px-4 pointer-events-none"
          data-testid="arrival-caption"
        >
          <div
            className="paper-card px-4 py-2.5 max-w-md text-center"
            style={{ transform: "rotate(-0.4deg)" }}
          >
            <div className="font-hand text-xl text-[#c74a3c] leading-tight">
              Chapter {ms.n} · {ms.place}
            </div>
            <p className="font-body text-[15px] sm:text-base leading-snug text-[#4a4238]">
              {ms.arrival}
            </p>
          </div>
        </motion.div>
      )}

      {/* title card */}
      <AnimatePresence>
        {state.stage === "title" && (
          <motion.div
            key={`title-${state.mi}-${state.gi}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-30 flex items-end justify-center p-4 sm:items-center"
            data-testid="milestone-title-card"
          >
            <motion.div
              initial={{ rotate: 2 }}
              animate={{ rotate: -0.8 }}
              className="paper-card w-full max-w-lg p-6 mb-6"
            >
              <div className="font-hand text-2xl text-[#c74a3c]">
                Chapter {ms.n} · {ms.place}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">
                {ms.title.toUpperCase()}
              </h2>
              <p className="font-body text-base sm:text-lg mt-2 text-[#4a4238] leading-relaxed">
                {ms.intro}
              </p>
              <div className="ink-border mt-4 bg-[#e8f0e4] p-3">
                <div className="font-display font-extrabold">
                  Next up: {game.title}
                </div>
                <div className="font-hand text-lg text-[#7a4a3a]">
                  {game.tagline}
                </div>
              </div>
              <button
                data-testid="milestone-play-button"
                className="btn-hand btn-red mt-5 text-xl w-full justify-center"
                onClick={() => {
                  sfx("chime");
                  dispatch({ type: "PLAY_GAME" });
                }}
              >
                Play — {game.title}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the mini-game */}
      <AnimatePresence>
        {state.stage === "game" && (
          <GameShell
            key={`game-${game.id}`}
            game={game}
            onSkip={() => dispatch({ type: "GAME_DONE" })}
          >
            <GameComp onDone={() => dispatch({ type: "GAME_DONE" })} />
          </GameShell>
        )}
      </AnimatePresence>

      {state.stage === "summary" && <Summary />}
    </div>
  );
}
