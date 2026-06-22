"use client";

import { useEffect, useRef } from "react";
import { startAnimation } from "@/components/raven/animation";

export default function Raven() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const collisionCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const collisionCanvas = collisionCanvasRef.current;
    if (!canvas || !collisionCanvas) return;

    // Set drawing resolution to match the viewport
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    collisionCanvas.width = w;
    collisionCanvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const collisionCtx = collisionCanvas.getContext("2d");
    if (!collisionCtx) return;

    return startAnimation(ctx, collisionCtx);
  }, []);

  return (
    // Container fills the whole page
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      {/* Collision canvas sits behind, invisible for detection */}
      <canvas
        ref={collisionCanvasRef}
        id="collisionCanvas"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Main canvas on top */}
      <canvas
        ref={canvasRef}
        id="canvas1"
        style={{ position: "absolute", inset: 0, display: "block" }}
      />
    </div>
  );
}
