"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SimId } from "@/lib/cpp-snippets";

const W = 640;
const H = 480;

const BGI: string[] = [
  "#000000",
  "#0000c4",
  "#00a800",
  "#00a8a8",
  "#c40000",
  "#c400c4",
  "#a86800",
  "#a8a8a8",
  "#545454",
  "#5454fc",
  "#54fc54",
  "#54fcfc",
  "#fc5454",
  "#fc54fc",
  "#fcfc54",
  "#ffffff",
];

type SimState = {
  frame: number;
  i: number;
  dir: number;
  pixels?: { x: number; y: number; c: number }[];
  penX?: number;
  penY?: number;
  path?: { x: number; y: number }[];
};

function px(ctx: CanvasRenderingContext2D, x: number, y: number, c: number) {
  ctx.fillStyle = BGI[c] ?? "#fff";
  ctx.fillRect(Math.round(x), Math.round(y), 2, 2);
}

function clear(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, H);
}

function ddaLine(
  out: { x: number; y: number; c: number }[],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  c: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const step = Math.max(Math.abs(dx), Math.abs(dy));
  const xinc = dx / step;
  const yinc = dy / step;
  let x = x1;
  let y = y1;
  for (let p = 0; p <= step; p++) {
    out.push({ x, y, c });
    x += xinc;
    y += yinc;
  }
}

