import { atom } from "jotai";

const getInitialUserId = () => {
  const storedUserId = localStorage.getItem("userId");
  return storedUserId ? storedUserId : null;
};

export const userIdAtom = atom<string | null>(getInitialUserId());

export const setUserIdAtom = atom(null, (get, set, userId: string | null) => {
  if (userId) {
    localStorage.setItem("userId", userId);
  } else {
    localStorage.removeItem("userId");
  }
  set(userIdAtom, userId);
});
