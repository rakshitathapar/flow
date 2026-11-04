import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { MILESTONES } from "../data/milestones";
import { SKILL_MAP } from "../data/skills";
import { PROJECTS } from "../data/projects";
import { sfx } from "./audio";

const SAVE_KEY = "art-of-becoming-save-v1";

const initialState = {
  phase: "journal", // journal | scene | walk | ending | archive
  mi: 0, // current milestone index
  gi: 0, // current game index within milestone
  stage: "arrive", // arrive | title | game | collect | balloon | summary
  walkArt: null, // art key used during walk transition
  completed: [], // milestone ids
  skills: {}, // id -> { milestones: [mid], evidence: [pid] }
  balloons: 1,
  pendingSkills: [],
  balloonPending: false,
  endingChoice: null,
  sound: { music: false, sfx: 0.7 },
  panels: {
    backpack: false,
    evidence: null,
    map: false,
    pause: false,
    sound: false,
  },
  hydrated: false,
};

function collect(state, skillIds) {
  const ms = MILESTONES[state.mi];
  const skills = { ...state.skills };
  skillIds.forEach((id) => {
    if (!SKILL_MAP[id]) return;
    const cur = skills[id] || { milestones: [], evidence: [] };
    const milestones = cur.milestones.includes(ms.id)
      ? cur.milestones
      : [...cur.milestones, ms.id];
    const evidence = [...cur.evidence];
    (ms.evidence || []).forEach((pid) => {
      const p = PROJECTS.find((pr) => pr.id === pid);
      if (p && p.skills && p.skills.includes(id) && !evidence.includes(pid))
        evidence.push(pid);
    });
    skills[id] = { milestones, evidence };
  });
  return skills;
}

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return {
        ...state,
        ...action.save,
        hydrated: true,
        phase: "journal",
        panels: { ...initialState.panels },
        pendingSkills: [],
        balloonPending: false,
      };
    case "ENTER_WORLD":
      return {
        ...state,
        phase: "scene",
        mi: 0,
        gi: 0,
        stage: "arrive",
        skipWalk: !!action.skipWalk,
      };
    case "RESUME":
      return {
        ...state,
        phase:
          state.completed.length >= MILESTONES.length ? "ending" : "scene",
        stage: "title",
        panels: { ...initialState.panels },
      };
    case "STAGE":
      return { ...state, stage: action.stage };
    case "ARRIVE_DONE":
      return { ...state, stage: "title", skipWalk: false };
    case "PLAY_GAME":
      return { ...state, stage: "game" };
    case "GAME_DONE": {
      const ms = MILESTONES[state.mi];
      const last = state.gi >= ms.games.length - 1;
      return {
        ...state,
        stage: "collect",
        pendingSkills: action.skills || ms.games[state.gi].skills,
        nextAfterCollect: last ? "balloon" : "nextGame",
      };
    }
    case "COLLECTED": {
      const skills = collect(state, state.pendingSkills);
      if (state.nextAfterCollect === "nextGame")
        return {
          ...state,
          skills,
          pendingSkills: [],
          gi: state.gi + 1,
          stage: "title",
        };
      return {
        ...state,
        skills,
        pendingSkills: [],
        balloonPending: true,
        stage: "balloon",
      };
    }
    case "BALLOON_DONE": {
      const ms = MILESTONES[state.mi];
      return {
        ...state,
        balloons: state.balloons + 1,
        balloonPending: false,
        completed: state.completed.includes(ms.id)
          ? state.completed
          : [...state.completed, ms.id],
        stage: "summary",
      };
    }
    case "SUMMARY_CONTINUE": {
      const last = state.mi >= MILESTONES.length - 1;
      if (last) return { ...state, phase: "ending", stage: "arrive" };
      return {
        ...state,
        phase: "walk",
        walkArt: MILESTONES[state.mi + 1].art,
        stage: "arrive",
        gi: 0,
      };
    }
    case "WALK_DONE":
      return {
        ...state,
        phase: "scene",
        mi: state.mi + 1,
        gi: 0,
        stage: "arrive",
        walkArt: null,
      };
    case "GO_TO_MILESTONE":
      return {
        ...state,
        phase: "scene",
        mi: action.index,
        gi: 0,
        stage: "title",
        walkArt: null,
        skipWalk: false,
        panels: { ...initialState.panels },
      };
    case "BACK_SCREEN":
      if (state.phase === "scene" && state.stage === "game")
        return { ...state, stage: "title" };
      if (state.phase === "scene" && state.stage === "title" && state.gi > 0)
        return { ...state, gi: state.gi - 1, stage: "title" };
      if (state.phase === "scene" && state.mi > 0)
        return { ...state, mi: state.mi - 1, gi: 0, stage: "title" };
      return state;
    case "END_CHOICE":
      return { ...state, endingChoice: action.choice };
    case "RELEASE_BALLOONS":
      return { ...state, stage: "released" };
    case "OPEN_ARCHIVE":
      return { ...state, phase: "archive", panels: { ...initialState.panels } };
    case "BACK_TO_JOURNEY":
      return {
        ...state,
        phase: state.completed.length >= MILESTONES.length ? "ending" : "scene",
        panels: { ...initialState.panels },
      };
    case "TOGGLE_PANEL": {
      const key = action.key;
      return {
        ...state,
        panels: {
          ...initialState.panels,
          [key]: state.panels[key] ? null : action.value || true,
        },
      };
    }
    case "SET_PANEL": {
      return {
        ...state,
        panels: { ...initialState.panels, [action.key]: action.value },
      };
    }
    case "SET_SOUND":
      return { ...state, sound: { ...state.sound, ...action.value } };
    case "SKIP_TO_ARCHIVE":
      return { ...state, phase: "archive", panels: { ...initialState.panels } };
    case "RESTART":
      try {
        localStorage.removeItem(SAVE_KEY);
      } catch (e) {}
      return { ...initialState, hydrated: true, sound: state.sound };
    default:
      return state;
  }
}

const GameCtx = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let save = null;
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) save = JSON.parse(raw);
    } catch (e) {}
    dispatch({ type: "HYDRATE", save: save || {} });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const { phase, mi, gi, completed, skills, balloons, endingChoice, sound } =
      state;
    try {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({
          mi,
          gi,
          completed,
          skills,
          balloons,
          endingChoice,
          sound,
          hasPlayed: phase !== "journal",
        }),
      );
    } catch (e) {}
  }, [state]);

  // resume point for "continue"
  const hasSave = useMemo(
    () =>
      state.completed.length > 0 ||
      state.balloons > 1 ||
      (state.skills && Object.keys(state.skills).length > 0),
    [state],
  );

  const value = useMemo(() => ({ state, dispatch, hasSave }), [state, hasSave]);
  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
}

export const useGame = () => useContext(GameCtx);

// award skills helper (plays a chime too)
export function completeGame(dispatch, extraSkills) {
  sfx("success");
  dispatch({ type: "GAME_DONE", skills: extraSkills });
}
