import { TRenderElement } from "../types/render-element-column";
import { ElementStates } from "../types/element-states";
import { sleep } from "./sleep";
import { TStateButton } from "../components/sorting-page/sorting-page";
export const selectionDescending = async (
  arr: TRenderElement[],
  renderFunc: (arr: TRenderElement[]) => void,
  setStateButton: (state: TStateButton) => void
) => {
  setStateButton({
    asc: { disabled: true, isLoader: false },
    dsc: { disabled: false, isLoader: true },
    newArr: { disabled: true, isLoader: false },
  });
  const length = arr.length;
  let max: number = 0;
  let temp = null;
  for (let i = 0; i < length - 1; i++) {
    arr[i].type = ElementStates.Changing;
    temp = null;
    max = i;
    await sleep(500);
    for (let y = i + 1; y < length; y++) {
      arr[y].type = ElementStates.Changing;
      renderFunc(arr);
      await sleep(500);
      console.log(y);
      if (arr[y].val > arr[max].val) {
        max = y;
      }

      arr[y].type = ElementStates.Default;
      renderFunc(arr);
    }

    temp = arr[max].val;
    arr[max].val = arr[i].val;
    arr[i].val = temp;
    arr[i].type = ElementStates.Modified;
    renderFunc(arr);

    if (i === length - 2) {
      arr[i + 1].type = ElementStates.Modified;
      renderFunc(arr);
    }
  }
  setStateButton({
    asc: { disabled: false, isLoader: false },
    dsc: { disabled: false, isLoader: false },
    newArr: { disabled: false, isLoader: false },
  });
};
