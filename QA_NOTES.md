# The Art of Becoming — consolidated implementation and QA notes

This document consolidates the feedback supplied during the November 2026 review. Items marked **Implemented in this pass** are reflected in the accompanying source changes. Other items remain **design/content work still required** and should not be mistaken for completed features.

## Global experience and navigation
- Keep the retro lo-fi cartoon illustration / 1990s urban nostalgia art direction: textured, hand-drawn, atmospheric, consistent character/background treatment.
- Restore the windowsill opening with journal, flower pot, mug, books and window; zoom into the journal. Original, non-copyrighted background music should continue after the journal.
- Show a central map of all six milestones at opening and between chapters. Completed and currently unlocked milestones can be revisited; future milestones remain locked.
- Add an always-available Open Map control and a Back control. Back should return from a game to its chapter screen, from later games to the previous game, and from chapters to the previous unlocked chapter/map. Replay must not award duplicate balloons or reset progress.
- Chapter/location headers should appear at chapter arrival/title and chapter close, not over active gameplay.
- Use full words, never abbreviations, throughout labels, instructions and navigation.
- Enlarge top navigation controls. Folder/map control should read as Open Map; backpack icon should clearly look like a backpack. Keep icons proportionate to the chapter/progress area.
- Replace tiny progress dots with six balloon markers. A marker highlights when its milestone is completed; visual balloon count must match progression.
- The Skip This Activity control should be larger and placed near the top navigation.
- Keep interactions forgiving on mouse and touch. Drag-and-drop items should follow pointer/finger, highlight valid drop zones, provide feedback and permit retries. Where the game is not a drag game, use clear tap/aim/movement interactions.
- Slow cinematic transitions; avoid abrupt jumps between city chapters.

## Chapter 1 — The Playground
- Use BEL on the society sign, not Sector 7.
- Maintain a continuous illustrated playground environment before and during Pithoo.
- Pithoo: clear instructions and visible aim arrow; drag to aim/power and release to throw. Camera at eye level, directly behind the girl, showing upper torso only and stones ahead. The current Pithoo interaction still needs a visual composition/background redesign.
- Start with one balloon. The next balloon should visibly fly all the way to the girl, attach, and only then show two balloons in her hand. No premature extra balloon.

## Chapter 2 — The School Years
- Preserve the Library Maze gameplay and palette. Improve instruction/text/book overlap, readability, collectible appearance, character/exit distinction and remove distracting background arrows/dark side panels.
- Use “Things We Learnt” in the skill summary.
- No age labels. Do not claim the user spoke/performed at TEDx; they were on the organising team.

## Chapter 3 — Undergraduate Studies
- Use the chapter heading “Undergraduate Studies”; do not use Vivekananda College as the heading.
- Give the campus screen a real illustrated environment; the sign must not float in empty space.
- Show “University of Delhi” clearly on a naturally integrated campus signboard, especially in the on-ground hostel lead-generation game. Do not imply the college itself is the university.
- Observation Room is only a hidden-clue game. Find the objects in a lived-in room; no matching or connecting pairs. Clues should be everyday objects naturally integrated into the room, not floating tokens. Dissertation is evidence after gameplay, not a second puzzle.
- Find Your Audience: slow horizontal camera scroll. Make the student carrying luggage very easy to click with a generous hit area. The gameplay should show scanning Delhi University campuses, identifying outstation students with luggage, approaching them, distributing pamphlets, pitching luxury hostel accommodation, generating leads and converting prospects. Avoid fast reflex play.

## Chapter 4 — The Business School / MBA
- Build the Business: centre the board with balanced left/right padding and use the available vertical space. Shuffle the loose pieces each time; the correct order remains fixed. Use natural human prompts rather than generic jargon.
- Independent Life: retain the line “Managing a household is no less than managing a personal P&L every day.” Keep the ₹15,000 budget counter visible while adding/removing items; show remaining balance live (e.g. an ₹80 lamp changes ₹15,000 to ₹14,920). Fit the game to screen with centred content and balanced padding. Require an explicit Submit before feedback/continuation.
- Launch Plan: plan/timeline on the left and shuffled draggable stage cards on the right simultaneously; stack on mobile.
- Brand Activation Lab: Part A and Part B side-by-side on wide screens, left and right; vertically stack slots and tiles; both activities relate to field experts in physiotherapy clinics promoting Protinex. Shuffle tiles.
- Packaging and WhatsApp chatbot should become one connected activity: fill plain container, finish pack/label, add QR, scan QR and continue into a WhatsApp-style interaction. Use only approved product information.

