"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

// -----------------------------------------------------------------------------
// Question schema
// -----------------------------------------------------------------------------

type ChoiceQ = {
  id: string;
  kind: "choice";
  prompt: string;
  subtitle?: string;
  options: string[];
  multi?: boolean;
};
type TimeQ = {
  id: string;
  kind: "time";
  prompt: string;
  subtitle?: string;
};
type SliderQ = {
  id: string;
  kind: "slider";
  prompt: string;
  subtitle?: string;
};
type EmailQ = {
  id: string;
  kind: "email";
  prompt: string;
  subtitle?: string;
};
type Question = ChoiceQ | TimeQ | SliderQ | EmailQ;

const questions: Question[] = [
  {
    id: "sleep_challenge",
    kind: "choice",
    prompt: "What's your biggest sleep challenge?",
    options: [
      "Falling asleep",
      "Staying asleep",
      "Waking unrested",
      "I sleep fine, I'm here for recovery",
    ],
  },
  {
    id: "stress",
    kind: "choice",
    prompt: "How would you describe your stress level right now?",
    options: ["Calm", "Mild", "Moderate", "High", "Chronic"],
  },
  {
    id: "bathtub",
    kind: "choice",
    prompt: "Do you have a bathtub at home?",
    subtitle:
      "Either format delivers the same protocol. We adapt the formulation to your hardware.",
    options: ["Yes, I use it", "Yes, but rarely", "No, shower only"],
  },
  {
    id: "frequency",
    kind: "choice",
    prompt: "How often do you bathe or shower at night?",
    options: ["Daily", "3–4× per week", "Occasionally", "Morning only"],
  },
  {
    id: "bedtime",
    kind: "time",
    prompt: "What time do you usually go to bed?",
    subtitle:
      "We time your formulation to land 90 minutes before this — the thermoregulation window.",
  },
  {
    id: "wearable",
    kind: "choice",
    prompt: "Do you track sleep with a wearable?",
    options: [
      "Oura Ring",
      "Whoop",
      "Apple Watch",
      "Garmin",
      "Other",
      "None",
    ],
  },
  {
    id: "sleep_quality",
    kind: "slider",
    prompt: "On average, how would you rate your sleep quality?",
  },
  {
    id: "skin",
    kind: "choice",
    prompt: "How would you describe your skin?",
    options: ["Sensitive", "Normal", "Resilient", "Reactive to fragrance"],
  },
  {
    id: "scent",
    kind: "choice",
    prompt: "Preferred scent profile?",
    options: [
      "Hinoki (Japanese cypress)",
      "Yuzu",
      "Earthy & mineral",
      "Unscented",
      "I'll trust the AI",
    ],
  },
  {
    id: "goal",
    kind: "choice",
    prompt: "What's your primary wellness goal?",
    options: [
      "Better sleep",
      "Recovery from training",
      "Stress relief",
      "Skin health",
      "Mental focus",
    ],
  },
  {
    id: "prior",
    kind: "choice",
    prompt: "Have you tried similar products before?",
    options: [
      "LUSH",
      "Dr Teal's",
      "Both",
      "Neither",
      "I import from Japan",
    ],
  },
  {
    id: "contact",
    kind: "email",
    prompt: "Where should we send your bath prescription?",
    subtitle:
      "We hold your spot in the waitlist with this email. No marketing list. No spam.",
  },
];

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

type Answers = Record<string, string | number | { name?: string; email: string } | undefined>;
type State = { step: number; answers: Answers };
type Action =
  | { type: "answer"; id: string; value: Answers[string] }
  | { type: "next" }
  | { type: "back" }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "answer":
      return { ...state, answers: { ...state.answers, [action.id]: action.value } };
    case "next":
      return { ...state, step: Math.min(state.step + 1, questions.length) };
    case "back":
      return { ...state, step: Math.max(state.step - 1, 0) };
    case "reset":
      return { step: 0, answers: {} };
  }
}

// -----------------------------------------------------------------------------
// Quiz component
// -----------------------------------------------------------------------------

