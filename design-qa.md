# Bears & Hound design preview — October 30, 2026

final result: passed

## Current revision — playful recipe grids

The same shared RecipeGrid component now styles Recent Recipes and the Recipes index with pale frames, small alternating tilts, recipe-colored Lydian titles, and a lift/straighten on hover or keyboard focus. Content, artwork, links, and ordering remain unchanged. Reduced motion disables the frame transforms.

Source: ../bearsandhound-review/24-index-before.png. Implementation: ../bearsandhound-review/25-index-whimsy.png. Both are 1280 × 720 image/CSS pixels, density 1, same page and state. Combined full-view comparison: ../bearsandhound-review/compare-recipe-cards.png. Focused native-size title comparison: ../bearsandhound-review/compare-card-titles.png. The font change, border, shadow, color, and tilt are intentional; the original artwork is complete and sharp. Recent Recipes evidence: ../bearsandhound-review/26-recent-whimsy.png. Mobile index evidence: ../bearsandhound-review/27-index-whimsy-mobile.png, 390 × 844. Twelve recipe cards are present and no horizontal overflow was found. No actionable P0/P1/P2 findings in inspected states. The publication includes this revision.

## Current revision — distinctive recipe headers

The user requested a more unique recipe header after identifying Loaves & Fishes as an influence. This revision uses the established typefaces and artwork in a new cookbook-opening composition: title and introduction on the left, illustration on the right, a larger Lydian title tinted with a darkened version of the recipe color, a fine rule above the introduction, and a pale illustration frame rotated by 1.25 degrees (0.8 degrees on mobile). The semantic header places the heading and description before the illustration, matching the visual reading order. No content or controls were added.

Source visual: ../bearsandhound-review/18-biscotti-header-before.png. Final rendered implementation: ../bearsandhound-review/19-biscotti-header-after.png. Both are 1280 × 720 CSS and image pixels, density 1, same route and top-of-page state. Full-view comparison: ../bearsandhound-review/compare-recipe-header.png. Native-size typography comparison: ../bearsandhound-review/compare-header-typography.png. The original fonts, artwork, and copy are retained; the scale, alignment, framing, and color changes are intentional. The full illustration remains visible. Fine borders and shadows stay restrained on the existing paper background.

Responsive evidence: ../bearsandhound-review/20-biscotti-header-mobile.png (390 × 844), ../bearsandhound-review/21-ragu-header-after.png (1280 × 720, longer title), and ../bearsandhound-review/22-ragu-header-tablet.png (810 × 900). The ragù page was also checked at 320px wide. No horizontal overflow was found. The mobile layout places title and introduction above the illustration. Existing Ingredients and Method content follows the header directly. One h1 is present and the removed action row remains absent. Print CSS was updated to omit the new illustration wrapper and keep the title black; reduced-motion styling also removes the decorative tilt.

No actionable P0/P1/P2 issues found in this revision. Build, three content tests, and git diff --check passed. No new tests were added for this visual change. Earlier sections below retain the prior design iterations for reference.

## Latest revision — simpler recipe pages

At the user's request, removed the ingredient/method jump links and print button, along with their unused styles. The introduction now flows directly into the recipe body. Ingredients, method, section IDs, and browser print styles remain intact. Verified the rendered desktop recipe after hot reload; evidence: ../bearsandhound-review/17-recipe-simplified.png. Earlier screenshots and action-control checks below document the preceding iteration, before those controls were removed. No new layout issues were observed.

This is an intentional visual refinement of the existing site, using its current pages as the source and the user's agreed design direction: warm paper, a tighter homepage, subtle illustration interactions, cookbook-style recipes, typography refinement, and framed memories. It is not a pixel-for-pixel recreation. Content, image files, fonts, routes, and external destinations are unchanged.

## Source and rendered evidence

All screenshot paths below are relative to this project folder. Baseline captures are the live site reviewed earlier in this conversation. Implementation captures are from the running local app at http://127.0.0.1:4173/ in the Codex in-app browser.

| Surface | Source visual | Final implementation | State |
| --- | --- | --- | --- |
| Home | ../bearsandhound-review/01-home.png | ../bearsandhound-review/04-new-home.png | Top of page, desktop, menu closed |
| Recipe index | ../bearsandhound-review/02-recipes.png | ../bearsandhound-review/06-new-recipes.png | Top of page, desktop |
| Recipe detail | ../bearsandhound-review/03-recipe.png | ../bearsandhound-review/07-new-recipe.png | Ragù, top of page, desktop |
| Memories | Existing supplied photos | ../bearsandhound-review/05-new-memories.png | Desktop, carousel starting at photo 2 |
| Mobile home | Same source and agreed changes | ../bearsandhound-review/09-new-home-mobile.png | Menu closed |
| Mobile menu | Existing navigation behavior | ../bearsandhound-review/10-new-menu-mobile.png | Menu open |
| Mobile recipe index | Same source and agreed changes | ../bearsandhound-review/11-new-recipes-mobile.png | Top of page |
| Mobile recipe | Same source and agreed changes | ../bearsandhound-review/12-new-recipe-mobile.png | Ragù, top of page |
| Keyboard focus | Existing accessible links | ../bearsandhound-review/13-keyboard-focus.png | Books category focused |
| Tablet recipe | Original full illustration | ../bearsandhound-review/15-tablet-after.png | Ragù, top of page |

