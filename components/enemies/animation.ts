import { ASSET_ENEMY1, ASSET_ENEMY_BAT_3 } from "@/lib/assets";
import { Enemy, Enemy2 } from "@/lib/classes";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 1000;

// animations for bats (enemy1)
export function startAnimation1(ctx: CanvasRenderingContext2D) {
  let animationFrameId: number;

  let gameFrame = 0;
  const enemyNumber = 100;
  const enemiesArray: Enemy[] = [];

  for (let i = 0; i < enemyNumber; i++) {
    enemiesArray.push(new Enemy(293, 155, ASSET_ENEMY1));
  }

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach((enemy) => {
      enemy.update(gameFrame);
      enemy.draw(ctx);
    });
    gameFrame++;
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  return () => cancelAnimationFrame(animationFrameId);
}

export function startAnimation(ctx: CanvasRenderingContext2D) {
  let animationFrameId: number;

  let gameFrame = 0;
  const enemyNumber = 20;
  const enemiesArray: Enemy2[] = [];

  for (let i = 0; i < enemyNumber; i++) {
    enemiesArray.push(
      new Enemy2(266, 188, ASSET_ENEMY_BAT_3, CANVAS_WIDTH, CANVAS_HEIGHT),
    );
  }

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach((enemy) => {
      enemy.update(gameFrame);
      enemy.draw(ctx);
    });
    gameFrame++;
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  return () => cancelAnimationFrame(animationFrameId);
}
