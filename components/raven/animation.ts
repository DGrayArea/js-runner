import { Raven, Explosion, Particle } from "@/lib/classes";

let ravens: Raven[] = [];
let explosions: Explosion[] = [];
let particles: Particle[] = [];
let timeToNextRaven = 0;
const ravenInterval = 500;
let lastTime = 0;
let score = 0;
let gameOver = false;

function drawScore(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.font = "bold 48px 'Segoe UI'";
  ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 8;
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 50, 80);
  ctx.restore();
}

function drawGameOver(ctx: CanvasRenderingContext2D) {
  ctx.textAlign = "center";

  ctx.save();
  ctx.font = "bold 48px 'Segoe UI'";
  ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 8;
  ctx.fillStyle = "white";
  ctx.fillText(
    `GAME OVER, YOUR SCORE IS: ${score}`,
    ctx.canvas.width / 2,
    ctx.canvas.height / 2,
  );
  ctx.restore();
}

export function startAnimation(
  ctx: CanvasRenderingContext2D,
  collisionCtx: CanvasRenderingContext2D,
) {
  let animationFrameId: number;
  const animate = (timestamp: number) => {
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;
    ctx.clearRect(0, 0, W, H);
    collisionCtx.clearRect(0, 0, W, H);
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    if (timeToNextRaven > ravenInterval) {
      ravens.push(new Raven(W, H));
      timeToNextRaven = 0;
      ravens.sort((a, b) => a.width - b.width);
    }
    drawScore(ctx);
    particles = particles.filter((particle) => !particle.deletionMarked);
    [...particles].forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });
    [...ravens].forEach((raven) => {
      raven.update(deltaTime, particles);
      raven.draw(ctx, collisionCtx);
      if (raven.x < 0 - raven.width) gameOver = true;
    });
    ravens = ravens.filter((raven) => !raven.deletionMarked);
    explosions.forEach((exp) => {
      exp.update(deltaTime);
      exp.draw(ctx);
    });
    explosions = explosions.filter((exp) => !exp.deletionMarked);
    if (!gameOver) animationFrameId = requestAnimationFrame(animate);
    else drawGameOver(ctx);
  };

  const handleClick = (e: MouseEvent) => {
    const rect = ctx.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = collisionCtx.getImageData(x, y, 1, 1).data;
    const [r, g, b, a] = pixel;
    if (a === 0) return;
    ravens.forEach((raven) => {
      if (
        raven.randomColors[0] === r &&
        raven.randomColors[1] === g &&
        raven.randomColors[2] === b
      ) {
        console.log(`Hit raven! color: rgb(${r}, ${g}, ${b})`);
        explosions.push(
          new Explosion(
            raven.x + raven.width / 2,
            raven.y + raven.height / 2,
            raven.width / 200,
          ),
        );
        raven.deletionMarked = true;
        score++;
      }
    });
  };

  ctx.canvas.addEventListener("click", handleClick);

  animate(0);

  return () => {
    cancelAnimationFrame(animationFrameId);
    ctx.canvas.removeEventListener("click", handleClick);
  };
}
