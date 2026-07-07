import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../brand";
import { LogoMark } from "./LogoMark";

/**
 * KaamKotha wordmark: rounded "KK" tile + wordmark.
 * `animateIn` pops the mark with a spring starting at `delay` frames.
 */
export const Logo: React.FC<{
  size?: number;
  animateIn?: boolean;
  delay?: number;
  stacked?: boolean;
  onDark?: boolean;
}> = ({ size = 120, animateIn = false, delay = 0, stacked = false, onDark = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = animateIn
    ? spring({ frame: frame - delay, fps, config: { damping: 12, mass: 0.6 } })
    : 1;
  const wordOpacity = animateIn
    ? interpolate(frame - delay, [8, 22], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: "center",
        gap: size * 0.25,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          display: "flex",
          transform: `scale(${pop}) rotate(${interpolate(pop, [0, 1], [-12, 0])}deg)`,
          filter: onDark
            ? "drop-shadow(0 10px 30px rgba(0,0,0,0.45)) drop-shadow(0 0 2px rgba(255,255,255,0.35))"
            : "drop-shadow(0 10px 26px rgba(20,17,24,0.25))",
        }}
      >
        <LogoMark height={size} />
      </div>
      <div
        style={{
          opacity: wordOpacity,
          fontWeight: 900,
          fontSize: size * 0.52,
          color: onDark ? COLORS.white : COLORS.ink,
          letterSpacing: -1,
          textAlign: stacked ? "center" : "left",
        }}
      >
        Kaam<span style={{ color: COLORS.gold }}>Kotha</span>
      </div>
    </div>
  );
};
