/* eslint-disable */

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 600;

export const spriteWidth = 575;
export const spriteHeight = 523;
export const staggerFrames = 5;

export const spriteAnimations: any = [];

export const animationStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "gethit", frames: 4 },
];

animationStates.forEach((state, index) => {
  const frames: any = {
    loc: [],
  };

  for (let j = 0; j < state.frames; j++) {
    const positionX = j * spriteWidth;
    const positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
