import { reverseString } from "./func-string";

describe("Тестирование алгоритма разворота строки", () => {
  test("с чётным количеством символов", () => {
    expect(reverseString(["a", "b", "c", "d"])).toStrictEqual([
      "d",
      "c",
      "b",
      "a",
    ]);
  });
  test("с нечетным количеством символов", () => {
    expect(reverseString(["a", "b", "c", "d", "e"])).toStrictEqual([
      "e",
      "d",
      "c",
      "b",
      "a",
    ]);
  });
  test("с одним символом", () => {
    expect(reverseString(["a"])).toStrictEqual(["a"]);
  });
  test("пустую строку", () => {
    expect(reverseString([])).toStrictEqual([]);
  });
});