export default function Quiz() {
  const [state, dispatch] = useReducer(reducer, { step: 0, answers: {} });
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

  const total = questions.length;
  const current = questions[state.step];
  const progress = state.step / total;

  // Submit when reaching beyond the last question
  useEffect(() => {
    if (state.step >= total && !submitted) {
      (async () => {
        try {
          const res = await fetch("/api/quiz-submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: state.answers }),
          });
          if (res.ok) {
            const data = await res.json().catch(() => ({}));
            setPosition(typeof data.position === "number" ? data.position : 12848);
          } else {
            setPosition(12848);
          }
        } catch {
          setPosition(12848);
        } finally {
          setSubmitted(true);
        }
      })();
    }
  }, [state.step, state.answers, submitted, total]);

  if (state.step >= total) {
    return <EndScreen position={position} />;
  }

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col bg-sumi text-washi">
      {/* Header — progress bar + step counter */}
      <header className="sticky top-0 z-20 w-full border-b border-ash bg-sumi">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            className="font-display text-[16px] font-light tracking-tight text-washi transition-colors duration-200 hover:text-copper md:text-[18px]"
          >
            Onsen Labo
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-mono text-mist md:text-[11px]">
            {String(state.step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <div className="h-px w-full bg-ash">
          <motion.div
            className="h-px bg-copper"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </header>

      {/* Question */}
      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <QuestionView
                q={current}
                value={state.answers[current.id]}
                onAnswer={(value) => {
                  dispatch({ type: "answer", id: current.id, value });
                  // Auto-advance for single-choice questions
                  if (current.kind === "choice" && !current.multi) {
                    setTimeout(() => dispatch({ type: "next" }), 320);
                  }
                }}
                onSubmit={(value) => {
                  dispatch({ type: "answer", id: current.id, value });
                  dispatch({ type: "next" });
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer — back link */}
      <footer className="w-full border-t border-ash">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
          <button
            type="button"
            onClick={() => dispatch({ type: "back" })}
            disabled={state.step === 0}
            className="group inline-flex items-center font-mono text-[10px] uppercase tracking-mono text-mist transition-colors duration-200 hover:text-copper disabled:cursor-not-allowed disabled:opacity-30 md:text-[11px]"
          >
            <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            Back
          </button>
          <span className="font-mono text-[10px] uppercase tracking-mono text-mineral md:text-[11px]">
            ~ 90 SECONDS
          </span>
        </div>
      </footer>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Question views
// -----------------------------------------------------------------------------

function QuestionView({
  q,
  value,
  onAnswer,
  onSubmit,
}: {
  q: Question;
  value: Answers[string];
  onAnswer: (v: Answers[string]) => void;
  onSubmit: (v: Answers[string]) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-5">
        <h2 className="font-display text-[28px] font-light leading-[1.15] tracking-tight text-washi md:text-[40px]">
          {q.prompt}
        </h2>
        {q.subtitle && (
          <p className="mt-6 max-w-md font-serif text-[14px] font-light leading-relaxed text-mist md:text-[15px]">
            {q.subtitle}
          </p>
        )}
      </div>
      <div className="md:col-span-7">
        {q.kind === "choice" && (
          <ChoiceField q={q} value={value as string | undefined} onAnswer={onAnswer} />
        )}
        {q.kind === "time" && (
          <TimeField value={value as string | undefined} onSubmit={onSubmit} />
        )}
        {q.kind === "slider" && (
          <SliderField value={value as number | undefined} onSubmit={onSubmit} />
        )}
        {q.kind === "email" && (
          <EmailField
            value={value as { name?: string; email: string } | undefined}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

function ChoiceField({
  q,
  value,
  onAnswer,
}: {
  q: ChoiceQ;
  value: string | undefined;
  onAnswer: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
      {q.options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onAnswer(opt)}
            className={`group relative flex items-center border px-6 py-5 text-left font-display text-[16px] font-light leading-snug transition-colors duration-200 md:py-6 md:text-[18px] ${
              selected
                ? "border-copper text-washi"
                : "border-ash text-mist hover:border-mist hover:text-washi"
            }`}
          >
            <span
              className={`absolute left-0 top-0 h-full w-[2px] transition-opacity duration-200 ${
                selected ? "bg-copper opacity-100" : "bg-copper opacity-0"
              }`}
              aria-hidden="true"
            />
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function TimeField({
  value,
  onSubmit,
}: {
  value: string | undefined;
  onSubmit: (v: string) => void;
}) {
  const [local, setLocal] = useState(value ?? "23:00");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(local);
      }}
      className="flex flex-col gap-8"
    >
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-mono text-mist md:text-[11px]">
          BEDTIME
        </span>
        <input
          type="time"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="mt-4 w-full border-b border-ash bg-transparent py-4 font-mono text-[28px] font-light text-washi focus:border-copper focus:outline-none md:text-[40px]"
        />
      </label>
      <button
        type="submit"
        className="group inline-flex w-fit items-center border border-washi px-6 py-4 font-mono text-[10px] uppercase tracking-mono text-washi transition-colors duration-200 hover:border-copper"
      >
        <span>Continue</span>
        <span className="ml-3 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}

function SliderField({
  value,
  onSubmit,
}: {
  value: number | undefined;
  onSubmit: (v: number) => void;
}) {
  const [local, setLocal] = useState<number>(value ?? 5);
  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex items-end justify-between">
          <span className="font-mono text-[10px] uppercase tracking-mono text-mineral md:text-[11px]">
            LOW
          </span>
          <span className="font-mono text-[40px] font-light text-copper md:text-[64px]">
            {local}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-mono text-mineral md:text-[11px]">
            HIGH
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={local}
          onChange={(e) => setLocal(Number(e.target.value))}
          className="onsen-slider mt-6 w-full"
          aria-label="Sleep quality"
        />
      </div>
      <button
        type="button"
        onClick={() => onSubmit(local)}
        className="group inline-flex w-fit items-center border border-washi px-6 py-4 font-mono text-[10px] uppercase tracking-mono text-washi transition-colors duration-200 hover:border-copper"
      >
        <span>Continue</span>
        <span className="ml-3 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </button>
    </div>
  );
}

function EmailField({
  value,
  onSubmit,
}: {
  value: { name?: string; email: string } | undefined;
  onSubmit: (v: { name?: string; email: string }) => void;
}) {
  const [name, setName] = useState(value?.name ?? "");
  const [email, setEmail] = useState(value?.email ?? "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        onSubmit({ name: name || undefined, email });
      }}
      className="flex flex-col gap-10"
    >
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-mono text-mist md:text-[11px]">
          NAME (OPTIONAL)
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          className="mt-4 w-full border-b border-ash bg-transparent py-4 font-display text-[18px] font-light text-washi focus:border-copper focus:outline-none md:text-[22px]"
        />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-mono text-mist md:text-[11px]">
          EMAIL
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mt-4 w-full border-b border-ash bg-transparent py-4 font-display text-[18px] font-light text-washi focus:border-copper focus:outline-none md:text-[22px]"
        />
      </label>
      <button
        type="submit"
        className="group inline-flex w-fit items-center border border-washi px-6 py-4 font-mono text-[10px] uppercase tracking-mono text-washi transition-colors duration-200 hover:border-copper"
      >
        <span>Reserve my prescription</span>
        <span className="ml-3 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// End screen
// -----------------------------------------------------------------------------

function EndScreen({ position }: { position: number | null }) {
  const [revealed, setRevealed] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (position === null) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1000;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounter(Math.floor(eased * position));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setRevealed(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [position]);

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-stretch justify-center bg-sumi text-washi">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12">
        <div className="relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-px bg-copper"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="pt-8">
            <p className="font-mono text-[10px] uppercase tracking-mono text-mist md:text-[11px]">
              PRESCRIPTION RESERVED
            </p>
            <h1 className="mt-10 font-display text-[40px] font-light leading-[1.05] tracking-tight text-washi md:text-[80px]">
              Your prescription is reserved.
            </h1>
            <div className="mt-12 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-mono text-mist md:text-[11px]">
                YOU ARE
              </span>
              <span className="font-mono text-[56px] font-light leading-none text-copper md:text-[96px]">
                #{counter.toLocaleString()}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-mono text-mineral md:text-[11px]">
                ON THE WAITLIST · ESTIMATED DELIVERY Q3 2026
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 max-w-2xl"
            >
              <div className="h-px w-full bg-ash" />
              <p className="mt-8 font-serif text-[15px] font-light leading-relaxed text-mist md:text-[17px]">
                Share to skip the line — every referral moves you up 50 spots.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { label: "Share on X", href: "https://x.com/intent/tweet?text=I%20just%20reserved%20my%20AI%20bath%20prescription%20at%20Onsen%20Labo." },
                  { label: "Share on TikTok", href: "https://www.tiktok.com/" },
                  { label: "Share on Instagram", href: "https://www.instagram.com/" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center border border-ash px-5 py-3 font-mono text-[10px] uppercase tracking-mono text-mist transition-colors duration-200 hover:border-copper hover:text-copper"
                  >
                    {s.label}
                    <span className="ml-3 transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-16">
                <Link
                  href="/"
                  className="group inline-flex items-center font-mono text-[10px] uppercase tracking-mono text-mineral transition-colors duration-200 hover:text-copper"
                >
                  <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">
                    ←
                  </span>
                  Return to Onsen Labo
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
