#!/usr/bin/env node
/**
 * Generate topical / moment-marketing content on demand.
 *
 *   # Match-day content (square card + animated reel):
 *   npm run match -- --home England --away Mexico --time "5:00 PM UK" --tv "BBC One"
 *   npm run match -- --home Nepal --away India --tournament "SAFF Championship" \
 *     --hook "Who's watching at the Gurkha pub?" --card-only
 *
 *   # Promo content (poster + animated reel) from a JSON props file:
 *   npm run promo -- --config my-promo.json
 *   npm run promo                      # uses the built-in sample offer
 *
 * Flags for match: --home --away --home-flag --away-flag --tournament --date
 *   --time --tv --hook --comment --card-only --reel-only
 * Flags for promo: --config <file.json> --poster-only --reel-only
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENTRY = "src/index.ts";

const FLAGS = {
  england: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  uk: "🇬🇧",
  nepal: "🇳🇵",
  mexico: "🇲🇽",
  brazil: "🇧🇷",
  argentina: "🇦🇷",
  france: "🇫🇷",
  germany: "🇩🇪",
  spain: "🇪🇸",
  portugal: "🇵🇹",
  italy: "🇮🇹",
  netherlands: "🇳🇱",
  usa: "🇺🇸",
  canada: "🇨🇦",
  japan: "🇯🇵",
  india: "🇮🇳",
  qatar: "🇶🇦",
  "saudi arabia": "🇸🇦",
  croatia: "🇭🇷",
  belgium: "🇧🇪",
  morocco: "🇲🇦",
  senegal: "🇸🇳",
  ghana: "🇬🇭",
  australia: "🇦🇺",
  "south korea": "🇰🇷",
};

const [mode, ...rest] = process.argv.slice(2);
const args = {};
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith("--")) {
    const key = rest[i].slice(2);
    const next = rest[i + 1];
    if (next === undefined || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i++;
    }
  }
}

const flagFor = (team) => FLAGS[String(team).toLowerCase()] ?? "⚽";
const todayLine = () =>
  new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const render = (compositionId, outPath, props, still) => {
  mkdirSync(join(root, "out"), { recursive: true });
  const cmd = still
    ? ["remotion", "still", ENTRY, compositionId, outPath, `--props=${JSON.stringify(props)}`]
    : ["remotion", "render", ENTRY, compositionId, outPath, `--props=${JSON.stringify(props)}`];
  console.log(`\n▶ Rendering ${compositionId} → ${outPath}`);
  const res = spawnSync("npx", cmd, { cwd: root, stdio: "inherit" });
  if (res.status !== 0) {
    console.error(`✖ Failed to render ${compositionId}`);
    process.exit(res.status ?? 1);
  }
};

if (mode === "match") {
  if (!args.home || !args.away) {
    console.error('Usage: npm run match -- --home England --away Mexico [--time "5PM UK"] [--tv "BBC One"] ...');
    process.exit(1);
  }
  const props = {
    tournament: args.tournament ?? "FIFA World Cup 2026",
    dateLine: args.date ?? `Today · ${todayLine()}`,
    homeTeam: args.home,
    homeFlag: args["home-flag"] ?? flagFor(args.home),
    awayTeam: args.away,
    awayFlag: args["away-flag"] ?? flagFor(args.away),
    timeLine: args.time ? `Kick-off ${args.time}` : "Kick-off time TBC",
    tvLine: args.tv ?? "Check local listings",
    hook:
      args.hook ??
      `${args.home} vs ${args.away} — where is the UK Nepali fam watching? 🥟⚽`,
    commentPrompt: args.comment ?? "Score prediction",
  };
  const slug = `${String(args.home).toLowerCase()}-vs-${String(args.away).toLowerCase()}`.replace(
    /[^a-z0-9-]/g,
    ""
  );
  if (!args["reel-only"]) {
    render("Match-Card", `out/match-${slug}.png`, props, true);
  }
  if (!args["card-only"]) {
    render("Match-Reel", `out/match-${slug}.mp4`, props, false);
  }
} else if (mode === "promo") {
  let props;
  if (args.config) {
    props = JSON.parse(readFileSync(join(process.cwd(), args.config), "utf8"));
  } else {
    console.log("No --config given — rendering the built-in sample offer.");
    props = undefined; // fall back to the composition's defaultProps
  }
  const slug = args.name ?? "promo";
  if (!args["reel-only"]) {
    render("Promo-Poster", `out/${slug}-poster.png`, props ?? {}, true);
  }
  if (!args["poster-only"]) {
    render("Promo-Reel", `out/${slug}-reel.mp4`, props ?? {}, false);
  }
} else {
  console.error("Usage: node scripts/render-topical.mjs <match|promo> [flags]");
  process.exit(1);
}

console.log(`\n✔ Done. Output in ${join(root, "out")}`);