export function GraphicsCanvas({ sim, name }: { sim: SimId; name: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<SimState>({ frame: 0, i: 0, dir: 1 });
  const [playing, setPlaying] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const isInteractive = sim === "arrowKey";

  const reset = useCallback(() => {
    stateRef.current = { frame: 0, i: 0, dir: 1 };
    if (sim === "arrowKey") {
      stateRef.current.penX = 320;
      stateRef.current.penY = 240;
      stateRef.current.path = [{ x: 320, y: 240 }];
    }
    if (sim === "dda") {
      const out: { x: number; y: number; c: number }[] = [];
      ddaLine(out, 300, 100, 400, 100, 3);
      ddaLine(out, 400, 100, 400, 200, 6);
      ddaLine(out, 400, 200, 300, 200, 10);
      ddaLine(out, 300, 200, 300, 100, 2);
      ddaLine(out, 300, 100, 400, 200, 5);
      ddaLine(out, 400, 100, 300, 200, 6);
      stateRef.current.pixels = out;
    }
    if (sim === "circleMidpoint") {
      const out: { x: number; y: number; c: number }[] = [];
      let R = 150;
      let d = 1 - R;
      let x = 0;
      let y = R;
      while (x < y) {
        if (d < 0) d = d + 2 * x + 3;
        else {
          d = d + 2 * x - 2 * y + 5;
          y = y - 1;
        }
        x = x + 1;
        const cx = 320;
        const cy = 240;
        out.push({ x: x + cx, y: y + cy, c: 14 });
        out.push({ x: y + cx, y: x + cy, c: 4 });
        out.push({ x: x + cx, y: -y + cy, c: 2 });
        out.push({ x: y + cx, y: -x + cy, c: 3 });
        out.push({ x: -y + cx, y: -x + cy, c: 5 });
        out.push({ x: -x + cx, y: -y + cy, c: 1 });
        out.push({ x: -x + cx, y: y + cy, c: 7 });
        out.push({ x: -y + cx, y: x + cy, c: 6 });
      }
      stateRef.current.pixels = out;
    }
    setResetKey((k) => k + 1);
  }, [sim]);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (sim !== "arrowKey") return;
      const s = stateRef.current;
      if (s.penX == null || s.penY == null || !s.path) return;
      let handled = true;
      switch (e.key) {
        case "ArrowUp":
          s.penY -= 20;
          break;
        case "ArrowDown":
          s.penY += 20;
          break;
        case "ArrowLeft":
          s.penX -= 20;
          break;
        case "ArrowRight":
          s.penX += 20;
          break;
        default:
          handled = false;
      }
      if (handled) {
        e.preventDefault();
        s.penX = Math.max(0, Math.min(W, s.penX));
        s.penY = Math.max(0, Math.min(H, s.penY));
        s.path.push({ x: s.penX, y: s.penY });
      }
    },
    [sim],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    clear(ctx);
    const s = stateRef.current;

    const drawArrow = () => {
      clear(ctx);

      ctx.strokeStyle = "rgba(34,211,238,0.12)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= W; gx += 20) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (let gy = 0; gy <= H; gy += 20) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }
      const path = s.path ?? [];
      ctx.strokeStyle = BGI[10];
      ctx.lineWidth = 2;
      ctx.beginPath();
      path.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      if (s.penX != null && s.penY != null) {
        ctx.fillStyle = BGI[14];
        ctx.beginPath();
        ctx.arc(s.penX, s.penY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      s.frame++;
      switch (sim) {
        case "dda": {
          const pixels = s.pixels ?? [];
          const reveal = Math.min(pixels.length, s.i);
          clear(ctx);
          for (let k = 0; k < reveal; k++) {
            const p = pixels[k];
            px(ctx, p.x, p.y, p.c);
          }
          s.i += 6;
          if (s.i > pixels.length + 40) s.i = 0;
          break;
        }
        case "circleMidpoint": {
          const pixels = s.pixels ?? [];
          const reveal = Math.min(pixels.length, s.i);
          clear(ctx);
          for (let k = 0; k < reveal; k++) {
            const p = pixels[k];
            px(ctx, p.x, p.y, p.c);
          }
          s.i += 4;
          if (s.i > pixels.length + 30) s.i = 0;
          break;
        }
        case "circle": {
          clear(ctx);
          const end = Math.min(Math.PI * 2, (s.frame / 60) * Math.PI * 2);
          ctx.strokeStyle = BGI[15];
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(200, 200, 150, 0, end);
          ctx.stroke();
          if (end >= Math.PI * 2) s.frame = 0;
          break;
        }
        case "line": {
          clear(ctx);
          const i = s.i;
          ctx.lineWidth = 2;
          ctx.strokeStyle = BGI[6];
          ctx.beginPath();
          ctx.moveTo(10 + i, 10);
          ctx.lineTo(60 + i, 10);
          ctx.stroke();
          ctx.strokeStyle = BGI[5];
          ctx.beginPath();
          ctx.moveTo(10, 10 + i);
          ctx.lineTo(10, 60 + i);
          ctx.stroke();
          ctx.strokeStyle = BGI[3];
          ctx.beginPath();
          ctx.moveTo(10 + i, 10 + i);
          ctx.lineTo(60 + i, 60 + i);
          ctx.stroke();
          s.i += 2;
          if (s.i > W - 60) s.i = 0;
          break;
        }
        case "ellipse": {
          clear(ctx);

          ctx.fillStyle = BGI[14];
          ctx.beginPath();
          ctx.ellipse(100, 100, 80, 50, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = BGI[4];
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.strokeStyle = BGI[4];
          ctx.beginPath();
          ctx.ellipse(300, 100, 80, 50, 0, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = BGI[3];
          ctx.beginPath();
          ctx.moveTo(500, 100);
          ctx.ellipse(
            500,
            100,
            80,
            50,
            0,
            -(80 * Math.PI) / 180,
            -(10 * Math.PI) / 180,
            true,
          );
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = BGI[15];
          ctx.stroke();
          break;
        }
        case "primitive": {
          clear(ctx);
          ctx.strokeStyle = BGI[8];
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(200, 150);
          ctx.lineTo(400, 300);
          ctx.stroke();
          ctx.strokeStyle = BGI[14];
          ctx.beginPath();
          ctx.moveTo(600, 200);
          ctx.lineTo(400, 100);
          ctx.stroke();
          ctx.strokeStyle = BGI[15];
          ctx.beginPath();
          ctx.moveTo(50, 50);
          ctx.lineTo(100, 50);
          ctx.lineTo(100, 100);
          ctx.lineTo(50, 100);
          ctx.lineTo(50, 50);
          ctx.stroke();
          break;
        }
        case "rectangle": {
          clear(ctx);
          const i = s.i;
          ctx.strokeStyle = BGI[5];
          ctx.fillStyle = "rgba(252,252,84,0.35)";
          ctx.lineWidth = 2;
          ctx.fillRect(10, 10 + i, 30, 30);
          ctx.strokeRect(10, 10 + i, 30, 30);
          s.i += 3 * s.dir;
          if (s.i >= 240) s.dir = -1;
          if (s.i <= 0) s.dir = 1;
          break;
        }
        case "car": {
          if (s.frame === 1) clear(ctx);
          const i = s.i;
          ctx.strokeStyle = BGI[3];
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(80 + i, 50);
          ctx.lineTo(180 + i, 50);
          ctx.lineTo(220 + i, 90);
          ctx.lineTo(260 + i, 90);
          ctx.lineTo(260 + i, 140);
          ctx.lineTo(50 + i, 140);
          ctx.lineTo(50 + i, 80);
          ctx.lineTo(80 + i, 50);
          ctx.stroke();
          s.i += 3;
          if (s.i > W) {
            s.i = 0;
            clear(ctx);
          }
          break;
        }
        case "movingCar": {
          clear(ctx);
          const i = s.i;

          ctx.fillStyle = BGI[8];
          ctx.beginPath();
          ctx.arc(110 + i, 150, 16, 0, Math.PI * 2);
          ctx.arc(220 + i, 150, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = BGI[14];
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(80 + i, 50);
          ctx.lineTo(180 + i, 50);
          ctx.lineTo(220 + i, 90);
          ctx.lineTo(260 + i, 90);
          ctx.lineTo(260 + i, 140);
          ctx.lineTo(50 + i, 140);
          ctx.lineTo(50 + i, 80);
          ctx.lineTo(80 + i, 50);
          ctx.stroke();
          s.i += 3;
          if (s.i > W) s.i = -260;
          break;
        }
        case "bouncingBall": {
          clear(ctx);
          const xc = 320;
          const yc = 240;
          // floor
          ctx.strokeStyle = BGI[8];
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(xc - 50, yc + 200);
          ctx.lineTo(xc + 50, yc + 200);
          ctx.stroke();
          const drop = s.i;
          ctx.fillStyle = BGI[1];
          ctx.strokeStyle = BGI[4];
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(xc, yc + drop, 12, 12, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          s.i += 3 * s.dir;
          if (s.i >= 187) s.dir = -1;
          if (s.i <= 0) s.dir = 1;
          break;
        }
        case "flag": {
          if (s.frame === 1) clear(ctx);
          for (let n = 0; n < 30; n++) {
            const x = Math.floor(Math.random() * 250) + 100;
            const y = Math.floor(Math.random() * 40) + 100;
            px(ctx, x, y, 2);
            px(ctx, x, y + 40, 14);
            px(ctx, x, y + 80, 4);
          }
          if (s.frame > 900) {
            s.frame = 0;
            clear(ctx);
          }
          break;
        }
        case "arrowKey": {
          drawArrow();
          break;
        }
        default:
          break;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    if (playing) {
      rafRef.current = requestAnimationFrame(step);
    } else if (sim === "arrowKey") {
      drawArrow();
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [sim, playing, resetKey]);

  useEffect(() => {
    if (!isInteractive) return;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isInteractive, handleKey]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-cyan" />
          <span className="font-mono text-xs text-muted-foreground">
            output · 640×480 · BGI emulation
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {!isInteractive && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause animation" : "Play animation"}
            >
              {playing ? <Pause /> : <Play />}
              {playing ? "Pause" : "Play"}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={reset}
            aria-label="Reset animation"
          >
            <RotateCcw />
            Reset
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-border bg-black">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block w-full"
          style={{ imageRendering: "pixelated", aspectRatio: "4 / 3" }}
          aria-label={`Graphics output for ${name}`}
        />
      </div>

      {isInteractive && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
          <Keyboard className="size-4 text-cyan" />
          <p className="text-xs text-muted-foreground">
            Click the canvas area then use the{" "}
            <span className="font-mono text-foreground">arrow keys</span> to
            steer the pen and draw connected segments, just like the C++
            program.
          </p>
        </div>
      )}
    </div>
  );
}