## Chapter 5 — Emami / Kolkata
- Do not use the current Kolkata background image. Build a recognisable Kolkata neighbourhood market street.
- General Trade: road in the centre, shops on both sides, girl in the street throwing parcels towards designated shopfronts. Show believable kirana shops, counters, shelves, products and signboards.
- Modern Trade: create a real supermarket gondola/shelf environment with horizontal shelves, price strips, product facings and category labels. Drag named/recognisable products to appropriate shelf spaces; do not use colour-only matching.
- Emami experience includes General Trade, Modern Trade, E-commerce and Marketing. Ground evidence in the user's actual experience; do not invent metrics or claims.

## Chapter 6 — Danone / Mumbai
- Transition from Kolkata to Mumbai through the central map, not a direct scene jump.
- Replace Match the Following with Connect the Dots: connect actual projects to capabilities and business outcomes. Examples: Flipkart Minutes Protinex sachet launch → quick-commerce/GTM execution → 54,000 units in under a month across 15 cities; Tata 1mg assortment/visibility → account strategy/retail execution → +61%; Apollo 24x7 campaign → performance marketing → ROAS 9.81; e-pharma content update → PDP optimisation → +200 basis points conversion.
- Campaign Control Room should give contextual hints and a scenario-specific 60% keyword depth / 20% creative rotation / 20% audience and placement optimisation budget allocation.
- Keep real evidence accurate: ~₹30 crore annual NSV across e-pharma accounts, scaled 1.7x in nine months; do not invent missing details.

## Ending and archive
- Crossroads must be a complete illustrated scene with a wooden signpost reading “TO BE” and “NOT TO BE”. Both choices remain selectable; selecting reveals the message; a separate Submit starts the final animation.
- Girl holds one bunch of balloons in one hand; release the whole bunch together; camera follows balloons slowly.
- Ending line: “Always becoming.” Supporting line: “Still curious. Still creating. Still finding new directions.”
- Archive headline recommendation: “A little bit of everything that made me.” Keep Workroom and Trophy Shelf as distinct destinations.
- About & Contact should use four visible tiles: Resume (opens actual CV link), Creative Portfolio (opens a short intro and then the user's existing creative portfolio link), Email (“Get in touch”), Phone Number (“Let's talk”). Do not recreate the CV in the game. Do not show portfolio notes. The user will supply Google Drive CV link, creative portfolio link, email and phone visibility preference/details; do not invent links or contact information.
- Improve trackpad/mouse-wheel/touch scrolling on the archive. Distinguish Back to Journey from Replay Journey and make their destinations genuinely different.

## Implemented in this source pass
- Observation Room matching phase removed; it is now clue-finding only.
- Independent Life budget remaining is calculated live and displayed alongside total spend; budget panel is sticky during scrolling; the game requires explicit submission before the completion overlay.
- Build the Business loose pieces are shuffled at start.
- Chapter 1 sign changed to BEL; undergraduate chapter renamed and University of Delhi sign text used.
- Chapter signpost is hidden during active gameplay.
- Skip control enlarged and moved to the top-right area of the game frame.
- HUD progress pips changed to balloon markers; map milestone entries are now selectable only when completed/current; map selection dispatches chapter navigation; a Back control was added.
- Balloon character count no longer increments before the incoming balloon reaches the girl; the flight target/time was adjusted.
- Archive headline/marquee copy and smooth-wheel settings updated.

## Still outstanding / requires a fuller visual and interaction pass
- Several environments and games still need substantial illustration/layout rebuilds described above (Pithoo, Library Maze, DU campus/lead generation, GT, Modern Trade, activation, packaging/chatbot, crossroads).
- Central map's full illustrated landmark design and map-return-between-chapters sequence need full implementation.
- Some game interactions still need proper pointer-based drag/drop and explicit submit states.
- About & Contact tile links remain placeholders until the user supplies the actual links/contact details.
- Music needs an original soundtrack and a complete audio pass.
- Build/test the full app in Codespaces and manually test mouse, trackpad, keyboard and mobile touch. This pass is not a verified production build.
