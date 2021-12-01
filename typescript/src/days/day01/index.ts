import { readFileSync } from "fs";
import { Day } from "interfaces/day";
import path from "path";

export default class Day01 implements Day {
  input: Array<number>;

  constructor() {
    this.input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
      .split(/\r?\n/)
      .filter((line) => line)
      .map((line) => parseInt(line));
  }

  private getIncreasedCount(array: Array<number>, zipSize: number): number {
    return array
      .slice(0, 1 - zipSize || undefined)
      .map((_, i) =>
        array.slice(i, i + zipSize).reduce((acc, curr) => acc + curr, 0)
      )
      .filter((number, i, list) => i > 0 && number > list[i - 1]).length;
  }

  firstPart(): number {
    return this.getIncreasedCount(this.input, 1);
  }

  secondPart(): number {
    return this.getIncreasedCount(this.input, 3);
  }
}
