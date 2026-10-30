# Bears & Hound design QA

final result: passed with documented verification limits

## Source and implementation

Source visual truth: https://bearsandhound.com/ and its Recipes, Books, Wine, Tools and recipe pages. Source was inspected before implementation at desktop and within a 390 × 844 iframe viewport in the cloud browser. Source HTML, text, styles, images and fonts were captured before implementation.

Implementation: browser-rendered local app at `http://terminal.local:4173/`. Mobile QA used a temporary, uncommitted iframe harness at 390 × 844 and 320 × 844. These are responsive viewport checks in desktop Chrome, not physical iOS/Android device tests.

Browser screenshot evidence lives in the browser runtime's temporary directory (not in the application or build output):

- `/tmp/bearsandhound-evidence/source-desktop-home.png` (JPEG bytes despite the early filename)
- `/tmp/bearsandhound-evidence/source-mobile-home.png` (JPEG bytes)
- `/tmp/bearsandhound-evidence/source-mobile-recipe.png` (JPEG bytes)
- `/tmp/bearsandhound-evidence/desktop-home-final.jpg`
- `/tmp/bearsandhound-evidence/mobile-home-comparison-2.jpg`
- `/tmp/bearsandhound-evidence/mobile-recipe-comparison-4.jpg`

Full-view comparisons were made by decoding source and implementation screenshots and rendering them side by side in a single combined image. The home and recipe mobile comparisons crop each screenshot to its 390px iframe region. The desktop comparison places the full captures side by side. Browser screenshots are 1348 × 926 pixels while the browser reports a 1363 × 936 CSS viewport; the same capture mechanism and density apply to both sides. No device bezel is present. The mobile iframe CSS viewport is 390 × 844 with native scrollbar space reserved inside it. No unequal-density resampling was applied.

Focused comparisons: the homepage illustration and text wrapping, original wordmarks, category art sizes, and the mobile recipe title/introduction were examined at readable scale in the combined evidence. Narrow 320px layout was additionally inspected for the long Roast Chicken title.

## Comparison history

1. Initial homepage comparison found P2 differences in the body font weight, desktop intro height and category object sizes. Loaded the original 400-weight Garamond file; matched the intro height and source-specific category dimensions. Final desktop evidence: `desktop-home-final.jpg`.
2. Initial mobile home comparison found a P2 undersized illustration and wider introduction text, causing different wrapping. Restored the 305 × 292 illustration slot and the source's 283.5px text width and letter spacing. Re-capture: `mobile-home-comparison-2.jpg`.
3. Mobile recipe comparison identified P2 title/description wrapping differences. Matched the original title's 36px size, -0.02em spacing, available width, and balanced description wrapping. Re-capture: `mobile-recipe-comparison-4.jpg`.
4. Asset validation found two empty WebP conversions. Regenerated both from captured originals and decoded/verified every image with Pillow. Asset tests now reject empty files. Browser route checks then found no broken loaded images.

Two early recipe comparison captures showed an old/loading frame and were rejected. Only the fully loaded final comparison is accepted as recipe evidence.

## Required fidelity surfaces

- Fonts/typography: original Lydian, EB Garamond 400/500/700, heading hierarchy and source text wrapping reviewed. Ingredients intentionally use larger type for cooking readability.
- Spacing/layout: desktop composition, intro, category grid and recipe proportions match the source. Single-column mobile flow is preserved. No horizontal overflow in the tested desktop routes or narrow-screen recipe.
- Colors/tokens: original navy header/footer and per-recipe color values retained. Image-grid backgrounds come from original assets. Texture opacity is a minor P3 difference.
- Image quality: all source art retained locally as WebP, capped at 1440px; wordmarks and footer illustration use original SVG source. No generated substitutes or recreated logos. All image files decoded successfully after conversion repairs.
- Copy/content: all 12 recipes, 8 books, 6 wine destinations, 8 tools and 17 memories retained. Perfect Rice's paragraph instructions preserved. Product cards gain accessible names and mobile captions.

## Browser verification

- All 12 recipe routes visited in the desktop browser: exactly one H1, ingredients and instructions present, no horizontal overflow and no broken loaded images.
- Books, Wine and Tools visited: respectively 8, 6 and 8 named external product links; no horizontal overflow or broken loaded images.
- Mobile menu open/close, expanded state, Escape dismissal, focus return and Recipes navigation tested.
- Carousel Next button changed both the visible position and live status; native rail and keyboard handlers checked. No forced autoplay.
- Mobile recipe jump-to-method link moved to the method anchor.
- 320 × 844 long-title recipe inspected: no document overflow.
- App-origin console errors checked: none. The browser extension emitted its own metadata error, unrelated to application code.

## Intentional differences and limits

The menu shows a clear text label; product tiles expose mobile captions; recipe text is larger; jump/print controls add a short action row; and the carousel is manual. These implement the requested usability fixes. Home displays the same six recent recipes on desktop and mobile, removing the original breakpoint-dependent count.

The print button and print stylesheet are implemented, but a physical print or native print-dialog flow was not exercised. Product purchase flows and external destination availability were not tested; no orders were placed. Actual phone rendering, touch gestures and screen-reader announcements were not tested on devices.

## Validation and remaining polish

Production build, three migration/content/SEO tests and four bundled worker/package tests pass. Extensionless production routes now receive the matching prerendered page via generated `.html` files as well as directory indexes. Rebuilt and reran all seven checks on October 29, 2026; the production preview opened `/recipes/perfect-rice` with the correct title, ingredients and method. P3 differences include a few pixels of alignment, texture opacity/crop and the exact photograph crop in some carousel positions.
