import { atom } from "recoil";

export const isLightState = atom<boolean>({
  key: "isLightState",
  default: true,
});
