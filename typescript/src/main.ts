#!/usr/bin/env node
import Day from "./days/day01";

export const main = (): boolean => {
  const day = new Day();
  const arg = process.argv[2];

  if (!arg || arg === "1") {
    const firstResult = day.firstPart();
    console.log(`First part: ${firstResult}`);
  }

  if (!arg || arg === "2") {
    const secondResult = day.secondPart();
    console.log(`Second part: ${secondResult}`);
  }

  return true;
};

main();
