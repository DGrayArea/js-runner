import {
  ASSET_LAYER_1_1,
  ASSET_LAYER_2_1,
  ASSET_LAYER_3_1,
  ASSET_LAYER_4_1,
  ASSET_LAYER_5_1,
} from "@/lib/assets";
import { Layer } from "@/lib/classes";

export function startAnimation(ctx: CanvasRenderingContext2D) {
  let animationFrameId: number;

  let gameFrame = 0;

  const backgroundLayer1 = new Image();
  const backgroundLayer2 = new Image();
  const backgroundLayer3 = new Image();
  const backgroundLayer4 = new Image();
  const backgroundLayer5 = new Image();
  backgroundLayer1.src = ASSET_LAYER_1_1;
  backgroundLayer2.src = ASSET_LAYER_2_1;
  backgroundLayer3.src = ASSET_LAYER_3_1;
  backgroundLayer4.src = ASSET_LAYER_4_1;
  backgroundLayer5.src = ASSET_LAYER_5_1;

  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1.0);

  const gameLayers = [layer1, layer2, layer3, layer4, layer5];

  const animate = () => {
    ctx.clearRect(0, 0, 800, 700);
    gameLayers.forEach((layer) => {
      layer.update(gameFrame);
      layer.draw(ctx);
    });
    gameFrame--;
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  return () => cancelAnimationFrame(animationFrameId);
}
