import Sprite from "@/components/sprite";
import { Controls } from "@/components/Controls";
import Background from "@/components/background";
import Enemies from "@/components/enemies";
import Collision from "@/components/collision";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen bg-white flex items-center justify-center">
      {/* <Background /> */}
      {/* <Sprite />
      <Controls /> */}

      {/* <Enemies /> */}
      <Collision />
    </div>
  );
}
