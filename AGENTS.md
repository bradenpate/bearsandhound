# Prototype Instructions

## Design direction agreed October 30, 2026

Keep all existing content, artwork, routes, and fonts. Improve the design through warm paper backgrounds, a tighter homepage composition, subtle illustration hover/press interactions, cookbook-style recipe layouts, refined typography, and photo-album treatments for the existing memories. Respect reduced motion and retain clear keyboard focus. This is a local design preview; publishing is a separate request.

Recipe pages should flow directly from the introduction into the ingredients and method. Omit ingredient/method jump links and the print button; the user prefers the simpler layout.

The user identifies the Loaves & Fishes cookbook as an inspiration for the font, name, and overall look of Bears & Hound. Treat this as a design reference for future refinements. The specific edition has not been identified; do not assume exact cover details or replace the established lettering without further direction.

Recipe headers should have a more distinctive cookbook-opening composition, with expressive title typography and the existing illustration. Keep changes focused on design rather than adding content or recipe controls.

Carry that same whimsy into Recent Recipes and the Recipes index: pale artwork frames, restrained alternating tilts, recipe-colored Lydian titles, and a small lift/straighten on hover or keyboard focus. Keep recipe ordering and content intact.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
