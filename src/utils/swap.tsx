import { TRenderElement } from "../types/render-element-column";

export const swap = (
  arr: TRenderElement[],
  i: number,
  j: number
): TRenderElement[] => {
  const temp = arr[i].val;
  arr[i].val = arr[j].val;
  arr[j].val = temp;
  return arr;
};
