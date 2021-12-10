export const range = (count: number, start = 0): Array<number> => {
  return [...new Array(count)].map((_, i) => i + start);
};

export const rotateArray = (array: Array<Array<any>>): Array<Array<any>> => {
  return array
    .flatMap((row, y) => row.map((cell, x) => ({ cell, x, y })))
    .reduce((list: Array<any>, { cell, x, y }) => (((list[x] ??= [])[y] = cell) && false) || list, []);
};
