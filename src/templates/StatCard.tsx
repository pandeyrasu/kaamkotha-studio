import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { COLORS, FONT_FAMILY } from "../brand";
import { DotGrid } from "../components/Backgrounds";
import { Logo } from "../components/Logo";

/**
 * Bold single-image stat / mission graphic (1080×1080).
 * "Red BG, white text, FOMO mechanic" — per the calendar notes.
 */
export const statCardSchema = z.object({
  kicker: z.string(),
  headline: z.string(),
  highlight: z.string().describe("substring of headline rendered in gold"),
  sub: z.string(),
  cta: z.string(),
  theme: z.enum(["crimson", "navy"]).default("crimson"),
});

export type StatCardProps = z.infer<typeof statCardSchema>;

const renderHeadline = (headline: string, highlight: string) => {
  if (!highlight || !headline.includes(highlight)) {
    return headline;
  }
  const [before, after] = headline.split(highlight);
  return (
    <>
      {before}
      <span style={{ color: COLORS.gold }}>{highlight}</span>
      {after}
    </>
  );
};

export const StatCard: React.FC<StatCardProps> = ({
  kicker,
  headline,
  highlight,
  sub,
  cta,
  theme,
}) => {
  const bg =
    theme === "crimson"
      ? `linear-gradient(160deg, ${COLORS.crimson} 0%, ${COLORS.crimsonDark} 100%)`
      : `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 100%)`;

  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT_FAMILY }}>
      <DotGrid opacity={0.08} />
      <AbsoluteFill
        style={{
          padding: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 6,
            color: "rgba(255,255,255,0.7)",
            textTransform: "uppercase",
            marginBottom: 50,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.08,
            letterSpacing: -2,
          }}
        >
          {renderHeadline(headline, highlight)}
        </div>
        <div
          style={{
            marginTop: 50,
            fontSize: 44,
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.4,
          }}
        >
          {sub}
        </div>
        <div style={{ marginTop: 90, display: "flex", alignItems: "center", gap: 40 }}>
          <div
            style={{
              padding: "26px 56px",
              borderRadius: 999,
              background: "#fff",
              color: theme === "crimson" ? COLORS.crimson : COLORS.navy,
              fontWeight: 900,
              fontSize: 40,
            }}
          >
            {cta}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 80, right: 90 }}>
          <Logo size={70} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
