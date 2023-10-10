import { getFibonacci } from "./func-fibonacci";

test("проверка Фибоначи", () => {
  expect(getFibonacci(5)).toStrictEqual([1, 1, 2, 3, 5, 8]);
});
