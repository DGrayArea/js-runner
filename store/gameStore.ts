import { create } from "zustand";

interface GameStore {
  playerState: string;
  gameSpeed: number;
  setGameSpeed: (state: number) => void;
  setPlayerState: (state: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  playerState: "idle",
  gameSpeed: 10,
  setGameSpeed: (speed) => set({ gameSpeed: speed }),
  setPlayerState: (state) => set({ playerState: state }),
}));
