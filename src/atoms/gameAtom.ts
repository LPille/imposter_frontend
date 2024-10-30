import { atom } from "jotai";

const getInitialGameId = () => {
  const storedGameId = localStorage.getItem("gameId");
  return storedGameId ? storedGameId : null;
};

export const gameIdAtom = atom<string | null>(getInitialGameId());

export const setGameIdAtom = atom(null, (get, set, gameId: string | null) => {
  if (gameId) {
    localStorage.setItem("gameId", gameId);
  } else {
    localStorage.removeItem("gameId");
  }
  set(gameIdAtom, gameId);
});
