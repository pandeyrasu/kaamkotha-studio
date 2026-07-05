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
import { Flash, Vignette } from "../components/Backgrounds";
import { KineticWords, FadeUp } from "../components/KineticText";
import { Logo } from "../components/Logo";
import { Watermark } from "../components/Chrome";

export const countdownTeaseSchema = z.object({
  teaseLines: z.array(z.string()),
  bigReveal: z.string(),
  dateLine: z.string(),
  cta: z.string(),
});

export type CountdownTeaseProps = z.infer<typeof countdownTeaseSchema>;

export const COUNTDOWN_TEASE_DURATION = 540; // 18s

/** Dark mystery tease: whispered lines → hard-cut reveal → date + follow CTA. */
export const CountdownTease: React.FC<CountdownTeaseProps> = ({
  teaseLines,
  bigReveal,
  dateLine,
  cta,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const perLine = 80;
  const revealAt = teaseLines.length * perLine;
  const revealSpring = spring({
    frame: frame - revealAt,
    fps,
    config: { damping: 11, mass: 0.7 },
  });
  const flicker = 0.92 + Math.sin(frame / 3) * 0.04;

  return (
    <AbsoluteFill style={{ background: "#08060B", fontFamily: FONT_FAMILY }}>
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: COLORS.crimson,
          opacity: interpolate(frame, [revealAt, revealAt + 30], [0.05, 0.28], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "blur(180px)",
          top: "25%",
          left: "5%",
        }}
      />

      {teaseLines.map((line, i) => (
        <Sequence key={i} from={i * perLine} durationInFrames={perLine}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: `rgba(255,255,255,${0.85 * flicker})`,
                textAlign: "center",
                lineHeight: 1.35,
              }}
            >
              {line}
            </div>
          </AbsoluteFill>
        </Sequence>
      ))}

      <Sequence from={revealAt}>
        <Flash at={0} duration={10} />
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 90,
            gap: 60,
          }}
        >
          <div
            style={{
              transform: `scale(${revealSpring})`,
              textAlign: "center",
            }}
          >
            <KineticWords text={bigReveal} fontSize={96} highlightWords={[]} delay={4} />
          </div>
          <FadeUp delay={40}>
            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: COLORS.gold,
                letterSpacing: 3,
              }}
            >
              {dateLine}
            </div>
          </FadeUp>
          <FadeUp delay={70}>
            <div
              style={{
                padding: "26px 70px",
                borderRadius: 999,
                border: `3px solid ${COLORS.crimson}`,
                color: "#fff",
                fontWeight: 700,
                fontSize: 44,
              }}
            >
              {cta}
            </div>
          </FadeUp>
          <FadeUp delay={90}>
            <Logo size={80} />
          </FadeUp>
        </AbsoluteFill>
      </Sequence>

      <Vignette />
      <Watermark />
    </AbsoluteFill>
  );
};
