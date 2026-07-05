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
import { FONT_FAMILY } from "../brand";
import { GradientBG, Vignette } from "../components/Backgrounds";
import { KineticWords, FadeUp } from "../components/KineticText";
import { EndCard, Watermark } from "../components/Chrome";

export const memeTextSchema = z.object({
  setup: z.string(),
  setupHighlights: z.array(z.string()).default([]),
  emoji: z.string(),
  punchline: z.string(),
  cta: z.string(),
});

export type MemeTextProps = z.infer<typeof memeTextSchema>;

export const MEME_TEXT_DURATION = 450; // 15s

/** Relatable meme reel: setup text → giant bouncing emoji → punchline → end card. */
export const MemeText: React.FC<MemeTextProps> = ({
  setup,
  setupHighlights,
  emoji,
  punchline,
  cta,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emojiSpring = spring({
    frame: frame - 110,
    fps,
    config: { damping: 8, mass: 0.8 },
  });
  const wobble = Math.sin(frame / 5) * interpolate(frame, [110, 180], [0, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <GradientBG>
      <AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
        <Sequence durationInFrames={300}>
          <AbsoluteFill style={{ alignItems: "center", padding: "180px 90px 0" }}>
            <KineticWords
              text={setup}
              highlightWords={setupHighlights}
              fontSize={78}
              delay={8}
            />
          </AbsoluteFill>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                fontSize: 340,
                marginTop: 200,
                transform: `scale(${emojiSpring}) rotate(${wobble}deg)`,
              }}
            >
              {emoji}
            </div>
          </AbsoluteFill>
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: 120 }}>
            <FadeUp delay={170}>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.92)",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {punchline}
              </div>
            </FadeUp>
          </AbsoluteFill>
        </Sequence>

        <Sequence from={300}>
          <EndCard cta={cta} />
        </Sequence>

        <Vignette />
        <Watermark />
      </AbsoluteFill>
    </GradientBG>
  );
};
