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
import { COLORS, FONT_FAMILY, PILLARS, PillarKey } from "../brand";
import { GradientBG, Vignette } from "../components/Backgrounds";
import { KineticWords } from "../components/KineticText";
import { EndCard, PillarBadge, Watermark } from "../components/Chrome";

export const kineticListSchema = z.object({
  title: z.string(),
  titleHighlights: z.array(z.string()),
  items: z.array(z.string()),
  pillar: z.enum(["promo", "education", "entertainment", "trending", "virality", "cultural"]),
  cta: z.string(),
  itemSeconds: z.number().default(2.4),
});

export type KineticListProps = z.infer<typeof kineticListSchema>;

const INTRO = 90;
const OUTRO = 150;

export const kineticListDuration = (props: KineticListProps, fps = 30) =>
  INTRO + Math.round(props.items.length * props.itemSeconds * fps) + OUTRO;

const ListItem: React.FC<{ index: number; text: string; accent: string }> = ({
  index,
  text,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100 }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 900,
          fontSize: 200,
          color: accent,
          opacity: 0.25,
          position: "absolute",
          top: 320,
          transform: `scale(${s})`,
        }}
      >
        #{index + 1}
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 900,
          fontSize: 76,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.2,
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [90, 0])}px)`,
          textShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** Fast-paced numbered list reel — one punchy item per beat. */
export const KineticList: React.FC<KineticListProps> = (props) => {
  const { fps } = useVideoConfig();
  const perItem = Math.round(props.itemSeconds * fps);
  const accent = PILLARS[props.pillar as PillarKey].color;

  return (
    <GradientBG accent={accent}>
      <AbsoluteFill>
        <Sequence durationInFrames={INTRO}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 90 }}>
            <KineticWords
              text={props.title}
              highlightWords={props.titleHighlights}
              fontSize={86}
              delay={6}
            />
          </AbsoluteFill>
        </Sequence>

        {props.items.map((item, i) => (
          <Sequence key={i} from={INTRO + i * perItem} durationInFrames={perItem}>
            <ListItem index={i} text={item} accent={COLORS.gold} />
          </Sequence>
        ))}

        <Sequence from={INTRO + props.items.length * perItem}>
          <EndCard cta={props.cta} />
        </Sequence>

        <PillarBadge pillar={props.pillar as PillarKey} />
        <Vignette />
        <Watermark />
      </AbsoluteFill>
    </GradientBG>
  );
};
