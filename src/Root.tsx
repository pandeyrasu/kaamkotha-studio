import React from "react";
import { Composition, Folder } from "remotion";
import { z } from "zod";
import { ensureFonts, FORMATS } from "./brand";
import { CALENDAR, CalendarEntry, TemplateId } from "./data/calendar";
import {
  BrandReveal,
  brandRevealSchema,
  BRAND_REVEAL_DURATION,
} from "./templates/BrandReveal";
import {
  KineticList,
  kineticListSchema,
  kineticListDuration,
  KineticListProps,
} from "./templates/KineticList";
import { MemeText, memeTextSchema, MEME_TEXT_DURATION } from "./templates/MemeText";
import {
  PovFeatures,
  povFeaturesSchema,
  POV_FEATURES_DURATION,
} from "./templates/PovFeatures";
import {
  BeforeAfter,
  beforeAfterSchema,
  BEFORE_AFTER_DURATION,
} from "./templates/BeforeAfter";
import {
  FestivalGreeting,
  festivalGreetingSchema,
  FESTIVAL_GREETING_DURATION,
} from "./templates/FestivalGreeting";
import { QuizReel, quizReelSchema, QuizReelProps } from "./templates/QuizReel";
import {
  CountdownTease,
  countdownTeaseSchema,
  CountdownTeaseProps,
} from "./templates/CountdownTease";
import {
  Carousel,
  carouselSchema,
  carouselSlideCount,
  CarouselProps,
} from "./templates/Carousel";
import { StatCard, statCardSchema } from "./templates/StatCard";

ensureFonts();

type Registry = {
  [K in TemplateId]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.FC<any>;
    schema: z.AnyZodObject;
    duration: (props: never) => number;
    width: number;
    height: number;
  };
};

const { reel, square, portrait } = FORMATS;

const REGISTRY: Registry = {
  BrandReveal: {
    component: BrandReveal,
    schema: brandRevealSchema,
    duration: () => BRAND_REVEAL_DURATION,
    width: reel.width,
    height: reel.height,
  },
  KineticList: {
    component: KineticList,
    schema: kineticListSchema,
    duration: (p) => kineticListDuration(p as KineticListProps),
    width: reel.width,
    height: reel.height,
  },
  MemeText: {
    component: MemeText,
    schema: memeTextSchema,
    duration: () => MEME_TEXT_DURATION,
    width: reel.width,
    height: reel.height,
  },
  PovFeatures: {
    component: PovFeatures,
    schema: povFeaturesSchema,
    duration: () => POV_FEATURES_DURATION,
    width: reel.width,
    height: reel.height,
  },
  BeforeAfter: {
    component: BeforeAfter,
    schema: beforeAfterSchema,
    duration: () => BEFORE_AFTER_DURATION,
    width: reel.width,
    height: reel.height,
  },
  FestivalGreeting: {
    component: FestivalGreeting,
    schema: festivalGreetingSchema,
    duration: () => FESTIVAL_GREETING_DURATION,
    width: reel.width,
    height: reel.height,
  },
  QuizReel: {
    component: QuizReel,
    schema: quizReelSchema,
    duration: (p) => 300 + (p as QuizReelProps).timerSeconds * reel.fps,
    width: reel.width,
    height: reel.height,
  },
  CountdownTease: {
    component: CountdownTease,
    schema: countdownTeaseSchema,
    duration: (p) => (p as CountdownTeaseProps).teaseLines.length * 80 + 180,
    width: reel.width,
    height: reel.height,
  },
  Carousel: {
    component: Carousel,
    schema: carouselSchema,
    // One frame per slide — rendered as a PNG sequence, not a video.
    duration: (p) => carouselSlideCount(p as CarouselProps),
    width: portrait.width,
    height: portrait.height,
  },
  StatCard: {
    component: StatCard,
    schema: statCardSchema,
    duration: () => 1,
    width: square.width,
    height: square.height,
  },
};

export const entryCompositionId = (entry: CalendarEntry) =>
  `Day-${String(entry.day).padStart(2, "0")}-${entry.template}`;

const DayComposition: React.FC<{ entry: CalendarEntry }> = ({ entry }) => {
  const t = REGISTRY[entry.template];
  return (
    <Composition
      id={entryCompositionId(entry)}
      component={t.component}
      schema={t.schema}
      durationInFrames={t.duration(entry.props as never)}
      fps={reel.fps}
      width={t.width}
      height={t.height}
      defaultProps={entry.props}
    />
  );
};

/** One playground composition per template, seeded from a calendar day. */
const playgroundSeeds: Partial<Record<TemplateId, number>> = {
  BrandReveal: 1,
  Carousel: 2,
  MemeText: 3,
  PovFeatures: 4,
  KineticList: 6,
  StatCard: 7,
  FestivalGreeting: 10,
  BeforeAfter: 12,
  QuizReel: 14,
  CountdownTease: 30,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Calendar">
        {CALENDAR.map((entry) => (
          <DayComposition key={entry.day} entry={entry} />
        ))}
      </Folder>
      <Folder name="Templates">
        {(Object.keys(playgroundSeeds) as TemplateId[]).map((id) => {
          const seed = CALENDAR.find((e) => e.day === playgroundSeeds[id])!;
          const t = REGISTRY[id];
          return (
            <Composition
              key={id}
              id={`Template-${id}`}
              component={t.component}
              schema={t.schema}
              durationInFrames={t.duration(seed.props as never)}
              fps={reel.fps}
              width={t.width}
              height={t.height}
              defaultProps={seed.props}
            />
          );
        })}
      </Folder>
    </>
  );
};
