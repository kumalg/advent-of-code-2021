#!/usr/bin/env node
import path from "path";
import Day from "./days/day06";

declare global {
  interface Array<T> {
    sum(func?: (item: T) => number | bigint): number | bigint;
  }
}

Array.prototype.sum = function <T>(func?: (item: T) => number | bigint) {
  if (func) {
    return this.reduce((acc, curr) => acc + func(curr), 0);
  }
  return this.reduce((acc, curr) => acc + curr, 0);
};

const resourcesPath = path.join(__dirname, "../resources");
const day = new Day(resourcesPath);
const arg = process.argv[2];

console.log();

if (!arg || arg === "1") {
  day.printFirstStar();
}

if (!arg || arg === "2") {
  day.printSecondStar();
}

console.log();
