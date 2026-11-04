# The Art of Becoming — revision notes

## Changes in this pass
- Corrected the Library Maze collectible map: all six books now sit on actual book tiles in the maze, and the exit remains reachable.
- Removed the extra decorative book marker so the board visibly contains exactly six collectibles.
- Made drag-to-throw pointer handling robust on touchscreens and desktop by capturing the pointer during a drag; leaving the game surface no longer prematurely releases the throw.
- Clarified Pithoo's on-screen instruction so both drag-to-aim and tap-to-hit controls are discoverable.
- Made the two ending signpost choices keyboard-operable as well as clickable.
- Corrected the burst particle shape variation and made Continue from a completed saved journey return to the ending rather than reopening the last chapter.

## Validation
- Parsed all 80 JavaScript/JSX source files with the installed TypeScript parser: no syntax diagnostics.
- Checked all six milestone definitions, all 16 game keys, all game skill IDs, all six book skill IDs, and all evidence references: all resolve.
- Checked the Library Maze graph: all six collectible tiles and the exit are reachable from the start.
- A full production build was **not** completed because project dependencies are not installed in this environment (`craco: not found`). Run `npm install` (or `yarn install`) in `frontend/`, then `npm run build` to perform the full bundler check.
