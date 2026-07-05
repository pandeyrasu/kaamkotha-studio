#!/usr/bin/env node
/**
 * Render KaamKotha calendar content.
 *
 *   npm run render -- --day 3          # render day 3
 *   npm run render -- --day 2 --day 5  # render several days
 *   npm run render:all                 # render the whole calendar
 *
 * Videos land in out/day-NN-<Template>.mp4.
 * Carousels/stat cards land in out/day-NN-<Template>/ as PNG slides.
 */
import { execSync, spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENTRY = "src/index.ts";
const STILL_TEMPLATES = new Set(["Carousel", "StatCard"]);

const args = process.argv.slice(2);
const all = args.includes("--all");
const days = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--day") {
    days.push(Number(args[i + 1]));
  }
}
if (!all && days.length === 0) {
  console.error("Usage: npm run render -- --day <n> [--day <n> ...] | --all");
  process.exit(1);
}

const list = execSync(`npx remotion compositions ${ENTRY} --quiet`, {
  cwd: root,
  encoding: "utf8",
});
const ids = list
  .split(/\s+/)
  .filter((id) => /^Day-\d{2}-/.test(id));

const wanted = all
  ? ids
  : ids.filter((id) => days.includes(Number(id.slice(4, 6))));

if (wanted.length === 0) {
  console.error(`No compositions found for day(s): ${days.join(", ")}`);
  console.error(`Available: ${ids.join(", ")}`);
  process.exit(1);
}

mkdirSync(join(root, "out"), { recursive: true });

for (const id of wanted) {
  const template = id.slice(7);
  const base = `day-${id.slice(4, 6)}-${template}`;
  const isStills = STILL_TEMPLATES.has(template);
  const outPath = isStills ? `out/${base}` : `out/${base}.mp4`;
  const cmd = isStills
    ? ["remotion", "render", ENTRY, id, outPath, "--sequence", "--image-format=png"]
    : ["remotion", "render", ENTRY, id, outPath];

  console.log(`\n▶ Rendering ${id} → ${outPath}`);
  const res = spawnSync("npx", cmd, { cwd: root, stdio: "inherit" });
  if (res.status !== 0) {
    console.error(`✖ Failed to render ${id}`);
    process.exit(res.status ?? 1);
  }
}

console.log(`\n✔ Done. Output in ${join(root, "out")}`);
