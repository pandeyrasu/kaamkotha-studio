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
import { KineticWords, FadeUp } from "../components/KineticText";
import { EndCard, Watermark } from "../components/Chrome";
import { Logo } from "../components/Logo";

export const brandRevealSchema = z.object({
  hook: z.string(),
  highlightWords: z.array(z.string()),
  features: z.array(z.object({ emoji: z.string(), label: z.string() })),
  cta: z.string(),
});

export type BrandRevealProps = z.infer<typeof brandRevealSchema>;

const FeatureRow: React.FC<{ emoji: string; label: string; delay: number }> = ({
  emoji,
  label,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 13, mass: 0.6 } });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 34,
        padding: "30px 50px",
        borderRadius: 32,
        background: "rgba(255,255,255,0.09)",
        border: "1px solid rgba(255,255,255,0.15)",
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [120, 0])}px)`,
        fontFamily: FONT_FAMILY,
      }}
    >
      <span style={{ fontSize: 72 }}>{emoji}</span>
      <span style={{ fontSize: 54, fontWeight: 700, color: "#fff" }}>{label}</span>
    </div>
  );
};

/**
 * 30s brand reveal: kinetic hook → logo slam → feature stack → end card.
 * Timeline (30fps): hook 0–150, reveal 150–360, features 360–660, end 660–900.
 */
export const BrandReveal: React.FC<BrandRevealProps> = ({
  hook,
  highlightWords,
  features,
  cta,
}) => {
  return (
    <GradientBG>
      <AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
        <Sequence durationInFrames={150}>
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center", padding: 90 }}
          >
            <KineticWords
              text={hook}
              highlightWords={highlightWords}
              fontSize={92}
              wordStagger={5}
              delay={8}
            />
          </AbsoluteFill>
        </Sequence>

        <Sequence from={150} durationInFrames={210}>
          <Flash at={0} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 60 }}>
            <Logo size={230} animateIn stacked />
            <FadeUp delay={30}>
              <div
                style={{
                  fontSize: 46,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  textAlign: "center",
                }}
              >
                The app for Nepalese in the UK
              </div>
            </FadeUp>
          </AbsoluteFill>
        </Sequence>

        <Sequence from={360} durationInFrames={300}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              padding: "0 110px",
              gap: 44,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: COLORS.gold,
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              Everything. One app.
            </div>
            {features.map((f, i) => (
              <FeatureRow key={i} emoji={f.emoji} label={f.label} delay={16 + i * 14} />
            ))}
          </AbsoluteFill>
        </Sequence>

        <Sequence from={660}>
          <EndCard cta={cta} />
        </Sequence>

        <Vignette />
        <Watermark />
      </AbsoluteFill>
    </GradientBG>
  );
};

export const BRAND_REVEAL_DURATION = 900;
