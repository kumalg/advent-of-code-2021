#!/usr/bin/env node
import Day from "./days/day1";

export const main = (): boolean => {
  const day = new Day();

  const firstResult = day.firstPart();
  console.log(`First part: ${firstResult}`);

  const secondResult = day.secondPart();
  console.log(`Second part: ${secondResult}`);

  return true;
};

main();
