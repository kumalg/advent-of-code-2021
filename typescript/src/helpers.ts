export const range = (count: number, start = 0): Array<number> => {
  return [...new Array(count)].map((_, i) => i + start);
};
