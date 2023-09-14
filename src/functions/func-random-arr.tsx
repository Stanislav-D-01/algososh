import { ElementStates } from "../types/element-states";
import { TRenderElement } from "../components/sorting-page/sorting-page";
export const randomArr = () => {
  const amountEl = Math.floor(Math.random() * (17 - 3)) + 3;
  let arr: TRenderElement[] = [];
  for (let i = 0; i < amountEl - 1; i++) {
    arr.push({
      val: Math.floor(Math.random() * (100 - 0)) + 0,
      type: ElementStates.Default,
    });
  }

  return arr;
};
