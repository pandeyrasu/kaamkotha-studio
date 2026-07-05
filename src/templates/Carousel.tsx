import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { z } from "zod";
import { COLORS, FONT_FAMILY, PILLARS, PillarKey } from "../brand";
import { DotGrid } from "../components/Backgrounds";
import { Logo } from "../components/Logo";

/**
 * IG/FB carousel (1080×1350). One slide per FRAME: frame 0 = cover,
 * frames 1..n = tip slides, last frame = CTA slide.
 * The render script exports each frame as a separate PNG.
 */
export const carouselSchema = z.object({
  cover: z.object({
    kicker: z.string(),
    title: z.string(),
    sub: z.string(),
  }),
  slides: z.array(
    z.object({
      heading: z.string(),
      body: z.string(),
      emoji: z.string(),
    })
  ),
  outro: z.object({
    title: z.string(),
    body: z.string(),
    cta: z.string(),
  }),
  pillar: z.enum(["promo", "education", "entertainment", "trending", "virality", "cultural"]),
});

export type CarouselProps = z.infer<typeof carouselSchema>;

export const carouselSlideCount = (props: CarouselProps) => props.slides.length + 2;

const Frame: React.FC<{ accent: string; children: React.ReactNode; footer: string }> = ({
  accent,
  children,
  footer,
}) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(165deg, ${COLORS.navyDeep} 0%, ${COLORS.navy} 100%)`,
      fontFamily: FONT_FAMILY,
      padding: 90,
    }}
  >
    <DotGrid />
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14, background: accent }} />
    <AbsoluteFill style={{ padding: 90, display: "flex", flexDirection: "column" }}>
      {children}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo size={64} />
        <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 26 }}>
          {footer}
        </span>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

export const Carousel: React.FC<CarouselProps> = (props) => {
  const frame = useCurrentFrame();
  const accent = PILLARS[props.pillar as PillarKey].color;
  const total = carouselSlideCount(props);
  const idx = Math.min(frame, total - 1);
  const footer = `${idx + 1} / ${total} · @kaamkotha`;

  if (idx === 0) {
    return (
      <Frame accent={accent} footer={footer}>
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "14px 30px",
            borderRadius: 999,
            background: accent,
            color: "#fff",
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: 2,
            marginBottom: 60,
          }}
        >
          {props.cover.kicker}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.12,
            letterSpacing: -1,
          }}
        >
          {props.cover.title}
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 40,
            fontWeight: 600,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.4,
          }}
        >
          {props.cover.sub}
        </div>
        <div
          style={{
            marginTop: 70,
            fontSize: 34,
            fontWeight: 700,
            color: COLORS.gold,
          }}
        >
          Swipe →
        </div>
      </Frame>
    );
  }

  if (idx <= props.slides.length) {
    const slide = props.slides[idx - 1];
    return (
      <Frame accent={accent} footer={footer}>
        <div style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 60 }}>
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 30,
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
            }}
          >
            {slide.emoji}
          </div>
          <div style={{ fontSize: 100, fontWeight: 900, color: accent }}>
            {String(idx).padStart(2, "0")}
          </div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: 44,
          }}
        >
          {slide.heading}
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 600,
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.5,
          }}
        >
          {slide.body}
        </div>
      </Frame>
    );
  }

  return (
    <Frame accent={accent} footer={footer}>
      <div
        style={{
          fontSize: 84,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.15,
          marginTop: 40,
        }}
      >
        {props.outro.title}
      </div>
      <div
        style={{
          marginTop: 44,
          fontSize: 42,
          fontWeight: 600,
          color: "rgba(255,255,255,0.8)",
          lineHeight: 1.5,
        }}
      >
        {props.outro.body}
      </div>
      <div
        style={{
          marginTop: 80,
          alignSelf: "flex-start",
          padding: "28px 60px",
          borderRadius: 999,
          background: COLORS.crimson,
          color: "#fff",
          fontWeight: 900,
          fontSize: 44,
          boxShadow: "0 18px 50px rgba(200,16,46,0.4)",
        }}
      >
        {props.outro.cta}
      </div>
    </Frame>
  );
};
