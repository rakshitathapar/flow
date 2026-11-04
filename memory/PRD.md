# THE ART OF BECOMING — PRD

## Original problem statement
An illustrated, interactive 2D adventure portfolio for Rakshita Thapar. The game IS the portfolio: a girl travels through six life milestones (playground age 5 → school library 13 → Delhi undergrad 18 → IMT Ghaziabad 22 → Emami Kolkata 24–25 → Danone Mumbai 27), plays short forgiving mini-games, collects skill objects into a backpack, gains balloons (XP), reads level-clear summaries with real CV evidence, ends at a TO BE / NOT TO BE signpost where balloons are released into the sky, revealing the full archive (skills ↔ projects connections, workroom case studies, trophy shelf, profile & contact placeholders). Aesthetic mandate: retro lo-fi cartoon meets 90s urban nostalgia — flat saturated fills, thick wobbly ink outlines, per-environment palettes, hand-drawn feel, no generic templates.

## User decisions (from clarification rounds)
- Art: hybrid — AI-painted scene backgrounds (90s lo-fi anime style per user's reference image) + code-drawn SVG character/props/UI (animates, ages, stays consistent).
- Protagonist: black hair, evolving hairstyle (bob → plaits → pony → open → long → long+twist), signature mustard top / red bottoms / red hair-clip, teal backpack.
- Content: single structured content file drives everything (data/*.js) — no code changes needed to edit copy.
- Scope: full end-to-end journey first, polish after review.
- Contact links: clearly-labelled placeholders.

## Architecture
- React (CRA + craco) + Tailwind + framer-motion + lenis (archive smooth scroll). No backend dependency for gameplay; FastAPI template backend untouched (health probe at /api).
- `src/data/` — content spine: `milestones.js` (chapters, games, copy), `skills.js` (60 unique skills, 6 categories), `projects.js` (14 case studies, awards, certifications, profile), `art.js` (scene paintings).
- `src/game/store.js` — reducer + localStorage persistence (milestones, skills with milestone/evidence links, balloons, sound), resume support.
- `src/art/` — Character.js (6 stages, walk cycle, balloon bunch, cat), icons.js (~60 hand-drawn skill icons), filters.js (wobble SVG filters + grain).
- `src/scenes/` — JournalScene (dusk desk → zoom → masked title reveal), MilestoneScene (arrival walk + storybook caption + title card + game + balloon + summary), WalkScene (parallax walk), EndingScene (signpost choice → balloon release → final copy).
- `src/games/` — kit.js (AimThrow tap/drag, bursts, pips) + M1–M6: 16 mini-games (Pithoo, Library Maze, Observation Room, Find Your Audience, Build the Business, Independent Life, Launch Board, Last-Mile, Perfect Shelf, Spot the Difference, Activation Lab, Packaging Studio, 28-Day Journey, Campaign Room, Business Control Room, Connect the Dots).
- `src/ui/` — HUD (progress pips, balloon XP, evidence map, sound, pause), BackpackDrawer, Summary, Evidence/CaseStudy, GameShell, SkillFly.
- `src/archive/Archive.js` — final archive: skills grouped People/Thinking/Strategy/Marketing/Digital/Execution with evidence connections; workroom (7 categories, BRIEF/THINKING/WORK/OUTCOME/ROLE/SKILLS/SUPPORTING); trophy shelf + certifications; profile & contact placeholders; editorial marquee.

## Implemented (Nov 2025 build)
- Cinematic opening (rebuilt to user's spec): dusk room → slow zoom into the journal → overhead journal-page (hand-drawn doodle map of the whole journey) with the title lettered on the page → deep-dive into the page → plain minimal world seen from BEHIND the girl (back-view character: hair, backpack, no face) → red balloon drifts down from the sky and attaches to her wrist → she walks ahead with fading footsteps along a winding dotted path while the three central-thought captions drift through → crossfade into the playground arrival.
- Full 6-chapter journey, all 16 mini-games playable + skippable, never stuck (tap-to-throw Pithoo with guaranteed 3rd-throw hit, queue-based maze walking, hint system, visible halos).
- Progression: skills dedupe + merge evidence links; balloons 1→7; localStorage save/resume ("continue your journey" on the journal desk + title screen).
- Ending: signpost → playful response → camera pans up, balloons float away → "Still figuring it out. Still becoming." → archive.
- Mobile-first verified at 390×844 (no horizontal overflow), desktop at 1440×900.
- Audio: original synthesized placeholder SFX + optional generative music, independent volume controls, starts only after interaction.

## Fixes applied after first user review
1. Pithoo: tap-to-throw (tap stones → ball flies, generous tolerance, guaranteed hit on 3rd throw).
2. Journal art: repainted — grown-up dusk city desk, blank pages (also removes an AI-scrawled name the user disliked).
3. Pacing: journal zoom 2.6s, arrival walk 6.4s with storybook caption, walks 7.8s, balloon flight 2.6s, slower reveals.
4. Character: matured proportions (smaller head, longer limbs), slower subtle walk cycle, quieter faces after childhood.
5. Observation room: always-visible halos, hint button, clear selection + connect feedback.

## Prioritized backlog
- P0 (user input needed): fill placeholder fields in `data/projects.js` (dissertation methodology/findings, internship org/numbers, leadership details, contact links, ₹3 Cr budget attribution).
- P1: real background music + recorded SFX (architecture ready — swap `game/audio.js`); reference-image-driven art pass on any scene; more Delhi summer heat haze in Find Your Audience.
- P2: share/save code export; downloadable PDF resume from archive; per-scene ambient loops; Replay individual chapters from the map.
