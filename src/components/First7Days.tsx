'use client'

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDialKit } from 'dialkit';

const steps = [
  {
    day: 'Day 1',
    title: 'Kickoff Alignment Call',
    description:
      'We align on goals, positioning, and target audience to build a tailored strategy.',
    dates: [9],
  },
  {
    day: 'Day 2',
    title: 'Account & Competitor Audits',
    description:
      'Deep dive into your profile, competitors, and market to find untapped opportunities.',
    dates: [10],
  },
  {
    day: 'Day 3',
    title: 'Positioning & Messaging',
    description:
      'Refine your personal brand messaging to resonate with your ideal clients.',
    dates: [11],
  },
  {
    day: 'Day 4',
    title: 'Live Profile Updates',
    description:
      'We optimize your LinkedIn profile — headline, about section, featured, and banner.',
    dates: [14],
  },
  {
    day: 'Day 5–6',
    title: 'First Content Published',
    description:
      'Your first batch of content goes live — posts, carousels, or video tailored to your voice.',
    dates: [15, 16],
  },
  {
    day: 'Day 7',
    title: 'Outreach Campaign Launch',
    description:
      'Personalized outreach begins — connecting with ideal prospects at scale.',
    dates: [17],
  },
];

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// April 2026 — starts on Wednesday (col index 3)
const APRIL_ROWS: (number | null)[][] = [
  [null, null, null,    1,    2,    3,    4],
  [   5,    6,    7,    8,    9,   10,   11],
  [  12,   13,   14,   15,   16,   17,   18],
  [  19,   20,   21,   22,   23,   24,   25],
  [  26,   27,   28,   29,   30, null, null],
];

const ALL_STEP_DATES = new Set([9, 10, 11, 14, 15, 16, 17]);
const TODAY = 8;
const STACK_CARD_BG = '#1C1C1C';
const STACK_CARD_TEXT = '#EDEDED';
const STACK_BADGE_BG = '#0178FA';
const STACK_BADGE_TEXT = '#EDEDED';
// Scroll pixels allocated per card step
const SCROLL_PER_STEP = 650;

type CellStatus = 'empty' | 'active' | 'done' | 'upcoming' | 'today' | 'past' | 'neutral';


