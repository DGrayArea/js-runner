import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  spriteWidth,
  spriteHeight,
  staggerFrames,
  spriteAnimations,
} from "@/lib/constants";
import { ASSET_SHADOW_DOG } from "../../lib/assets";
import { useGameStore } from "@/store/gameStore";

export function startAnimation(ctx: CanvasRenderingContext2D) {
  let animationFrameId: number;

  const playerImage = new Image();
  playerImage.src = ASSET_SHADOW_DOG;

  let gameFrame = 0;

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const playerState = useGameStore.getState().playerState;

    let position =
      Math.floor(gameFrame / staggerFrames) %
      spriteAnimations[playerState].loc.length;
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(
      playerImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      0,
      0,
      spriteWidth,
      spriteHeight,
    );

    gameFrame++;
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  return () => cancelAnimationFrame(animationFrameId);
}
