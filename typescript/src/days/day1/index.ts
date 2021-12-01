import { readFileSync } from "fs";
import { Day } from "interfaces/day";
import path from "path/posix";

interface Acc {
  previous: null | number;
  increasedCount: number;
}

export default class Day1 implements Day {
  input: Array<number>;

  constructor() {
    this.input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
      .split("\r\n")
      .filter((line) => line)
      .map((line) => parseInt(line));
  }

  private getIncreasedCount(array: Array<number>): number {
    return array.reduce<Acc>(
      ({ previous, increasedCount }, current) => {
        return {
          previous: current,
          increasedCount:
            previous !== null && previous < current
              ? increasedCount + 1
              : increasedCount,
        };
      },
      {
        previous: null,
        increasedCount: 0,
      }
    ).increasedCount;
  }

  async firstPart(): Promise<string | number> {
    return this.getIncreasedCount(this.input);
  }

  async secondPart(): Promise<string | number> {
    const { input } = this;

    const list = input
      .slice(0, -2)
      .map((number, i) => number + input[i + 1] + input[i + 2]);

    return this.getIncreasedCount(list);
  }
}
