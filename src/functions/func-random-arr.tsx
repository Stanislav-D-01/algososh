export const randomArr = (): number[] => {
  const amountEl = Math.floor(Math.random() * (17 - 3)) + 3;
  let arr: number[] = [];
  for (let i = 0; i < amountEl - 1; i++) {
    arr.push(Math.floor(Math.random() * (100 - 0)) + 0);
  }

  return arr;
};
