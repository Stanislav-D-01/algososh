import { TRenderElement } from "../types/render-element-column";
import { ElementStates } from "../types/element-states";
import { sleep } from "./sleep";
export const selectionAscending = async (
  arr: TRenderElement[],
  renderFunc: (arr: TRenderElement[]) => void
) => {
  const length = arr.length;
  let min: number = 0;
  let temp = null;
  for (let i = 0; i < length - 1; i++) {
    arr[i].type = ElementStates.Changing;
    temp = null;
    min = i;
    await sleep(500);
    for (let y = i + 1; y < length; y++) {
      arr[y].type = ElementStates.Changing;
      renderFunc(arr);
      await sleep(500);
      console.log(y);
      if (arr[y].val < arr[min].val) {
        min = y;
      }

      arr[y].type = ElementStates.Default;
      renderFunc(arr);
    }

    temp = arr[min].val;
    arr[min].val = arr[i].val;
    arr[i].val = temp;
    arr[i].type = ElementStates.Modified;
    renderFunc(arr);

    if (i === length - 2) {
      arr[i + 1].type = ElementStates.Modified;
      renderFunc(arr);
    }
  }
};
