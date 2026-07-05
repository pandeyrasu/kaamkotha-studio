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
import {
  PromoPoster,
  PromoReel,
  promoSchema,
  PromoProps,
  PROMO_REEL_DURATION,
} from "./templates/Promo";
import {
  MatchDayCard,
  MatchDayReel,
  matchDaySchema,
  MatchDayProps,
  MATCH_DAY_REEL_DURATION,
} from "./templates/MatchDay";

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

/** Sample props for the topical compositions — override at render time with --props. */
export const SAMPLE_PROMO: PromoProps = {
  kicker: "KAAMKOTHA OFFER",
  headline: [
    { text: "Room पनि", accent: false },
    { text: "verified,", accent: true },
    { text: "job पनि", accent: false },
    { text: "verified —", accent: true },
    { text: "सबै", accent: false },
  ],
  megaWord: "FREE!",
  offerTitle: "Refer गर्दा दुवैले पाउनुहोस्",
  offerSub: "1 Month Featured Listing",
  heroImage: "",
  heroEmojis: ["🏠", "💼", "🛕", "🥟", "🎉"],
  detailTitle: "This month only",
  detailLines: ["Invite a friend to KaamKotha र", "Business listing मा पाउनुहोस्"],
  badgeValue: "50%",
  badgeSuffix: "OFF",
  disclaimer: "Offer valid for UK-registered businesses only. Ends 30 April 2026.*",
};

export const SAMPLE_MATCH: MatchDayProps = {
  tournament: "FIFA World Cup 2026",
  dateLine: "Today · Sunday 5 July",
  homeTeam: "England",
  homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  awayTeam: "Mexico",
  awayFlag: "🇲🇽",
  timeLine: "Kick-off 5:00 PM UK",
  tvLine: "BBC One · iPlayer",
  hook: "Momo स्टीममा, TV अन — where is the UK Nepali fam watching today? 🥟⚽",
  commentPrompt: "Score prediction",
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
      <Folder name="Topical">
        <Composition
          id="Promo-Poster"
          component={PromoPoster}
          schema={promoSchema}
          durationInFrames={1}
          fps={reel.fps}
          width={portrait.width}
          height={portrait.height}
          defaultProps={SAMPLE_PROMO}
        />
        <Composition
          id="Promo-Reel"
          component={PromoReel}
          schema={promoSchema}
          durationInFrames={PROMO_REEL_DURATION}
          fps={reel.fps}
          width={reel.width}
          height={reel.height}
          defaultProps={SAMPLE_PROMO}
        />
        <Composition
          id="Match-Card"
          component={MatchDayCard}
          schema={matchDaySchema}
          durationInFrames={1}
          fps={reel.fps}
          width={square.width}
          height={square.height}
          defaultProps={SAMPLE_MATCH}
        />
        <Composition
          id="Match-Reel"
          component={MatchDayReel}
          schema={matchDaySchema}
          durationInFrames={MATCH_DAY_REEL_DURATION}
          fps={reel.fps}
          width={reel.width}
          height={reel.height}
          defaultProps={SAMPLE_MATCH}
        />
      </Folder>
    </>
  );
};
