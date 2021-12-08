#!/usr/bin/env node
import path from "path";
import Day from "./days/day08";

declare global {
  interface Array<T> {
    sum(func?: (item: T) => number): number;
    orderBy(func?: (item: T) => number): Array<T>;
    orderByDescending(func?: (item: T) => number): Array<T>;
  }
}

Array.prototype.sum = function (func) {
  return this.reduce((acc, curr) => acc + (func ? func(curr) : curr), 0);
};

Array.prototype.orderBy = function <T>(func?: (item: T) => number) {
  if (func) {
    return this.sort((a: T, b: T) => func(a) - func(b));
  }
  return this.sort((a: number, b: number) => a - b);
};

Array.prototype.orderByDescending = function <T>(func?: (item: T) => number) {
  if (func) {
    return this.sort((a: T, b: T) => func(b) - func(a));
  }
  return this.sort((a: number, b: number) => b - a);
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
