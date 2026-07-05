import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { COLORS, FONT_FAMILY } from "../brand";
import { GradientBG, Flash, Vignette } from "../components/Backgrounds";
import { FadeUp, KineticWords } from "../components/KineticText";
import { EndCard, Watermark } from "../components/Chrome";

export const beforeAfterSchema = z.object({
  title: z.string(),
  titleHighlights: z.array(z.string()).default([]),
  beforeLabel: z.string().default("BEFORE"),
  afterLabel: z.string().default("AFTER"),
  beforeItems: z.array(z.string()),
  afterItems: z.array(z.string()),
  cta: z.string(),
  strikeBefore: z.boolean().default(true),
});

export type BeforeAfterProps = z.infer<typeof beforeAfterSchema>;

export const BEFORE_AFTER_DURATION = 660; // 22s

const Half: React.FC<{
  label: string;
  items: string[];
  tone: "bad" | "good";
  delay: number;
  strike: boolean;
}> = ({ label, items, tone, delay, strike }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const accent = tone === "bad" ? "#9AA2B5" : COLORS.gold;
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
        fontFamily: FONT_FAMILY,
        background:
          tone === "bad" ? "rgba(0,0,0,0.35)" : "rgba(200,16,46,0.18)",
        borderTop: tone === "good" ? `6px solid ${COLORS.crimson}` : "none",
      }}
    >
      <div
        style={{
          fontSize: 46,
          fontWeight: 900,
          letterSpacing: 8,
          color: accent,
        }}
      >
        {label}
      </div>
      {items.map((item, i) => (
        <FadeUp key={i} delay={delay + 16 + i * 12}>
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: tone === "bad" ? "rgba(255,255,255,0.7)" : "#fff",
              textDecoration: tone === "bad" && strike ? "line-through" : "none",
              textDecorationColor: "rgba(255,255,255,0.4)",
              textAlign: "center",
              padding: "0 70px",
              lineHeight: 1.25,
            }}
          >
            {item}
          </div>
        </FadeUp>
      ))}
    </div>
  );
};

/** Life before vs after KaamKotha — stacked split screen. */
export const BeforeAfter: React.FC<BeforeAfterProps> = (props) => {
  return (
    <GradientBG>
      <AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
        <Sequence durationInFrames={90}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 90 }}>
            <KineticWords
              text={props.title}
              highlightWords={props.titleHighlights}
              fontSize={84}
              delay={6}
            />
          </AbsoluteFill>
        </Sequence>

        <Sequence from={90} durationInFrames={420}>
          <Flash at={0} duration={6} />
          <AbsoluteFill style={{ flexDirection: "column", display: "flex" }}>
            <Half
              label={props.beforeLabel}
              items={props.beforeItems}
              tone="bad"
              delay={6}
              strike={props.strikeBefore}
            />
            <Half
              label={props.afterLabel}
              items={props.afterItems}
              tone="good"
              delay={120}
              strike={false}
            />
          </AbsoluteFill>
        </Sequence>

        <Sequence from={510}>
          <EndCard cta={props.cta} />
        </Sequence>

        <Vignette />
        <Watermark />
      </AbsoluteFill>
    </GradientBG>
  );
};
