import { TRenderElement } from "../types/render-element-column";
import { ElementStates } from "../types/element-states";
import { sleep } from "./sleep";
import { swap } from "./swap";
import { TStateButton } from "../components/sorting-page/sorting-page";

export const bubbleSorting = async (
  arr: TRenderElement[],
  renderFunc: (arr: TRenderElement[]) => void,
  type: "Asc" | "Desc",
  setStateButton: (state: TStateButton) => void
) => {
  setStateButton({
    asc: {
      disabled: type === "Asc" ? false : true,
      isLoader: type === "Asc" ? true : false,
    },
    dsc: {
      disabled: type === "Desc" ? false : true,
      isLoader: type === "Desc" ? true : false,
    },
    newArr: { disabled: true, isLoader: false },
  });
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].type = ElementStates.Changing;
      arr[j + 1].type = ElementStates.Changing;
      renderFunc(arr);
      if (type === "Asc") {
        if (arr[j].val > arr[j + 1].val) {
          swap(arr, j, j + 1);
        }
      }
      if (type === "Desc") {
        if (arr[j].val < arr[j + 1].val) {
          swap(arr, j, j + 1);
        }
      }
      await sleep(500);
      arr[j].type = ElementStates.Default;
      arr[j + 1].type = ElementStates.Default;
      renderFunc(arr);
    }
    arr[length - i - 1].type = ElementStates.Modified;
    renderFunc(arr);
  }
  setStateButton({
    asc: { disabled: false, isLoader: false },
    dsc: { disabled: false, isLoader: false },
    newArr: { disabled: false, isLoader: false },
  });
};