Desktop source and implementation captures are both 1280 × 720 pixels and CSS pixels, density 1. No image rescaling was needed for comparison. The combined comparisons add a 38px label strip but preserve the captured pixels. Mobile captures are 390 × 844 at density 1. Tablet captures are 810 × 900 at density 1. The recipe was also inspected at 320 × 740. Temporary browser viewport overrides were reset after testing.

Full-view side-by-side comparisons:

- ../bearsandhound-review/compare-home.png
- ../bearsandhound-review/compare-index.png
- ../bearsandhound-review/compare-recipe.png

Focused comparison:

- ../bearsandhound-review/compare-title-detail.png — native-size crops show the existing Lydian title and EB Garamond body, new line breaks, spacing, and foreground/background treatment.

## Findings and iteration history

### Pass 1 — blocked by tablet artwork cropping

[P2] Recipe illustration lost its surrounding details at the tablet breakpoint.

- Location: src/styles.css, .recipe-hero > img.
- Evidence: ../bearsandhound-review/14-tablet-before.png at 810 × 900. The 370px minimum image height and object-fit: cover clipped the wine bottle, garlic, and tomato can.
- Impact: the supplied illustration's full composition was lost as the side-by-side layout narrowed.
- Fix: keep the illustration at its natural 1240 / 680 aspect ratio, use object-fit: contain, and align it centrally within the spread.

### Pass 2 — passed

- Post-fix evidence: ../bearsandhound-review/15-tablet-after.png.
- Same-viewport, same-route before/after evidence: ../bearsandhound-review/compare-tablet-fix.png. The entire illustration is now visible and the title and body retain readable proportions.
- Desktop was captured again after this fix: ../bearsandhound-review/07-new-recipe.png and compare-recipe.png.
- No remaining actionable P0, P1, or P2 findings in the inspected states.

## Required visual surfaces

- Fonts and typography: original local Lydian and EB Garamond files retained; no replacement fonts. Display headings use Lydian, reading text uses Garamond. Recipe headings are left aligned, larger, and balanced; body line height and list spacing are increased. No truncation in inspected captures.
- Spacing and layout rhythm: shared responsive gutters frame the homepage and collection artwork; the opening composition is tighter; recipe reading columns use a narrower content width; mobile categories use two columns, with recipe cards returning to one column on narrow phones. Inspected screens have no horizontal document overflow.
- Colors and visual tokens: paper is #faf7f0, pale framing paper is #fffdf8, ink is #243a58, masthead is #19283f. The original recipe color appears in the title rule rather than the full text panel. These are intentional changes. Focus uses a contrasting rust outline on paper and gold on dark surfaces.
- Image quality and asset fidelity: all original illustrations, photos, wordmarks, SVG controls, and fonts retained. No generated or approximate artwork. Intro artwork blends into paper; memories use narrow pale borders, a larger lower border, soft shadows, and small alternating rotations. Final recipe artwork retains its complete aspect ratio.
- Copy and content: all source content and links are unchanged. git diff confirmed no changes to src/content.json or public/assets. Recipe ordering, page titles, ingredients, methods, and photo order remain intact.

## Functional verification

- Followed homepage → recipe index → ragù recipe using rendered navigation.
- Recipe jump-to-method action moves to the method with the heading below the sticky header. Desktop screenshot: ../bearsandhound-review/08-new-method.png.
- Mobile navigation opens; Escape closes it and returns focus to the menu toggle.
- Keyboard Tab focus is clearly visible on category links and also applies the illustration emphasis.
- Memory next button advances to photo 2. Previous from the start wraps to photo 15, showing the final three photographs; next wraps back to photo 1. ArrowRight on the focused rail advances to photo 2. Geometry and live text were checked after scrolling settled.
- Mobile recipe action controls have a minimum height of 44px.
- Inspected desktop home, recipe index, recipe detail, framed memories; mobile home, menu, index and detail; tablet Books and recipe; narrow 320px recipe. No document overflow or missing eager images found in inspected pages.
- Browser console entries were checked; no errors or warnings were returned for this preview tab. Normal Vite connection and React DevTools informational messages were present.
- npm run build passed and prerendered all 17 public pages and the 404 page.
- npm test passed: 3 tests.
- npm run test:sites passed: 4 tests.
- git diff --check passed.

The sandbox logged an EPERM warning for the prerenderer's unused Vite WebSocket listener during build; prerendering and packaging completed with exit 0. The browser preview runs with an authorized local server and its actual HMR connection works.

## Limits and follow-up polish

Reduced-motion rules were reviewed in code: transitions and decorative transforms are disabled, and the carousel uses instant scrolling. The OS motion preference was not changed for testing. Hover styling is restricted to devices with a fine pointer and hover; keyboard focus equivalents were exercised, but automated pointer-hover capture was not available through the selected control API. Print styles and handler were retained and reviewed; a system print dialog was not exercised. No screen-reader or full accessibility compliance claim is made. No new backend, content, hosting, or public deployment was introduced.

## Implementation checklist

- [x] Warm paper and shared visual tokens.
- [x] Tighter homepage composition.
- [x] Illustration hover, press, and keyboard-focus states.
- [x] Cookbook-style recipe layout and improved list rhythm.
- [x] Photo-album styling and carousel geometry adjustment.
- [x] Responsive browser checks and tablet crop repair.
- [x] Build and existing test suites.
- [x] Preview retained for user inspection.
