import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, PILLARS, PillarKey } from "../brand";
import { Logo } from "./Logo";

/** Small pillar chip shown top-left of reels. */
export const PillarBadge: React.FC<{ pillar: PillarKey; delay?: number }> = ({
  pillar,
  delay = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
  const p = PILLARS[pillar];
  return (
    <div
      style={{
        position: "absolute",
        top: 90,
        left: 60,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 28px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.12)",
        border: `2px solid ${p.color}`,
        fontFamily: FONT_FAMILY,
        fontWeight: 700,
        fontSize: 30,
        color: "#fff",
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-40, 0])}px)`,
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: p.color,
        }}
      />
      {p.label}
    </div>
  );
};

/** Watermark bottom corner. */
export const Watermark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 70,
      right: 60,
      fontFamily: FONT_FAMILY,
      fontWeight: 700,
      fontSize: 30,
      color: "rgba(255,255,255,0.55)",
      letterSpacing: 1,
    }}
  >
    @kaamkotha
  </div>
);

/** Reusable outro: logo pop + CTA. Place inside a <Sequence>. */
export const EndCard: React.FC<{ cta?: string; sub?: string }> = ({
  cta = "Download KaamKotha",
  sub = "Rooms · Jobs · Community — for Nepalese in the UK 🇳🇵",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const btn = spring({ frame: frame - 14, fps, config: { damping: 13 } });
  const pulse = 1 + Math.sin(Math.max(0, frame - 26) / 7) * 0.02;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 70,
        fontFamily: FONT_FAMILY,
      }}
    >
      <Logo size={170} animateIn stacked />
      <div
        style={{
          padding: "30px 76px",
          borderRadius: 999,
          background: COLORS.crimson,
          color: "#fff",
          fontWeight: 900,
          fontSize: 52,
          opacity: btn,
          transform: `scale(${btn * pulse})`,
          boxShadow: "0 20px 60px rgba(200,16,46,0.45)",
        }}
      >
        {cta}
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.75)",
          fontWeight: 600,
          fontSize: 34,
          opacity: interpolate(frame, [24, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {sub}
      </div>
    </div>
  );
};
