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
import { GradientBG, Vignette } from "../components/Backgrounds";
import { KineticWords } from "../components/KineticText";
import { EndCard, Watermark } from "../components/Chrome";

export const povFeaturesSchema = z.object({
  povLine: z.string(),
  highlights: z.array(z.string()),
  panels: z.array(
    z.object({ emoji: z.string(), title: z.string(), sub: z.string() })
  ),
  cta: z.string(),
});

export type PovFeaturesProps = z.infer<typeof povFeaturesSchema>;

export const POV_FEATURES_DURATION = 600; // 20s

const Panel: React.FC<{
  emoji: string;
  title: string;
  sub: string;
  delay: number;
  fromLeft: boolean;
}> = ({ emoji, title, sub, delay, fromLeft }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 13, mass: 0.7 } });
  return (
    <div
      style={{
        flex: 1,
        margin: "0 90px",
        borderRadius: 40,
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.16)",
        display: "flex",
        alignItems: "center",
        gap: 44,
        padding: "0 60px",
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [fromLeft ? -300 : 300, 0])}px)`,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div style={{ fontSize: 110 }}>{emoji}</div>
      <div>
        <div style={{ fontSize: 58, fontWeight: 900, color: "#fff" }}>{title}</div>
        <div style={{ fontSize: 38, fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>
          {sub}
        </div>
      </div>
    </div>
  );
};

/** POV-format reel: hook line, then feature panels slide in alternately. */
export const PovFeatures: React.FC<PovFeaturesProps> = ({
  povLine,
  highlights,
  panels,
  cta,
}) => {
  return (
    <GradientBG>
      <AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
        <Sequence durationInFrames={450}>
          <AbsoluteFill style={{ alignItems: "center", padding: "150px 80px 0" }}>
            <div
              style={{
                fontSize: 44,
                fontWeight: 700,
                color: COLORS.gold,
                letterSpacing: 6,
                marginBottom: 34,
              }}
            >
              POV
            </div>
            <KineticWords text={povLine} highlightWords={highlights} fontSize={72} delay={10} />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingBottom: 200,
              gap: 50,
              display: "flex",
            }}
          >
            {panels.map((p, i) => (
              <div key={i} style={{ height: 250, display: "flex" }}>
                <Panel {...p} delay={150 + i * 60} fromLeft={i % 2 === 0} />
              </div>
            ))}
          </AbsoluteFill>
        </Sequence>

        <Sequence from={450}>
          <EndCard cta={cta} />
        </Sequence>

        <Vignette />
        <Watermark />
      </AbsoluteFill>
    </GradientBG>
  );
};
