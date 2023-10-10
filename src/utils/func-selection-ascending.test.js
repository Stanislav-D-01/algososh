import { selectionAscending } from "./func-selection-ascending";
import { ElementStates } from "../types/element-states";

describe("Тестирование алгоритмов сортировки выбором Asc", () => {
  test("массив с одним элемментом", async () => {
    const sort = await selectionAscending([
      { val: 1, type: ElementStates.Default },
    ]);
    expect(sort).toStrictEqual([{ val: 1, type: ElementStates.Default }]);
  });
  test("пустой массив", async () => {
    const sort = await selectionAscending([]);
    expect(sort).toStrictEqual([]);
  });
  test("массив из нескольких элементов", async () => {
    const sort = await selectionAscending([
      { val: 10, type: ElementStates.Default },
      { val: 1, type: ElementStates.Default },
      { val: 6, type: ElementStates.Default },
    ]);
    expect(sort).toStrictEqual([
      { val: 1, type: ElementStates.Modified },
      { val: 6, type: ElementStates.Modified },
      { val: 10, type: ElementStates.Modified },
    ]);
  });
});
