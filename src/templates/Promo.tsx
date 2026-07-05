import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { COLORS, FONT_FAMILY } from "../brand";
import { Flash } from "../components/Backgrounds";
import { Logo } from "../components/Logo";

/**
 * Ad-style promo layout (light theme, hero visual, offer badge) —
 * modelled on classic ISP/telecom posters: mixed Nepali/English headline,
 * a giant accent word, an offer box, detail card with a % badge and a
 * disclaimer strip. `PromoPoster` renders it as a single still;
 * `PromoReel` is the animated 9:16 version of the same props.
 */
export const promoSchema = z.object({
  kicker: z.string(),
  headline: z.array(z.object({ text: z.string(), accent: z.boolean() })),
  megaWord: z.string(),
  offerTitle: z.string(),
  offerSub: z.string(),
  /** staticFile() name inside public/ or full URL. Empty string = emoji hero. */
  heroImage: z.string(),
  heroEmojis: z.array(z.string()),
  detailTitle: z.string(),
  detailLines: z.array(z.string()),
  badgeValue: z.string(),
  badgeSuffix: z.string(),
  disclaimer: z.string(),
});

export type PromoProps = z.infer<typeof promoSchema>;

export const PROMO_REEL_DURATION = 450; // 15s

/* ── shared pieces ─────────────────────────────────────────────────── */

const HeadlineText: React.FC<{ segments: PromoProps["headline"]; fontSize: number }> = ({
  segments,
  fontSize,
}) => (
  <div
    style={{
      fontFamily: FONT_FAMILY,
      fontWeight: 900,
      fontSize,
      lineHeight: 1.18,
      color: COLORS.ink,
    }}
  >
    {segments.map((s, i) => (
      <span key={i} style={{ color: s.accent ? COLORS.crimson : COLORS.ink }}>
        {s.text}{" "}
      </span>
    ))}
  </div>
);

/** Hero: photo if provided, otherwise emoji cluster on radiating red rings. */
const Hero: React.FC<{ props: PromoProps; size: number; animate?: boolean }> = ({
  props,
  size,
  animate = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (props.heroImage) {
    return (
      <Img
        src={props.heroImage}
        style={{
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: size * 0.06,
        }}
      />
    );
  }

  const positions = [
    { x: 0.5, y: 0.22, s: 1.25 },
    { x: 0.16, y: 0.55, s: 1 },
    { x: 0.82, y: 0.5, s: 1.05 },
    { x: 0.32, y: 0.84, s: 0.9 },
    { x: 0.7, y: 0.86, s: 0.95 },
  ];

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {[0.95, 0.72, 0.5].map((r, i) => {
        const pulse = animate ? 1 + Math.sin((frame - i * 12) / 22) * 0.03 : 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size * r,
              height: size * r * 0.62,
              transform: `translate(-50%, -50%) scale(${pulse})`,
              borderRadius: "50%",
              border: `${size * 0.012}px solid ${COLORS.crimson}`,
              opacity: 0.22 + i * 0.14,
              boxShadow: `0 0 ${size * 0.06}px rgba(200,16,46,0.35)`,
            }}
          />
        );
      })}
      {props.heroEmojis.map((emoji, i) => {
        const p = positions[i % positions.length];
        const pop = animate
          ? spring({ frame: frame - 10 - i * 8, fps, config: { damping: 10, mass: 0.7 } })
          : 1;
        const bob = animate ? Math.sin((frame + i * 25) / 18) * size * 0.012 : 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x * size,
              top: p.y * size + bob,
              transform: `translate(-50%, -50%) scale(${pop * p.s})`,
              fontSize: size * 0.22,
              filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.25))",
            }}
          >
            {emoji}
          </div>
        );
      })}
    </div>
  );
};

const Badge: React.FC<{ value: string; suffix: string; size: number; rotate?: number }> = ({
  value,
  suffix,
  size,
  rotate = 0,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `linear-gradient(140deg, ${COLORS.crimson}, ${COLORS.crimsonDark})`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontFamily: FONT_FAMILY,
      boxShadow: "0 18px 46px rgba(200,16,46,0.4)",
      transform: `rotate(${rotate}deg)`,
      flexShrink: 0,
    }}
  >
    <div style={{ fontSize: size * 0.34, fontWeight: 900, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: size * 0.14, fontWeight: 700, letterSpacing: 2 }}>{suffix}</div>
  </div>
);

const OfferBox: React.FC<{ title: string; sub: string; fontScale?: number }> = ({
  title,
  sub,
  fontScale = 1,
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 28,
      padding: "30px 44px",
      boxShadow: "0 14px 40px rgba(20,17,24,0.12)",
      border: "1px solid rgba(20,17,24,0.06)",
      fontFamily: FONT_FAMILY,
      alignSelf: "flex-start",
    }}
  >
    <div style={{ fontSize: 38 * fontScale, fontWeight: 700, color: COLORS.ink }}>{title}</div>
    <div style={{ fontSize: 52 * fontScale, fontWeight: 900, color: COLORS.crimson }}>{sub}</div>
  </div>
);

/* ── still poster (1080×1350) ──────────────────────────────────────── */

