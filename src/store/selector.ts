import { selector } from "recoil";
import { WholeColor } from "types";
import { isLightState } from "./atoms";

export const wholeColorState = selector<WholeColor>({
  key: "wholeColorState",
  get: ({ get }) => {
    const isLight = get(isLightState);

    return isLight
      ? { color: "#111", bgColor: "#fff" }
      : { color: "#fff", bgColor: "#111" };
  },
});
