import React from "react";
import "./App.css";
import { GameProvider, useGame } from "@/game/store";
import { InkFilters, Grain } from "@/art/filters";
import JournalScene from "@/scenes/JournalScene";
import WalkScene from "@/scenes/WalkScene";
import MilestoneScene from "@/scenes/MilestoneScene";
import EndingScene from "@/scenes/EndingScene";
import Archive from "@/archive/Archive";
import HUD from "@/ui/HUD";
import BackpackDrawer from "@/ui/BackpackDrawer";
import SkillFly from "@/ui/SkillFly";
import { SKILL_MAP } from "@/data/skills";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) {
    return { err };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#f7f0e3]">
          <div
            className="paper-card p-6 max-w-md text-center"
            style={{ transform: "rotate(-0.6deg)" }}
          >
            <div className="font-display text-2xl font-extrabold">
              The journal snapped shut.
            </div>
            <p className="font-body mt-2">
              Something went wrong — reload to pick the journey back up where
              you left it.
            </p>
            <button
              className="btn-hand btn-red mt-4"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function GameRoot() {
  const { state, dispatch } = useGame();
  const flying = state.pendingSkills.map((id) => ({ id, ...SKILL_MAP[id] }));

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#f7f0e3]">
      {state.phase === "journal" && <JournalScene />}
      {state.phase === "walk" && <WalkScene />}
      {state.phase === "scene" && <MilestoneScene />}
      {state.phase === "ending" && <EndingScene />}
      {state.phase === "archive" && (
        <div className="absolute inset-0 overflow-y-auto nice-scroll">
          <Archive />
        </div>
      )}
      <SkillFly
        skills={flying}
        onDone={() => dispatch({ type: "COLLECTED" })}
      />
      <HUD />
      <BackpackDrawer />
      <InkFilters />
      <Grain />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameRoot />
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
