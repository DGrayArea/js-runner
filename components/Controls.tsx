"use client";

import { animationStates } from "@/lib/constants";
import { useGameStore } from "@/store/gameStore";

export const Controls = () => {
  const { playerState, setPlayerState } = useGameStore();

  return (
    <div className="absolute top-12 text-2xl z-10">
      <label htmlFor="animations" className="mr-2">
        Choose Animation:
      </label>
      <select
        name="animations"
        id="animations"
        value={playerState}
        onChange={(e) => setPlayerState(e.target.value)}
        className="p-1 border rounded"
      >
        {animationStates.map((state) => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
};
