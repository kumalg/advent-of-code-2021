import Day from "./days/day1";

export const start = async (): Promise<boolean> => {
  const day = new Day();

  const firstResult = await day.firstPart();
  console.log(`First part: ${firstResult}`);

  const secondResult = await day.secondPart();
  console.log(`Second part: ${secondResult}`);

  return true;
};
