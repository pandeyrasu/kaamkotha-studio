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
import { KineticWords, FadeUp } from "../components/KineticText";
import { EndCard, Watermark } from "../components/Chrome";

export const quizReelSchema = z.object({
  question: z.string(),
  questionHighlights: z.array(z.string()).default([]),
  timerSeconds: z.number().default(5),
  commentPrompt: z.string(),
  cta: z.string(),
});

export type QuizReelProps = z.infer<typeof quizReelSchema>;

export const QUIZ_REEL_DURATION = 540; // 18s

const TimerRing: React.FC<{ seconds: number }> = ({ seconds }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = seconds * fps;
  const progress = Math.min(frame / total, 1);
  const remaining = Math.max(seconds - Math.floor(frame / fps), 0);
  const r = 150;
  const circumference = 2 * Math.PI * r;
  const pop = spring({ frame: frame % fps, fps, config: { damping: 10 } });

  return (
    <div style={{ position: "relative", width: 360, height: 360 }}>
      <svg width={360} height={360} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={180} cy={180} r={r} stroke="rgba(255,255,255,0.15)" strokeWidth={20} fill="none" />
        <circle
          cx={180}
          cy={180}
          r={r}
          stroke={COLORS.gold}
          strokeWidth={20}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * progress}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_FAMILY,
          fontWeight: 900,
          fontSize: 130,
          color: "#fff",
          transform: `scale(${0.9 + pop * 0.1})`,
        }}
      >
        {remaining}
      </div>
    </div>
  );
};

/** Question → ticking countdown ring → "answer in the comments" CTA. */
export const QuizReel: React.FC<QuizReelProps> = (props) => {
  const { fps } = useVideoConfig();
  const timerFrames = props.timerSeconds * fps;

  return (
    <GradientBG>
      <AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
        <Sequence durationInFrames={120}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 90 }}>
            <KineticWords
              text={props.question}
              highlightWords={props.questionHighlights}
              fontSize={82}
              delay={8}
            />
          </AbsoluteFill>
        </Sequence>

        <Sequence from={120} durationInFrames={timerFrames + 60}>
          <AbsoluteFill style={{ alignItems: "center", padding: "160px 90px 0" }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                textAlign: "center",
                lineHeight: 1.3,
                marginBottom: 90,
              }}
            >
              {props.question}
            </div>
            <TimerRing seconds={props.timerSeconds} />
            <FadeUp delay={timerFrames} distance={40}>
              <div
                style={{
                  marginTop: 100,
                  fontSize: 60,
                  fontWeight: 900,
                  color: COLORS.gold,
                  textAlign: "center",
                }}
              >
                {props.commentPrompt} 👇
              </div>
            </FadeUp>
          </AbsoluteFill>
        </Sequence>

        <Sequence from={120 + timerFrames + 60}>
          <EndCard cta={props.cta} />
        </Sequence>

        <Vignette />
        <Watermark />
      </AbsoluteFill>
    </GradientBG>
  );
};
