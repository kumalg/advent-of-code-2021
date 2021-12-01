#!/usr/bin/env node
import Day from "./days/day01";

export const main = (): boolean => {
  const day = new Day();
  const arg = process.argv[2];

  if (!arg || arg === "1") {
    console.log(`First star: ${day.firstStar()}`);
  }

  if (!arg || arg === "2") {
    console.log(`Second star: ${day.secondStar()}`);
  }

  return true;
};

main();
