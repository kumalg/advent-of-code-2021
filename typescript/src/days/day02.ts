import { readFileSync } from "fs";
import { Day } from "interfaces/day";
import path from "path";

export default class implements Day {
  input: Array<string>;

  constructor(resources: string) {
    this.input = readFileSync(path.join(resources, "day02/input.txt"), "utf-8")
      .split(/\r?\n/)
      .filter((line) => line)
      .filter((line) => line);
  }

  firstStar(): string | number {
    throw new Error("Method not implemented.");
  }

  secondStar(): string | number {
    throw new Error("Method not implemented.");
  }
}
