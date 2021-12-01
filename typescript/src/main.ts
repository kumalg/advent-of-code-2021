#!/usr/bin/env node
import { bold, yellowBright } from "chalk";
import Day from "./days/day01";

function formattedResult(result: string | number): string {
  return bold(yellowBright(result));
}

export const main = (): boolean => {
  const day = new Day();
  const arg = process.argv[2];

  if (!arg || arg === "1") {
    console.log(`First star:  ${formattedResult(day.firstStar())}`);
  }

  if (!arg || arg === "2") {
    console.log(`Second star: ${formattedResult(day.secondStar())}`);
  }

  return true;
};

main();
