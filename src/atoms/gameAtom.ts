import { atom } from "jotai";

const getInitialGameId = () => {
  const storedGameId = localStorage.getItem("gameId");
  return storedGameId ? storedGameId : null;
};

export const gameIdAtom = atom<string | null>(getInitialGameId());

export const setGameIdAtom = atom(null, (get, set, gameId: string | null) => {
  if (gameId) {
    console.log("Setting LocalSTorage gameId to ", gameId);
    localStorage.setItem("gameId", gameId);
  } else {
    console.log("REMOVE FROM LOCALSTOARGAe ", gameId);
    localStorage.removeItem("gameId");
  }
  set(gameIdAtom, gameId);
});
