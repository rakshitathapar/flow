import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DoneOverlay, ProgressPips } from "./kit";
import { BOOKS } from "../data/milestones";
import { SKILL_MAP } from "../data/skills";
import { sfx } from "../game/audio";

// MILESTONE 2 — The Library Maze. Tap a tile; she walks there herself (BFS).

const W = 9,
  H = 7;
// S = start, X = shelf/blocked, . = aisle, B = book, E = exit
const GRID = [
  "S.X...B.X",
  "..X.XX...",
  "B...B..X.",
  ".XXX...B.",
  "...X.XX..",
  "B.XX...B.",
  "..X.....E",
].map((r) => r.split(""));

const bookAt = (x, y) =>
  BOOKS.find((_, i) => {
    // Keep every collectible on a real book tile (B) in GRID.
    const spots = [
      [0, 6],
      [2, 0],
      [2, 4],
      [3, 7],
      [5, 0],
      [5, 7],
    ];
    return spots[i] && spots[i][0] === y && spots[i][1] === x;
  });

export function LibraryMaze({ onDone }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [found, setFound] = useState([]);
  const [moving, setMoving] = useState(false);
  const [toast, setToast] = useState(null);
  const [done, setDone] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const queue = useRef([]);
  const want = useRef(null);

  const allFound = found.length >= BOOKS.length;

  useEffect(() => {
    if (allFound) {
      sfx("chime");
      setExitOpen(true);
    }
  }, [allFound]);

  const bfs = (from, to) => {
    const seen = new Set([`${from.x},${from.y}`]);
    const q = [{ ...from, path: [] }];
    while (q.length) {
      const c = q.shift();
      if (c.x === to.x && c.y === to.y) return c.path;
      [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].forEach(([dx, dy]) => {
        const nx = c.x + dx,
          ny = c.y + dy;
        if (
          nx < 0 ||
          ny < 0 ||
          nx >= W ||
          ny >= H ||
          seen.has(`${nx},${ny}`) ||
          GRID[ny][nx] === "X"
        )
          return;
        seen.add(`${nx},${ny}`);
        q.push({ x: nx, y: ny, path: [...c.path, { x: nx, y: ny }] });
      });
    }
    return null;
  };

  useEffect(() => {
    const t = setInterval(() => {
      if (!queue.current.length) {
        if (
          want.current &&
          (want.current.x !== pos.x || want.current.y !== pos.y)
        ) {
          const path = bfs(pos, want.current);
          want.current = null;
          if (path && path.length) {
            queue.current = path;
            setMoving(true);
          } else setMoving(false);
        } else {
          setMoving(false);
        }
        return;
      }
      const next = queue.current.shift();
      setPos(next);
      sfx("step");
      const b = bookAt(next.x, next.y);
      if (b && !found.includes(b.id)) {
        sfx("pop");
        setFound((f) => {
          if (!f.includes(b.id)) {
            setToast(b);
            setTimeout(() => setToast(null), 1800);
            return [...f, b.id];
          }
          return f;
        });
      }
      if (
        next.x === W - 1 &&
        next.y === H - 1 &&
        found.length + (b && !found.includes(b.id) ? 1 : 0) >= BOOKS.length
      ) {
        setDone(true);
        queue.current = [];
        want.current = null;
      }
    }, 240);
    return () => clearInterval(t);
  }, [pos, exitOpen, found]);

  const walkTo = (x, y) => {
    if (done || GRID[y][x] === "X") return;
    sfx("click");
    want.current = { x, y };
  };

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-2"
      style={{ background: "#1d3a3a" }}
    >
      <div className="w-full max-w-2xl">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
          <ProgressPips
            total={BOOKS.length}
            done={found.length}
            label="books"
          />
          <span className="font-hand text-lg text-[#a8c8b8]">
            {allFound
              ? "the exit is open — walk out!"
              : "tap a tile to walk there"}
          </span>
        </div>

        <div
          className="ink-border overflow-hidden bg-[#26403c] p-1.5"
          data-testid="maze-board"
        >
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${W},1fr)` }}
          >
            {GRID.flatMap((row, y) =>
              row.map((c, x) => {
                const isBook = bookAt(x, y);
                const hasBook = isBook && !found.includes(isBook.id);
                const isExit = x === W - 1 && y === H - 1;
                return (
                  <button
                    key={`${x}-${y}`}
                    data-testid={`maze-tile-${x}-${y}`}
                    onClick={() => walkTo(x, y)}
                    className="relative aspect-square border border-[#1a2f2c]"
                    style={{
                      background:
                        c === "X"
                          ? "#3a2c22"
                          : (x + y) % 2
                            ? "#d9c9a8"
                            : "#cdbb96",
                      cursor: c === "X" ? "not-allowed" : "pointer",
                      boxShadow:
                        exitOpen && isExit
                          ? "0 0 0 3px #e8a33d inset"
                          : undefined,
                    }}
                  >
                    {c === "X" && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "repeating-linear-gradient(90deg,#c74a3c 0 14%,#e8a33d 14% 26%,#4a7fb5 26% 40%,#5a9e6f 40% 52%,#7b5ea7 52% 66%,#d9768f 66% 80%,#2a7f79 80% 100%)",
                            backgroundSize: "80% 100%",
                            backgroundPosition: `center`,
                            marginTop: "12%",
                            height: "76%",
                          }}
                        />
                        <div className="absolute inset-x-0 top-0 h-[14%] bg-[#7a5c3e]" />
                      </div>
                    )}
                    {hasBook && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="62%"
                          height="62%"
                          viewBox="0 0 24 24"
                          className="anim-bob-sm"
                        >
                          <g>
                            <rect
                              x="4"
                              y="3"
                              width="16"
                              height="18"
                              rx="2"
                              fill={isBook.hue}
                              stroke="#2b2620"
                              strokeWidth="2.4"
                            />
                            <path
                              d="M8 7h8M8 11h6"
                              stroke="#fdf6e9"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </g>
                        </svg>
                      </span>
                    )}
                    {exitOpen && isExit && (
                      <span
                        className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-[#2b2620]"
                        style={{ background: "#e8a33d" }}
                      >
                        EXIT
                      </span>
                    )}
                    {pos.x === x && pos.y === y && (
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg width="80%" height="80%" viewBox="0 0 24 24">
                          <circle
                            cx="12"
                            cy="9"
                            r="5.5"
                            fill="#f2b58c"
                            stroke="#2b2620"
                            strokeWidth="2.4"
                          />
                          <path
                            d="M6 21c0-4 2.6-6.5 6-6.5s6 2.5 6 6.5"
                            fill="#e8a33d"
                            stroke="#2b2620"
                            strokeWidth="2.4"
                          />
                          <path
                            d="M8 7q4-3 8 0"
                            fill="none"
                            stroke="#2b2620"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              }),
            )}
          </div>
        </div>
      </div>

      {toast && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          className="paper-card fixed bottom-16 left-1/2 z-40 -translate-x-1/2 px-4 py-2 text-center"
          data-testid="maze-book-toast"
        >
          <div className="font-hand text-xl text-[#c74a3c]">
            Collected: {toast.title}
          </div>
          <div className="font-body text-sm font-bold">
            {SKILL_MAP[toast.skill].name} → backpack
          </div>
        </motion.div>
      )}

      {done && (
        <DoneOverlay
          title="Six books, one full bag."
          line="Curiosity, observation, communication, creativity, public speaking and structured thinking — packed."
          onContinue={onDone}
        />
      )}
    </div>
  );
}
