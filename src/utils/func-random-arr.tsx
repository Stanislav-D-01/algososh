import { ElementStates } from "../types/element-states";
import { TRenderElement } from "../types/render-element-column";
export const randomArr = (
  minEl: number,
  maxEl: number,
  minVal: number,
  maxVal: number
) => {
  const amountEl = Math.floor(Math.random() * (maxEl - minEl)) + minEl;
  let arr: TRenderElement[] = [];
  for (let i = 0; i < amountEl - 1; i++) {
    arr.push({
      val: Math.floor(Math.random() * (maxVal - minVal)) + minVal,
      type: ElementStates.Default,
    });
  }

  return arr;
};
