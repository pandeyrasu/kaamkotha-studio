import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { COLORS, FONT_FAMILY } from "../brand";
import { GradientBG, Flash, Vignette } from "../components/Backgrounds";
import { FadeUp } from "../components/KineticText";
import { Logo } from "../components/Logo";
import { Watermark } from "../components/Chrome";

/**
 * Match-day / topical sports content. `MatchDayCard` is a square feed
 * graphic; `MatchDayReel` is the animated 9:16 version. Generate either
 * on demand with scripts/render-topical.mjs.
 */
export const matchDaySchema = z.object({
  tournament: z.string(),
  dateLine: z.string(),
  homeTeam: z.string(),
  homeFlag: z.string(),
  awayTeam: z.string(),
  awayFlag: z.string(),
  timeLine: z.string(),
  tvLine: z.string(),
  hook: z.string(),
  commentPrompt: z.string(),
});

export type MatchDayProps = z.infer<typeof matchDaySchema>;

export const MATCH_DAY_REEL_DURATION = 390; // 13s

const TeamBlock: React.FC<{
  flag: string;
  name: string;
  flagSize: number;
  nameSize: number;
}> = ({ flag, name, flagSize, nameSize }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 18,
      fontFamily: FONT_FAMILY,
      width: "38%",
    }}
  >
    <div style={{ fontSize: flagSize, lineHeight: 1, filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.4))" }}>
      {flag}
    </div>
    <div
      style={{
        fontSize: nameSize,
        fontWeight: 900,
        color: "#fff",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      {name}
    </div>
  </div>
);

const VsBolt: React.FC<{ size: number; scale?: number }> = ({ size, scale = 1 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `linear-gradient(140deg, ${COLORS.crimson}, ${COLORS.crimsonDark})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT_FAMILY,
      fontWeight: 900,
      fontSize: size * 0.4,
      color: "#fff",
      transform: `scale(${scale}) rotate(-6deg)`,
      boxShadow: "0 16px 44px rgba(200,16,46,0.5)",
      flexShrink: 0,
    }}
  >
    VS
  </div>
);

const InfoPill: React.FC<{ emoji: string; text: string; fontSize: number }> = ({
  emoji,
  text,
  fontSize,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: `${fontSize * 0.45}px ${fontSize * 1.1}px`,
      borderRadius: 999,
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.18)",
      fontFamily: FONT_FAMILY,
      fontWeight: 700,
      fontSize,
      color: "#fff",
    }}
  >
    <span>{emoji}</span>
    {text}
  </div>
);

/* ── square feed card (1080×1080, still) ───────────────────────────── */

export const MatchDayCard: React.FC<MatchDayProps> = (props) => {
  return (
    <GradientBG>
      <AbsoluteFill style={{ fontFamily: FONT_FAMILY, padding: 70 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div
            style={{
              padding: "12px 36px",
              borderRadius: 999,
              background: COLORS.gold,
              color: COLORS.ink,
              fontWeight: 900,
              fontSize: 30,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {props.tournament}
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>
            {props.dateLine}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 80,
          }}
        >
          <TeamBlock flag={props.homeFlag} name={props.homeTeam} flagSize={190} nameSize={48} />
          <VsBolt size={140} />
          <TeamBlock flag={props.awayFlag} name={props.awayTeam} flagSize={190} nameSize={48} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 26,
            marginTop: 80,
            flexWrap: "wrap",
          }}
        >
          <InfoPill emoji="⏰" text={props.timeLine} fontSize={30} />
          <InfoPill emoji="📺" text={props.tvLine} fontSize={30} />
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              flex: 1,
            }}
          >
            {props.hook}
          </div>
          <Logo size={64} />
        </div>
      </AbsoluteFill>
      <Vignette />
    </GradientBG>
  );
};

/* ── animated reel (1080×1920, 13s) ────────────────────────────────── */

export const MatchDayReel: React.FC<MatchDayProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerS = spring({ frame: frame - 6, fps, config: { damping: 13 } });
  const homeS = spring({ frame: frame - 40, fps, config: { damping: 12, mass: 0.8 } });
  const awayS = spring({ frame: frame - 52, fps, config: { damping: 12, mass: 0.8 } });
  const vsS = spring({ frame: frame - 70, fps, config: { damping: 8, mass: 0.9 } });

  return (
    <GradientBG>
      <Flash at={70} duration={8} />
      <AbsoluteFill style={{ fontFamily: FONT_FAMILY, padding: 80, alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            opacity: kickerS,
            transform: `translateY(${interpolate(kickerS, [0, 1], [-40, 0])}px)`,
          }}
        >
          <div
            style={{
              padding: "14px 44px",
              borderRadius: 999,
              background: COLORS.gold,
              color: COLORS.ink,
              fontWeight: 900,
              fontSize: 34,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {props.tournament}
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>
            {props.dateLine}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
            marginTop: 70,
            width: "100%",
          }}
        >
          <div
            style={{
              opacity: homeS,
              transform: `translateX(${interpolate(homeS, [0, 1], [-320, 0])}px)`,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TeamBlock flag={props.homeFlag} name={props.homeTeam} flagSize={200} nameSize={54} />
          </div>
          <VsBolt size={140} scale={vsS} />
          <div
            style={{
              opacity: awayS,
              transform: `translateX(${interpolate(awayS, [0, 1], [320, 0])}px)`,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TeamBlock flag={props.awayFlag} name={props.awayTeam} flagSize={200} nameSize={54} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            marginTop: 60,
          }}
        >
          <FadeUp delay={110}>
            <InfoPill emoji="⏰" text={props.timeLine} fontSize={32} />
          </FadeUp>
          <FadeUp delay={125}>
            <InfoPill emoji="📺" text={props.tvLine} fontSize={32} />
          </FadeUp>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
            paddingBottom: 10,
          }}
        >
          <FadeUp delay={160}>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.35,
                maxWidth: 850,
              }}
            >
              {props.hook}
            </div>
          </FadeUp>
          <FadeUp delay={190}>
            <div
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: COLORS.gold,
                textAlign: "center",
              }}
            >
              {props.commentPrompt} 👇
            </div>
          </FadeUp>
          <FadeUp delay={215}>
            <Logo size={60} />
          </FadeUp>
        </div>
      </AbsoluteFill>
      <Vignette />
      <Watermark />
    </GradientBG>
  );
};
