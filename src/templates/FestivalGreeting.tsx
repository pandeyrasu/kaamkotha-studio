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
import { Vignette } from "../components/Backgrounds";
import { FadeUp } from "../components/KineticText";
import { Logo } from "../components/Logo";

export const festivalGreetingSchema = z.object({
  festivalEmoji: z.string(),
  titleNepali: z.string(),
  titleEnglish: z.string(),
  message: z.string(),
});

export type FestivalGreetingProps = z.infer<typeof festivalGreetingSchema>;

export const FESTIVAL_GREETING_DURATION = 450; // 15s

/** Radiating mandala-style rings. Pure community warmth — no promo CTA. */
const Rings: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const scale = interpolate((frame + i * 40) % 200, [0, 200], [0.3, 2.4]);
        const opacity = interpolate((frame + i * 40) % 200, [0, 40, 200], [0, 0.16, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 800,
              height: 800,
              borderRadius: "50%",
              border: `3px solid ${COLORS.gold}`,
              transform: `scale(${scale})`,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const FestivalGreeting: React.FC<FestivalGreetingProps> = ({
  festivalEmoji,
  titleNepali,
  titleEnglish,
  message,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const emojiPop = spring({ frame: frame - 10, fps, config: { damping: 9, mass: 0.9 } });
  const sway = Math.sin(frame / 20) * 4;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${COLORS.crimsonDark} 0%, ${COLORS.crimson} 55%, #E8681A 130%)`,
        fontFamily: FONT_FAMILY,
      }}
    >
      <Rings />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 90,
          gap: 46,
        }}
      >
        <div
          style={{
            fontSize: 220,
            transform: `scale(${emojiPop}) rotate(${sway}deg)`,
          }}
        >
          {festivalEmoji}
        </div>
        <FadeUp delay={26}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              fontFamily: "'Noto Sans Devanagari', Poppins, sans-serif",
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.3,
              textShadow: "0 6px 30px rgba(0,0,0,0.3)",
            }}
          >
            {titleNepali}
          </div>
        </FadeUp>
        <FadeUp delay={48}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: COLORS.gold,
              textAlign: "center",
            }}
          >
            {titleEnglish}
          </div>
        </FadeUp>
        <FadeUp delay={70}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              lineHeight: 1.45,
              maxWidth: 800,
            }}
          >
            {message}
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div style={{ marginTop: 40 }}>
            <Logo size={90} />
          </div>
        </FadeUp>
      </AbsoluteFill>
      <Vignette />
    </AbsoluteFill>
  );
};
