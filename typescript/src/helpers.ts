export const range = (start: number, count: number): Array<number> => {
  return [...new Array(count)].map((_, i) => i + start);
};
