"use client";

import { useEffect, useRef } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/constants";
import { startAnimation } from "@/components/sprite/animation";

export default function Collision() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    return startAnimation(ctx);
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas1"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-zinc-950 bg-white"
      ></canvas>
    </div>
  );
}
