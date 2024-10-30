import { atom } from "jotai";

const getInitialUserId = () => {
  const storedUserId = localStorage.getItem("userId");
  return storedUserId ? storedUserId : null;
};

export const userIdAtom = atom<string | null>(getInitialUserId());

export const setUserIdAtom = atom(null, (get, set, userId: string | null) => {
  if (userId) {
    console.log("SAVE USER TO LOCAL STORAGE");
    localStorage.setItem("userId", userId);
  } else {
    console.log("REMOVE USER FROM LOCAL STORAGE");
    localStorage.removeItem("userId");
  }
  set(userIdAtom, userId);
});
