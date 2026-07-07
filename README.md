# KaamKotha Studio 🇳🇵

Programmatic social-media content generator for **KaamKotha** — built on
[Remotion](https://remotion.dev). It turns the 30-day launch content calendar
into rendered, on-brand videos (TikTok / IG Reels / FB) and image sets
(IG carousels / feed graphics) from one command.

## Quick start

```bash
npm install

# Open the visual editor — browse all 30 calendar days + template playgrounds
npm run studio

# Render a single day (video → out/day-NN-*.mp4, carousel → out/day-NN-*/ PNGs)
npm run render -- --day 1
npm run render -- --day 2 --day 10 --day 25

# Render the entire calendar
npm run render:all
```

## What's inside

### Templates (`src/templates/`)

| Template | Output | Used for |
| --- | --- | --- |
| `BrandReveal` | 30s reel 1080×1920 | Logo reveal with kinetic hook text (Day 1) |
| `KineticList` | reel, auto-duration | Numbered list reels — relatable humour, UGC prompts (Days 6, 8, 11, 16, 21, 26) |
| `MemeText` | 15s reel | Big-text meme + giant emoji + punchline (Days 3, 20) |
| `PovFeatures` | 20s reel | "POV:" hook + app-card feature panels (Day 4) |
| `BeforeAfter` | 22s reel | Split-screen comparisons — supports neutral mode for culture crossovers (Days 12, 19, 27) |
| `FestivalGreeting` | 15s video | Cultural greetings, no promo CTA (Day 10 — Ghode Jatra) |
| `QuizReel` | reel, timer-driven | Question + countdown ring + comment CTA (Days 14, 17, 28) |
| `CountdownTease` | reel | Mystery tease → hard-cut reveal (Days 23 — April Fools, 30 — Navavarsha) |
| `Carousel` | 1080×1350 PNG per slide | Education/value carousels — cover, numbered slides, CTA outro (Days 2, 5, 9, 13, 15, 18, 22, 24, 25) |
| `StatCard` | 1080×1080 PNG | Bold stat / mission graphics (Days 7, 29) |

### Content calendar (`src/data/calendar.ts`)

All 30 days of the launch calendar are wired in with finished bilingual copy
(English + नेपाली). Each entry maps a day to a template, its props, platforms,
pillar and production notes. Edit the copy there — or tweak any prop live in
Remotion Studio's right-hand panel and copy the JSON back.

### Brand kit (`src/brand.ts`)

Official brand colors — crimson `#DC143C` and blue `#003893` — plus gold
accent, the six pillar accent colors, and canvas presets. The official KK
monogram is inlined as a React component (`src/components/LogoMark.tsx`,
source SVG in `public/brand/`) and used by every template via `Logo`.
Fonts are self-hosted (Poppins for Latin, Noto Sans Devanagari for Nepali —
bundled in `public/fonts/`, no network needed at render time).

## Topical / on-demand content

Beyond the fixed calendar, the `Topical` folder holds ad-hoc templates you can
render any day with fresh props — no code changes needed.

### Match-day content (sports moment marketing)

```bash
# Square feed card + animated 9:16 reel for today's game:
npm run match -- --home England --away Mexico --time "5:00 PM UK" --tv "BBC One · iPlayer"

# Any fixture, any tournament — flags are auto-matched for common teams
# (or pass --home-flag/--away-flag explicitly):
npm run match -- --home Nepal --away India --tournament "SAFF Championship" \
  --hook "Who's watching at the Gurkha pub tonight?" --card-only
```

Defaults: tournament "FIFA World Cup 2026", date = today, and a KaamKotha
community hook ("where is the UK Nepali fam watching?"). Output:
`out/match-<home>-vs-<away>.png` + `.mp4`.

### Promo poster + reel (ad-style offers)

Classic promo-ad layout — mixed Nepali/English headline, giant accent word,
offer box, hero visual, % badge and disclaimer strip:

```bash
npm run promo                          # built-in sample offer
npm run promo -- --config offer.json   # your own copy (see promoSchema in src/templates/Promo.tsx)
```

Renders `Promo-Poster` (1080×1350 still) and `Promo-Reel` (animated 9:16).
Set `heroImage` in the config to a URL or a file in `public/` to use a real
photo (like a model shot); leave it empty for the styled emoji hero.

## Rendering details

- Video days render straight to `out/day-NN-<Template>.mp4` (H.264, 30fps).
- Carousel / stat-card days render one PNG **per slide** into
  `out/day-NN-<Template>/` (each slide is one frame of the composition).
- Composition IDs follow `Day-NN-<Template>` — you can also render directly:
  `npx remotion render src/index.ts Day-04-PovFeatures out/pov.mp4`.

## Music

Reels are rendered silent by design — trending audio must be added in the
TikTok / Instagram editor at post time to count toward the trend. For evergreen
audio, drop an mp3 into `public/` and add an `<Audio>` tag to the template.

## Adding a new post

1. Pick a template (or add one under `src/templates/` and register it in
   `src/Root.tsx`'s `REGISTRY`).
2. Append an entry to `CALENDAR` in `src/data/calendar.ts` with the day,
   pillar, template and props.
3. `npm run render -- --day <n>`.
