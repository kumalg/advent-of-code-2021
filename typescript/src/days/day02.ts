import { readFileSync } from "fs";
import path from "path";
import { Day } from "../classes/day";

export default class extends Day {
  input: Array<string>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = readFileSync(path.join(this.basePath, "input.txt"), "utf-8")
      .split(/\r?\n/)
      .filter((line) => line);
  }

  firstStar(): string | number {
    throw new Error("Method not implemented.");
  }

  secondStar(): string | number {
    throw new Error("Method not implemented.");
  }
}
