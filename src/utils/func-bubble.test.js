import { bubbleSorting } from "./func-bubble";
import { ElementStates } from "../types/element-states";
import { TRenderElement } from "../types/render-element-column";

describe("Тестирование алгоритмов сортировки пузырьком Asc", () => {
  test("массив из одного элемента", async () => {
    const sort = await bubbleSorting(
      [{ val: 1, type: ElementStates.Default }],
      "Asc",
    );
    expect(sort).toStrictEqual([{ val: 1, type: ElementStates.Modified }]);
  });
  test("пустой массив", async () => {
    const sort = await bubbleSorting([], "Asc");
    expect(sort).toStrictEqual([]);
  });
  test("массив из нескольких элементов", async () => {
    const sort = await bubbleSorting(
      [
        { val: 5, type: ElementStates.Default },
        { val: 1, type: ElementStates.Default },
        { val: 10, type: ElementStates.Default },
      ],
      "Asc",
    );
    expect(sort).toStrictEqual([
      { val: 1, type: ElementStates.Modified },
      { val: 5, type: ElementStates.Modified },
      { val: 10, type: ElementStates.Modified },
    ]);
  });
});

describe("Тестирование алгоритмов сортировки пузырьком Desc", () => {
  test("массив из одного элемента", async () => {
    const sort = await bubbleSorting(
      [{ val: 1, type: ElementStates.Default }],
      "Desc",
    );
    expect(sort).toStrictEqual([{ val: 1, type: ElementStates.Modified }]);
  });
  test("пустой массив", async () => {
    const sort = await bubbleSorting([], "Desc");
    expect(sort).toStrictEqual([]);
  });
  test("массив из нескольких элементов", async () => {
    const sort = await bubbleSorting(
      [
        { val: 5, type: ElementStates.Default },
        { val: 1, type: ElementStates.Default },
        { val: 10, type: ElementStates.Default },
      ],
      "Desc",
    );
    expect(sort).toStrictEqual([
      { val: 10, type: ElementStates.Modified },
      { val: 5, type: ElementStates.Modified },
      { val: 1, type: ElementStates.Modified },
    ]);
  });
});
