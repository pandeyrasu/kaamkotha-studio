import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../brand";

/** Slow-drifting blurred blobs over a two-stop gradient. */
export const GradientBG: React.FC<{
  from?: string;
  to?: string;
  accent?: string;
  children?: React.ReactNode;
}> = ({ from = COLORS.navyDeep, to = COLORS.navy, accent = COLORS.crimson, children }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 55) * 60;
  const drift2 = Math.cos(frame / 70) * 80;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)` }}>
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: accent,
          opacity: 0.22,
          filter: "blur(160px)",
          top: -250 + drift,
          right: -300,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: COLORS.gold,
          opacity: 0.12,
          filter: "blur(150px)",
          bottom: -200,
          left: -250 + drift2,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/** Subtle dot grid used on education / carousel layouts. */
export const DotGrid: React.FC<{ color?: string; opacity?: number }> = ({
  color = "#FFFFFF",
  opacity = 0.06,
}) => (
  <AbsoluteFill
    style={{
      backgroundImage: `radial-gradient(${color} 2.5px, transparent 2.5px)`,
      backgroundSize: "44px 44px",
      opacity,
    }}
  />
);

/** Vignette to focus attention on center content. */
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
      pointerEvents: "none",
    }}
  />
);

/** Full-screen flash used on hard cuts / reveals. */
export const Flash: React.FC<{ at: number; duration?: number }> = ({ at, duration = 8 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 2, at + duration], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ background: "#fff", opacity, pointerEvents: "none" }} />;
};