export const PromoPoster: React.FC<PromoProps> = (props) => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(175deg, #FFFFFF 0%, ${COLORS.cream} 70%, #FBE9E4 100%)`,
        fontFamily: FONT_FAMILY,
        padding: 64,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo size={80} onDark={false} />
        <div
          style={{
            padding: "12px 30px",
            borderRadius: 999,
            background: COLORS.crimson,
            color: "#fff",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 2,
          }}
        >
          {props.kicker}
        </div>
      </div>

      <div style={{ display: "flex", marginTop: 44, gap: 24, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1.15, display: "flex", flexDirection: "column", gap: 28 }}>
          <HeadlineText segments={props.headline} fontSize={56} />
          <div
            style={{
              fontSize: 128,
              fontWeight: 900,
              color: COLORS.crimson,
              lineHeight: 0.95,
              letterSpacing: -4,
              textShadow: "0 6px 0 rgba(142,11,32,0.25)",
            }}
          >
            {props.megaWord}
          </div>
          <OfferBox title={props.offerTitle} sub={props.offerSub} fontScale={0.85} />
        </div>
        <div style={{ flex: 0.85, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Hero props={props} size={400} />
        </div>
      </div>

      <div
        style={{
          marginTop: 30,
          background: "#fff",
          borderRadius: 34,
          padding: "34px 46px",
          display: "flex",
          alignItems: "center",
          gap: 44,
          boxShadow: "0 18px 50px rgba(20,17,24,0.12)",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.crimson }}>
            {props.detailTitle}
          </div>
          {props.detailLines.map((line, i) => (
            <div
              key={i}
              style={{ fontSize: 32, fontWeight: 600, color: COLORS.ink, lineHeight: 1.45 }}
            >
              {line}
            </div>
          ))}
        </div>
        <Badge value={props.badgeValue} suffix={props.badgeSuffix} size={190} rotate={4} />
      </div>

      <div
        style={{
          marginTop: 22,
          textAlign: "center",
          fontSize: 24,
          fontWeight: 600,
          color: "rgba(20,17,24,0.55)",
        }}
      >
        {props.disclaimer}
      </div>
    </AbsoluteFill>
  );
};

/* ── animated reel (1080×1920, 15s) ────────────────────────────────── */

export const PromoReel: React.FC<PromoProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerS = spring({ frame: frame - 4, fps, config: { damping: 14 } });
  const headS = spring({ frame: frame - 14, fps, config: { damping: 14 } });
  const megaS = spring({ frame: frame - 48, fps, config: { damping: 9, mass: 0.8 } });
  const offerS = spring({ frame: frame - 90, fps, config: { damping: 13 } });
  const cardS = spring({ frame: frame - 200, fps, config: { damping: 14 } });
  const badgeS = spring({ frame: frame - 230, fps, config: { damping: 8, mass: 0.9 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(175deg, #FFFFFF 0%, ${COLORS.cream} 70%, #FBE9E4 100%)`,
        fontFamily: FONT_FAMILY,
        padding: 70,
      }}
    >
      <Flash at={48} duration={7} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo size={80} onDark={false} />
        <div
          style={{
            padding: "12px 30px",
            borderRadius: 999,
            background: COLORS.crimson,
            color: "#fff",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 2,
            opacity: kickerS,
            transform: `translateY(${interpolate(kickerS, [0, 1], [-30, 0])}px)`,
          }}
        >
          {props.kicker}
        </div>
      </div>

      <div
        style={{
          marginTop: 60,
          opacity: headS,
          transform: `translateY(${interpolate(headS, [0, 1], [50, 0])}px)`,
        }}
      >
        <HeadlineText segments={props.headline} fontSize={66} />
      </div>

      <div
        style={{
          fontSize: 170,
          fontWeight: 900,
          color: COLORS.crimson,
          lineHeight: 0.95,
          letterSpacing: -5,
          marginTop: 30,
          transform: `scale(${megaS}) rotate(${interpolate(megaS, [0, 1], [-6, 0])}deg)`,
          transformOrigin: "left center",
          textShadow: "0 8px 0 rgba(142,11,32,0.25)",
        }}
      >
        {props.megaWord}
      </div>

      <div
        style={{
          marginTop: 36,
          opacity: offerS,
          transform: `translateX(${interpolate(offerS, [0, 1], [-90, 0])}px)`,
          display: "flex",
        }}
      >
        <OfferBox title={props.offerTitle} sub={props.offerSub} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Hero props={props} size={400} animate />
      </div>

      <div
        style={{
          marginTop: "auto",
          background: "#fff",
          borderRadius: 34,
          padding: "36px 46px",
          display: "flex",
          alignItems: "center",
          gap: 44,
          boxShadow: "0 18px 50px rgba(20,17,24,0.14)",
          opacity: cardS,
          transform: `translateY(${interpolate(cardS, [0, 1], [140, 0])}px)`,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: COLORS.crimson }}>
            {props.detailTitle}
          </div>
          {props.detailLines.map((line, i) => (
            <div
              key={i}
              style={{ fontSize: 34, fontWeight: 600, color: COLORS.ink, lineHeight: 1.45 }}
            >
              {line}
            </div>
          ))}
        </div>
        <Badge
          value={props.badgeValue}
          suffix={props.badgeSuffix}
          size={190}
          rotate={interpolate(badgeS, [0, 1], [-160, 4])}
        />
      </div>

      <div
        style={{
          marginTop: 20,
          textAlign: "center",
          fontSize: 25,
          fontWeight: 600,
          color: "rgba(20,17,24,0.55)",
          opacity: interpolate(frame, [260, 285], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {props.disclaimer}
      </div>
    </AbsoluteFill>
  );
};
