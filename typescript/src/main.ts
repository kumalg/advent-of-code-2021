#!/usr/bin/env node
import { bold, yellowBright } from "chalk";
import path from "path";
import Day from "./days/day01";

function formattedResult(result: string | number): string {
  return bold(yellowBright(result));
}

export const main = (): boolean => {
  const resourcesPath = path.join(__dirname, "../resources");
  const day = new Day(resourcesPath);
  const arg = process.argv[2];

  console.log();

  if (!arg || arg === "1") {
    console.log(`First star:  ${formattedResult(day.firstStar())}`);
  }

  if (!arg || arg === "2") {
    console.log(`Second star: ${formattedResult(day.secondStar())}`);
  }

  console.log();

  return true;
};

main();
