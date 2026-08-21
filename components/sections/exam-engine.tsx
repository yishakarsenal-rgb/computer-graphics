"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { sampleQuestions, TOTAL_POOL, type Question } from "@/lib/exam-questions"
import { cn } from "@/lib/utils"

type Phase = "config" | "running" | "review"

const DURATIONS = [
  { label: "10 min", value: 10 },
  { label: "20 min", value: 20 },
  { label: "30 min", value: 30 },
]

const COUNTS = [10, 20, 30]

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export function ExamEngine() {
  const [phase, setPhase] = useState<Phase>("config")
  const [duration, setDuration] = useState(20)
  const [count, setCount] = useState(20)
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [flagged, setFlagged] = useState<Record<number, boolean>>({})
  const [timeLeft, setTimeLeft] = useState(0)

  const startExam = useCallback(() => {
    setQuestions(sampleQuestions(count))
    setAnswers({})
    setFlagged({})
    setCurrent(0)
    setTimeLeft(duration * 60)
    setPhase("running")
  }, [count, duration])

  const submitExam = useCallback(() => {
    setPhase("review")
  }, [])

  useEffect(() => {
    if (phase !== "running") return
    if (timeLeft <= 0) {
      submitExam()
      return
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [phase, timeLeft, submitExam])

  const score = useMemo(() => {
    if (phase !== "review") return 0
    return questions.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0)
  }, [phase, questions, answers])

  if (phase === "config") {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-foreground">Assessment</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">
            Timed Mock Examination
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Simulate exam conditions with a countdown timer, question flagging, and instant grading with full
            explanations. Questions are drawn at random from a pool of {TOTAL_POOL} covering hardware, line and
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
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
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
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={startExam} className="w-full" size="lg">
              Start Examination
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "running") {
    const q = questions[current]
    const answeredCount = Object.keys(answers).length
    const lowTime = timeLeft <= 60
    return (
      <div className="mx-auto max-w-3xl">
        <div className="sticky top-14 z-10 -mx-4 mb-6 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-sm text-muted-foreground">
              Question <span className="text-foreground">{current + 1}</span> / {questions.length}
              <span className="ml-3 hidden sm:inline">· {answeredCount} answered</span>
            </div>
            <div
              className={cn(
                "rounded-md border px-3 py-1 font-mono text-sm tabular-nums",
                lowTime ? "border-destructive text-destructive" : "border-border text-foreground",
              )}
              aria-live="polite"
            >
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-cyan transition-all"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {q.category}
            </span>
            <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {q.type}
            </span>
            <button
              onClick={() => setFlagged((f) => ({ ...f, [q.id]: !f[q.id] }))}
              className={cn(
                "ml-auto rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
                flagged[q.id]
                  ? "border-cyan bg-cyan/10 text-cyan"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {flagged[q.id] ? "Flagged" : "Flag"}
            </button>
          </div>

          <p className="text-pretty text-lg font-medium leading-relaxed text-foreground">{q.question}</p>

          <div className="mt-6 space-y-2">
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === i
              return (
                <button
                  key={i}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors",
                    selected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                      selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button variant="outline" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
            Previous
          </Button>
          {current < questions.length - 1 ? (
            <Button onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}>Next</Button>
          ) : (
            <Button onClick={submitExam}>Submit Exam</Button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {questions.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded border font-mono text-xs transition-colors",
                i === current && "ring-2 ring-ring ring-offset-2 ring-offset-background",
                answers[qq.id] !== undefined
                  ? "border-primary bg-primary/20 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
                flagged[qq.id] && "border-cyan",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // review
  const pct = Math.round((score / questions.length) * 100)
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-foreground">Results</p>
        <div className="mt-4 flex items-baseline justify-center gap-2">
          <span className="text-6xl font-bold tabular-nums text-foreground">{pct}%</span>
        </div>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {score} / {questions.length} correct
        </p>
        <div className="mx-auto mt-6 h-2 w-full max-w-sm overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full transition-all", pct >= 50 ? "bg-cyan" : "bg-destructive")}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={startExam} variant="outline">
            Retake (new questions)
          </Button>
          <Button onClick={() => setPhase("config")}>Back to Setup</Button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Answer Review</h3>
        {questions.map((q, idx) => {
          const userAns = answers[q.id]
          const correct = userAns === q.answer
          return (
            <div key={q.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs",
                    correct ? "bg-cyan text-primary-foreground" : "bg-destructive/20 text-destructive",
                  )}
                >
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-pretty font-medium leading-relaxed text-foreground">{q.question}</p>
                  <div className="mt-3 space-y-1.5">
                    {q.options.map((opt, i) => {
                      const isCorrect = i === q.answer
                      const isUserWrong = i === userAns && !correct
                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center gap-2 rounded border px-3 py-2 text-sm",
                            isCorrect && "border-cyan bg-cyan/10 text-foreground",
                            isUserWrong && "border-destructive bg-destructive/10 text-foreground",
                            !isCorrect && !isUserWrong && "border-transparent text-muted-foreground",
                          )}
                        >
                          <span className="font-mono text-xs">{String.fromCharCode(65 + i)}</span>
                          <span className="leading-relaxed">{opt}</span>
                          {isCorrect && (
                            <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-cyan">
                              Correct
                            </span>
                          )}
                          {isUserWrong && (
                            <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-destructive">
                              Your answer
                            </span>
                          )}
                        </div>
                      )
                    })}
                    {userAns === undefined && (
                      <p className="font-mono text-xs text-muted-foreground">Not answered</p>
                    )}
                  </div>
                  <div className="mt-3 rounded border-l-2 border-cyan bg-muted/40 px-3 py-2">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-mono text-xs uppercase tracking-wider text-cyan">Why: </span>
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
