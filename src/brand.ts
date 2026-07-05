import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * KaamKotha brand kit.
 * Palette is anchored on the Nepali flag crimson + blue,
 * with pillar accent colors matching the content calendar.
 */
export const COLORS = {
  crimson: "#C8102E",
  crimsonDark: "#8E0B20",
  navy: "#12275E",
  navyDeep: "#0A1638",
  cream: "#FFF6EC",
  white: "#FFFFFF",
  ink: "#141118",
  gold: "#F2B705",
} as const;

/** Content-pillar accents (🔴 Promo, 🔵 Education, 🟣 Entertainment, 🟡 Trending, 🟢 Virality, 🟠 Cultural) */
export const PILLARS = {
  promo: { color: "#C8102E", label: "Promo", emoji: "🔴" },
  education: { color: "#1D6FE0", label: "Education", emoji: "🔵" },
  entertainment: { color: "#8A4FD3", label: "Entertainment", emoji: "🟣" },
  trending: { color: "#F2B705", label: "Trending", emoji: "🟡" },
  virality: { color: "#1FA05C", label: "Virality", emoji: "🟢" },
  cultural: { color: "#E8681A", label: "Cultural", emoji: "🟠" },
} as const;

export type PillarKey = keyof typeof PILLARS;

export const FONT_FAMILY = "Poppins, 'Noto Sans Devanagari', sans-serif";

const fonts = [
  { family: "Poppins", url: "fonts/Poppins-SemiBold.ttf", weight: "600" },
  { family: "Poppins", url: "fonts/Poppins-Bold.ttf", weight: "700" },
  { family: "Poppins", url: "fonts/Poppins-Black.ttf", weight: "900" },
  {
    family: "Noto Sans Devanagari",
    url: "fonts/NotoSansDevanagari-Bold.ttf",
    weight: "700",
  },
];

let loaded = false;
export const ensureFonts = () => {
  if (loaded) {
    return;
  }
  loaded = true;
  for (const f of fonts) {
    loadFont({
      family: f.family,
      url: staticFile(f.url),
      weight: f.weight,
    }).catch((err) => console.error(`Failed to load font ${f.family}`, err));
  }
};

/** Canvas presets */
export const FORMATS = {
  reel: { width: 1080, height: 1920, fps: 30 }, // TikTok / IG Reel / FB Reel
  square: { width: 1080, height: 1080, fps: 30 }, // IG / FB feed post
  portrait: { width: 1080, height: 1350, fps: 30 }, // IG carousel slide
} as const;