export default function First7Days() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = steps.length - 1;

  const dial = {
    typography: {
      titleSize: 21,
      titleLineHeight: 0.96,
      paragraphSize: 26,
      paragraphLineHeight: 1.08,
      dayBadgeSize: 20,
      dayBadgeXPad: 9,
      dayBadgeYPad: 9,
    },
    card: {
      width: 450,
      height: 260,
      padding: 27,
      radius: 12,
      headingGap: 24,
    },
    stack: {
      revealOffset: 90,
      viewportHeight: 720,
      enterFromY: 700,
    },
  };

  const cal = useDialKit('Calendar', {
    card: {
      background:    { type: 'color' as const, default: '#171717' },
      borderColor:   { type: 'color' as const, default: '#ffffff' },
      borderOpacity: [0.09, 0, 1],
      borderRadius:  [38, 0, 80],
      padding:       [50, 8, 80],
      gapFromCards:  [0, 0, 120],
      width:         [580, 280, 900],
    },
    month: {
      fontSize:     [40, 16, 64],
      color:        { type: 'color' as const, default: '#EDEDED' },
      paddingBelow: [19, 0, 80],
    },
    weekdays: {
      fontSize:      [12, 8, 22],
      color:         { type: 'color' as const, default: '#ffffff' },
      colorOpacity:  [1, 0, 1],
      letterSpacing: [0.09, 0, 0.5],
      paddingBelow:  [31, 0, 60],
    },
    cell: {
      size:        [54, 24, 90],
      rowPadding:  [45, -20, 60],
      fontSize:    [19, 10, 36],
      ringColor:   { type: 'color' as const, default: '#ffffff' },
      ringOpacity: [0.11, 0, 0.6],
    },
    activeDate: {
      background:   { type: 'color' as const, default: '#0178FA' },
      textColor:    { type: 'color' as const, default: '#ffffff' },
      cornerRadius: [31, 0, 50],
    },
    textColors: {
      upcoming: { type: 'color' as const, default: '#0178FA' },
      done:     { type: 'color' as const, default: '#0178FA' },
      past:     { type: 'color' as const, default: '#ffffff' },
      today:    { type: 'color' as const, default: '#ffffff' },
      neutral:  { type: 'color' as const, default: '#ffffff' },
      upcomingOpacity: [1,    0, 1],
      doneOpacity:     [1,    0, 1],
      pastOpacity:     [0.35, 0, 1],
      todayOpacity:    [0.25, 0, 1],
      neutralOpacity:  [0.35, 0, 1],
    },
  });

  // Helper: hex color + opacity → rgba string
  const rgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  // Capture dial values at mount time for GSAP (runs once)
  const dialRef = useRef(dial);
  useEffect(() => { dialRef.current = dial; });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    const { revealOffset, enterFromY } = dialRef.current.stack;

    // Set all cards to initial hidden state (below + pitched forward)
    gsap.set(cards, {
      y: enterFromY,
      rotateX: 72,
      opacity: 0,
    });

    // Build the animation timeline — each card flips up into its stacked slot
    const tl = gsap.timeline();
    cards.forEach((card, i) => {
      tl.to(card, {
        y: i * revealOffset,
        rotateX: 0,
        opacity: 1,
        ease: 'power3.out',
        duration: 1,
      });
    });

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'bottom bottom',
      end: `+=${steps.length * SCROLL_PER_STEP}`,
      pin: true,
      scrub: 1.4,
      anticipatePin: 1,
      animation: tl,
      onUpdate(self) {
        const idx = Math.min(lastIndex, Math.floor(self.progress * steps.length));
        setActiveIndex(idx);
      },
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const step = steps[activeIndex];
  const activeDates = new Set(step.dates);

  const doneDates = new Set<number>();
  steps.slice(0, activeIndex).forEach(s => s.dates.forEach(d => doneDates.add(d)));

  const getCellStatus = (day: number | null): CellStatus => {
    if (day === null)         return 'empty';
    if (activeDates.has(day)) return 'active';
    if (doneDates.has(day))   return 'done';
    if (day === TODAY)        return 'today';
    if (day < TODAY)          return 'past';
    if (ALL_STEP_DATES.has(day)) return 'upcoming';
    return 'neutral';
  };

  return (
    <section
      ref={sectionRef}
      id="first-7-days"
      className="hero-left grid-pattern grid-pattern-left relative pt-20 pb-4 px-4"
      style={{ minHeight: '100vh', borderTop: '1px solid rgba(255,255,255,0.18)', borderBottom: '1px solid rgba(255,255,255,0.18)' }}
    >
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Your <span className="highlight">Timeline</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          A day-by-day launch sequence that takes your LinkedIn from setup to outreach in one focused week.
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-start" style={{ gap: cal.card.gapFromCards }}>

          {/* ── Left panel — stacked cards ── */}
          <div className="flex-1 flex items-start justify-center p-2 md:p-4 lg:p-6">
            <div className="w-full" style={{ maxWidth: dial.card.width }}>
              <div
                className="seven-days-stack-shell"
                style={{
                  height: dial.card.height + (steps.length - 1) * dial.stack.revealOffset,
                }}
              >
                {steps.map((item, i) => (
                  <article
                    key={item.day}
                    ref={el => { cardRefs.current[i] = el; }}
                    className="seven-days-stack-card"
                    style={{
                      zIndex: i + 1,
                      padding: dial.card.padding,
                      borderRadius: dial.card.radius,
                      background: STACK_CARD_BG,
                      height: dial.card.height,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                    aria-hidden={i > activeIndex}
                  >
                    <div className="flex items-start gap-4" style={{ marginBottom: dial.card.headingGap }}>
                      <span
                        className="inline-flex items-center justify-center leading-none font-bold whitespace-nowrap"
                        style={{
                          color: STACK_BADGE_TEXT,
                          background: STACK_BADGE_BG,
                          fontFamily: 'var(--font-martian-mono), monospace',
                          fontSize: dial.typography.dayBadgeSize,
                          padding: `${dial.typography.dayBadgeYPad}px ${dial.typography.dayBadgeXPad}px`,
                        }}
                      >
                        {item.day}
                      </span>
                      <h3
                        className="font-semibold tracking-tight"
                        style={{
                          color: STACK_CARD_TEXT,
                          fontFamily: 'var(--font-martian-mono), monospace',
                          fontSize: dial.typography.titleSize,
                          lineHeight: dial.typography.titleLineHeight,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className="font-semibold max-w-[92%]"
                      style={{
                        color: STACK_CARD_TEXT,
                        fontSize: dial.typography.paragraphSize,
                        lineHeight: dial.typography.paragraphLineHeight,
                      }}
                    >
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right panel — Calendar ── */}
          <div className="flex-1 hidden md:flex items-start justify-center p-2 md:p-4 lg:p-6">
            <div
              className="w-full flex flex-col"
              style={{
                maxWidth:     cal.card.width,
                height:       dial.card.height + (steps.length - 1) * dial.stack.revealOffset,
                padding:      cal.card.padding,
                borderRadius: cal.card.borderRadius,
                background:   cal.card.background,
                border:       `1px solid ${rgba(cal.card.borderColor, cal.card.borderOpacity)}`,
              }}
            >
              {/* Month header */}
              <div className="flex items-center justify-between" style={{ marginBottom: cal.month.paddingBelow }}>
                <button disabled className="cursor-default select-none leading-none" style={{ color: rgba(cal.month.color, 0.3), fontSize: cal.month.fontSize }} aria-hidden="true">‹</button>
                <span className="font-semibold tracking-tight" style={{ color: cal.month.color, fontSize: cal.month.fontSize }}>
                  April 2026
                </span>
                <button disabled className="cursor-default select-none leading-none" style={{ color: rgba(cal.month.color, 0.3), fontSize: cal.month.fontSize }} aria-hidden="true">›</button>
              </div>

              {/* Day-of-week headers */}
              <div className="grid grid-cols-7" style={{ marginBottom: cal.weekdays.paddingBelow }}>
                {WEEK_DAYS.map(d => (
                  <div
                    key={d}
                    className="text-center font-bold"
                    style={{
                      fontFamily:    'var(--font-subtext)',
                      fontSize:      cal.weekdays.fontSize,
                      color:         rgba(cal.weekdays.color, cal.weekdays.colorOpacity),
                      letterSpacing: `${cal.weekdays.letterSpacing}em`,
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Date grid */}
              <div className="flex-1 flex flex-col justify-start" style={{ gap: cal.cell.rowPadding }}>
              {APRIL_ROWS.map((row, ri) => (
                <div key={ri} className="grid grid-cols-7">
                  {row.map((day, ci) => {
                    const status = getCellStatus(day);
                    if (status === 'empty') return <div key={`${ri}-${ci}`} />;

                    const isActive = status === 'active';

                    const textColor = isActive ? cal.activeDate.textColor : (() => {
                      switch (status) {
                        case 'upcoming': return rgba(cal.textColors.upcoming, cal.textColors.upcomingOpacity);
                        case 'done':     return rgba(cal.textColors.done,     cal.textColors.doneOpacity);
                        case 'past':     return rgba(cal.textColors.past,     cal.textColors.pastOpacity);
                        case 'today':    return rgba(cal.textColors.today,    cal.textColors.todayOpacity);
                        default:         return rgba(cal.textColors.neutral,  cal.textColors.neutralOpacity);
                      }
                    })();

                    return (
                      <div key={`${ri}-${ci}`} className="flex flex-col items-center">
                        <div
                          className="flex items-center justify-center font-semibold transition-all duration-300"
                          style={{
                            width:        cal.cell.size,
                            height:       cal.cell.size,
                            fontSize:     cal.cell.fontSize,
                            borderRadius: isActive ? cal.activeDate.cornerRadius : '50%',
                            background:   isActive ? cal.activeDate.background : 'transparent',
                            border:       `1px solid ${rgba(cal.cell.ringColor, cal.cell.ringOpacity)}`,
                            color:        textColor,
                          }}
                        >
                          {day}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
