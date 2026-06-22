import { ASSET_SHADOW_DOG } from "../../lib/assets";
import { Explosion } from "../../lib/classes";

const CANVAS_HEIGHT = 700;
const CANVAS_WIDTH = 500;

const EXPLOSION_FRAMES = 5;

export function startAnimation(ctx: CanvasRenderingContext2D) {
  let animationFrameId: number;

  const playerImage = new Image();
  playerImage.src = ASSET_SHADOW_DOG;

  let gameFrame = 0;

  // Live explosions — created on click, removed when animation finishes
  const explosions: Explosion[] = [];

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update and draw each explosion, remove finished ones
    for (let i = explosions.length - 1; i >= 0; i--) {
      const exp = explosions[i];
      exp.update();
      exp.draw(ctx);
      if (exp.frame >= EXPLOSION_FRAMES) {
        explosions.splice(i, 1);
      }
    }

    gameFrame++;
    animationFrameId = requestAnimationFrame(animate);
  };

  const createAnimation = (e: MouseEvent) => {
    const rect = ctx.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    explosions.push(new Explosion(x, y));
  };

  const handleClick = (e: MouseEvent) => {
    createAnimation(e);
  };

  const handleMove = (e: MouseEvent) => {
    createAnimation(e);
  };

  ctx.canvas.addEventListener("click", handleClick);
  // ctx.canvas.addEventListener("mousemove", handleMove);

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
    ctx.canvas.removeEventListener("click", handleClick);
  };
}
