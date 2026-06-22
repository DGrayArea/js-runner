"use client";

import { useEffect, useRef } from "react";
import { startAnimation } from "@/components/explosion/animation";

export default function Explosion() {
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
        width={500}
        height={700}
        className="border-2 border-zinc-950 bg-white"
      ></canvas>
    </div>
  );
}
