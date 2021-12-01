import { readFileSync } from "fs";
import { Day } from "interfaces/day";
import path from "path/posix";

export default class Day1 implements Day {
  input: Array<number>;

  constructor() {
    this.input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
      .split("\r\n")
      .filter((line) => line)
      .map((line) => parseInt(line));
  }

  private getIncreasedCount(array: Array<number>): number {
    return array.filter((number, i) => i > 0 && number > array[i - 1]).length;
  }

  firstPart(): number {
    return this.getIncreasedCount(this.input);
  }

  secondPart(): number {
    const { input } = this;

    const list = input
      .slice(0, -2)
      .map((number, i) => number + input[i + 1] + input[i + 2]);

    return this.getIncreasedCount(list);
  }
}
