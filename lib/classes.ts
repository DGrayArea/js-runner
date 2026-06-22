import { useGameStore } from "@/store/gameStore";
import { ASSET_BOOM, ASSET_ICE_BLAST, ASSET_RAVEN } from "./assets";

const gameSpeed = useGameStore.getState().gameSpeed;

export class Layer {
  x: number;
  y: number;
  width: number;
  height: number;
  x2: number;
  image: CanvasImageSource;
  speedModifier: number;
  speed: number;

  constructor(image: CanvasImageSource, speedMod: number) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedMod;
    this.speed = gameSpeed * this.speedModifier;
  }

  update(gameFrame: number) {
    this.speed = useGameStore.getState().gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = this.x - this.speed;

    // Calculate the correct wrapped position based on the game frame
    //this.x = (gameFrame * this.speed) % this.width;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

export class Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  image: CanvasImageSource;
  spriteWidth: number;
  spriteHeight: number;
  frame: number;
  flapSpeed: number;

  constructor(spriteWidth: number, spriteHeight: number, imageSrc: string) {
    this.speed = Math.random() * 4 - 2;
    this.image = new Image();
    this.image.src = imageSrc;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (500 - this.width);
    this.y = Math.random() * (1000 - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.floor(Math.random() * 3) + 1);
  }

  update(gameFrame: number) {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (gameFrame % this.flapSpeed === 0) {
      if (this.frame > 4) {
        this.frame = 0;
      } else {
        this.frame++;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export class Enemy2 {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  image: CanvasImageSource;
  spriteWidth: number;
  spriteHeight: number;
  frame: number;
  flapSpeed: number;
  canvasWidth: number;
  canvasHeight: number;
  angle: number;
  angleSpeed: number;
  curve: number;

  constructor(
    spriteWidth: number,
    spriteHeight: number,
    imageSrc: string,
    canvasWidth: number,
    canvasHeight: number,
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.image = new Image();
    this.image.src = imageSrc;
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = Math.random() * (canvasHeight - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.floor(Math.random() * 3) + 1);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }

  update(gameFrame: number) {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = this.canvasWidth;
    if (gameFrame % this.flapSpeed === 0) {
      if (this.frame > 4) {
        this.frame = 0;
      } else {
        this.frame++;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export class Enemy3 {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  image: CanvasImageSource;
  spriteWidth: number;
  spriteHeight: number;
  frame: number;
  flapSpeed: number;
  canvasWidth: number;
  canvasHeight: number;
  angle: number;
  angleSpeed: number;
  //curve: number;

  constructor(
    spriteWidth: number,
    spriteHeight: number,
    imageSrc: string,
    canvasWidth: number,
    canvasHeight: number,
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.image = new Image();
    this.image.src = imageSrc;
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = Math.random() * (canvasHeight - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.floor(Math.random() * 3 + 1));
    this.angle = Math.random() * 500;
    this.angleSpeed = Math.random() * 0.5 + 0.5;
    //this.curve = Math.random() * 200 + 50;
  }

  update(gameFrame: number) {
    this.x =
      (this.canvasWidth / 2) * Math.sin((this.angle * Math.PI) / 200) +
      (this.canvasWidth / 2 - this.width / 2);
    this.y =
      (this.canvasHeight / 2) * Math.cos((this.angle * Math.PI) / 300) +
      (this.canvasHeight / 2 - this.height / 2);

    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = this.canvasWidth;
    if (gameFrame % this.flapSpeed === 0) {
      if (this.frame > 4) {
        this.frame = 0;
      } else {
        this.frame++;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export class Enemy4 {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  image: CanvasImageSource;
  spriteWidth: number;
  spriteHeight: number;
  frame: number;
  flapSpeed: number;
  canvasWidth: number;
  canvasHeight: number;
  interval: number;
  x2: number;
  y2: number;

  constructor(
    spriteWidth: number,
    spriteHeight: number,
    imageSrc: string,
    canvasWidth: number,
    canvasHeight: number,
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.image = new Image();
    this.image.src = imageSrc;
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = Math.random() * (canvasHeight - this.height);
    this.x2 = Math.random() * (canvasWidth - this.width);
    this.y2 = Math.random() * (canvasHeight - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.floor(Math.random() * 3 + 1));
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update(gameFrame: number) {
    if (gameFrame % this.interval === 0) {
      this.x2 = Math.random() * (this.canvasWidth - this.width);
      this.y2 = Math.random() * (this.canvasHeight - this.height);
    }
    const dx = this.x - this.x2;
    const dy = this.y - this.y2;
    this.x -= dx / 70;
    this.y -= dy / 70;

    if (this.x + this.width < 0) this.x = this.canvasWidth;
    if (gameFrame % this.flapSpeed === 0) {
      if (this.frame > 4) {
        this.frame = 0;
      } else {
        this.frame++;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export class Explosion {
  x: number;
  y: number;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;
  image: CanvasImageSource;
  frame: number;
  frameInterval: number;
  timeSinceLastFrame: number;
  angle: number;
  sound: HTMLAudioElement;
  soundPlayed: boolean;
  deletionMarked: boolean;

  constructor(x: number, y: number, size: number) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * size;
    this.height = this.spriteHeight * size;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = ASSET_BOOM;
    this.frame = 0;
    this.frameInterval = 200;
    this.timeSinceLastFrame = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = ASSET_ICE_BLAST;
    this.soundPlayed = false;
    this.deletionMarked = false;
  }

  update(deltaTime: number) {
    if (!this.soundPlayed) {
      this.sound.play();
      this.soundPlayed = true;
    }
    this.timeSinceLastFrame += deltaTime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
    }
    if (this.frame > 4) this.deletionMarked = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height,
    );
    ctx.restore();
  }
}

export class Raven {
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  image: CanvasImageSource;
  deletionMarked: boolean;
  spriteWidth: number;
  spriteHeight: number;
  sizeMod: number;
  frame: number;
  maxFrame: number;
  flapInterval: number;
  timeSinceFlap: number;
  randomColors: number[];
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeMod = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeMod;
    this.height = this.spriteHeight * this.sizeMod;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = canvasWidth;
    this.y = Math.random() * (canvasHeight - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.image = new Image();
    this.image.src = ASSET_RAVEN;
    this.deletionMarked = false;
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`;
  }

  update(deltaTime: number, particles: Particle[]) {
    if (this.y < 0 || this.y > this.canvasHeight - this.height)
      this.directionY = this.directionY * -1;
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < 0 - this.width) this.deletionMarked = true;
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;
      particles.push(new Particle(this.x, this.y, this.width, this.color));
    }
  }
  draw(ctx: CanvasRenderingContext2D, collisionCtx: CanvasRenderingContext2D) {
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  maxRadius: number;
  deletionMarked: boolean;
  speedX: number;
  size: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.size = size;
    this.x = x + this.size / 2;
    this.y = y + this.size / 3;
    this.radius = (Math.random() * size) / 10;
    this.maxRadius = Math.random() * 20 + 35;
    this.deletionMarked = false;
    this.speedX = Math.random() * 1 + 0.5;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.radius += 0.5;
    if (this.radius > this.maxRadius) this.deletionMarked = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
