"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  sampleQuestions,
  TOTAL_POOL,
  type Question,
} from "@/lib/exam-questions";
import { cn } from "@/lib/utils";

type Phase = "config" | "running" | "review";

const DURATIONS = [
  { label: "10 min", value: 10 },
  { label: "20 min", value: 20 },
  { label: "30 min", value: 30 },
];

const COUNTS = [10, 20, 30, 50, 100];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function ExamEngine() {
  const [phase, setPhase] = useState<Phase>("config");
  const [duration, setDuration] = useState(20);
  const [count, setCount] = useState(100);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(0);

  const startExam = useCallback(() => {
    setQuestions(sampleQuestions(count));
    setAnswers({});
    setFlagged({});
    setCurrent(0);
    setTimeLeft(duration * 60);
    setPhase("running");
  }, [count, duration]);

  const submitExam = useCallback(() => {
    setPhase("review");
  }, []);

  useEffect(() => {
    if (phase !== "running") return;
    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft, submitExam]);

  const score = useMemo(() => {
    if (phase !== "review") return 0;
    return questions.reduce(
      (acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc),
      0,
    );
  }, [phase, questions, answers]);

  if (phase === "config") {
    return (
      <div className="mx-auto max-w-2xl py-6">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
            Assessment
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">
            Timed Mock Examination
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Simulate exam conditions with a countdown timer, question flagging,
            and instant grading with full explanations. Questions are drawn at
            random from a pool of {TOTAL_POOL} covering hardware, line and
            circle algorithms, transforms, clipping, and 3D projections.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="space-y-6">
            <div>
              <label className="mb-3 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setDuration(d.value)}
                    className={cn(
                      "rounded-md border px-4 py-2 font-mono text-sm transition-colors",
                      duration === d.value
                        ? "border-white bg-white text-black font-semibold"
                        : "border-border bg-background text-muted-foreground hover:border-zinc-700 hover:text-foreground",
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Number of questions
              </label>
              <div className="flex flex-wrap gap-2">
                {COUNTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    className={cn(
                      "rounded-md border px-4 py-2 font-mono text-sm transition-colors",
                      count === c
                        ? "border-white bg-white text-black font-semibold"
                        : "border-border bg-background text-muted-foreground hover:border-zinc-700 hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={startExam}
              className="w-full bg-white text-black hover:bg-zinc-200"
              size="lg"
            >
              Start Examination
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "running") {
    const q = questions[current];
    const answeredCount = Object.keys(answers).length;
    const lowTime = timeLeft <= 60;
    return (
      <div className="mx-auto max-w-3xl pb-12">
        <div className="sticky top-0 z-20 mb-6 border-b border-zinc-800 bg-black/95 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-sm text-muted-foreground">
              Question{" "}
              <span className="text-white font-semibold">{current + 1}</span> /{" "}
              {questions.length}
              <span className="ml-3 hidden sm:inline">
                · {answeredCount} answered
              </span>
            </div>
            <div
              className={cn(
                "rounded-md border px-3 py-1 font-mono text-sm tabular-nums",
                lowTime
                  ? "border-red-500 text-red-500"
                  : "border-zinc-800 bg-zinc-950 text-white",
              )}
              aria-live="polite"
            >
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-900">
            <div
              className="h-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-black p-6">
          <div className="mb-6 flex items-center gap-2 border-b border-zinc-800/60 pb-4">
            <span className="rounded bg-zinc-900 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              {q.category}
            </span>
            <span className="rounded bg-zinc-900 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              {q.type}
            </span>
            <button
              onClick={() => setFlagged((f) => ({ ...f, [q.id]: !f[q.id] }))}
              className={cn(
                "ml-auto rounded border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors",
                flagged[q.id]
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700",
              )}
            >
              {flagged[q.id] ? "Flagged" : "Flag"}
            </button>
          </div>

          <h3 className="text-pretty text-lg font-medium leading-relaxed text-white">
            {q.question}
          </h3>

          <div className="mt-6 space-y-2.5">
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md border px-4 py-3.5 text-left transition-colors",
                    selected
                      ? "border-cyan-500 bg-cyan-500/10 text-white"
                      : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold",
                      selected
                        ? "border-cyan-500 bg-cyan-500 text-black"
                        : "border-zinc-700 text-zinc-400",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            Previous
          </Button>
          {current < questions.length - 1 ? (
            <Button
              onClick={() =>
                setCurrent((c) => Math.min(questions.length - 1, c + 1))
              }
              className="bg-white text-black hover:bg-zinc-200"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={submitExam}
              className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold"
            >
              Submit Exam
            </Button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5 rounded-lg border border-zinc-900 bg-zinc-950/50 p-3">
          {questions.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded border font-mono text-xs transition-colors",
                i === current &&
                  "border-cyan-500 ring-1 ring-cyan-500 text-white font-bold",
                answers[qq.id] !== undefined
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "border-zinc-800 text-zinc-500 hover:text-zinc-300",
                flagged[qq.id] && "border-cyan-400 text-cyan-400",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const pct = Math.round((score / questions.length) * 100);
  return (
    <div className="mx-auto max-w-3xl py-6">
      <div className="rounded-lg border border-zinc-800 bg-black p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
          Results
        </p>
        <div className="mt-4 flex items-baseline justify-center gap-2">
          <span className="text-6xl font-bold tabular-nums text-white">
            {pct}%
          </span>
        </div>
        <p className="mt-2 font-mono text-sm text-zinc-400">
          {score} / {questions.length} correct
        </p>
        <div className="mx-auto mt-6 h-2 w-full max-w-sm overflow-hidden rounded-full bg-zinc-900">
          <div
            className={cn(
              "h-full transition-all",
              pct >= 50 ? "bg-cyan-500" : "bg-red-500",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={startExam}
            variant="outline"
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900"
          >
            Retake (new questions)
          </Button>
          <Button
            onClick={() => setPhase("config")}
            className="bg-white text-black hover:bg-zinc-200"
          >
            Back to Setup
          </Button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
          Answer Review
        </h3>
        {questions.map((q, idx) => {
          const userAns = answers[q.id];
          const correct = userAns === q.answer;
          return (
            <div
              key={q.id}
              className="rounded-lg border border-zinc-800 bg-black p-5"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold",
                    correct
                      ? "bg-cyan-500 text-black"
                      : "bg-red-500/20 text-red-400 border border-red-500/40",
                  )}
                >
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-pretty font-medium leading-relaxed text-white">
                    {q.question}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {q.options.map((opt, i) => {
                      const isCorrect = i === q.answer;
                      const isUserWrong = i === userAns && !correct;
                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center gap-2 rounded border px-3 py-2 text-sm",
                            isCorrect &&
                              "border-cyan-500 bg-cyan-500/10 text-white",
                            isUserWrong &&
                              "border-red-500/50 bg-red-500/10 text-white",
                            !isCorrect &&
                              !isUserWrong &&
                              "border-transparent text-zinc-500",
                          )}
                        >
                          <span className="font-mono text-xs">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                          {isCorrect && (
                            <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                              Correct
                            </span>
                          )}
                          {isUserWrong && (
                            <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-red-400">
                              Your answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {userAns === undefined && (
                      <p className="font-mono text-xs text-zinc-500">
                        Not answered
                      </p>
                    )}
                  </div>
                  <div className="mt-3 rounded border-l-2 border-cyan-500 bg-zinc-950 px-3 py-2">
                    <p className="text-sm leading-relaxed text-zinc-400">
                      <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                        Why:{" "}
                      </span>
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
