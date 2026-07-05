import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../brand";

/**
 * Word-by-word kinetic pop-in. Each word springs up with a slight
 * rotation; `highlightWords` get the accent color.
 */
export const KineticWords: React.FC<{
  text: string;
  delay?: number;
  wordStagger?: number;
  fontSize?: number;
  color?: string;
  highlightColor?: string;
  highlightWords?: string[];
  align?: "left" | "center";
  fontWeight?: number;
  lineHeight?: number;
}> = ({
  text,
  delay = 0,
  wordStagger = 4,
  fontSize = 84,
  color = "#fff",
  highlightColor = "#F2B705",
  highlightWords = [],
  align = "center",
  fontWeight = 900,
  lineHeight = 1.15,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  const lowered = highlightWords.map((w) => w.toLowerCase());

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize,
        fontWeight,
        color,
        lineHeight,
        textAlign: align,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: `0 ${fontSize * 0.28}px`,
      }}
    >
      {words.map((word, i) => {
        const start = delay + i * wordStagger;
        const s = spring({
          frame: frame - start,
          fps,
          config: { damping: 14, mass: 0.5 },
        });
        const isHot = lowered.includes(
          word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "")
        );
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px) scale(${interpolate(s, [0, 1], [0.85, 1])})`,
              color: isHot ? highlightColor : color,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/** Simple fade+rise for secondary copy. */
export const FadeUp: React.FC<{
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  distance?: number;
}> = ({ delay = 0, duration = 14, children, distance = 30 }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * distance}px)`,
      }}
    >
      {children}
    </div>
  );
};
