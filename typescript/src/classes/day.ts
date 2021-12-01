import { readFileSync } from "fs";
import path from "path";
import { IDay } from "../interfaces/day";

export abstract class Day implements IDay {
  basePath: string;

  abstract firstStar(): string | number;
  abstract secondStar(): string | number;

  constructor(resourcesPath: string, fileName: string) {
    const dayName = path.parse(fileName).name;
    this.basePath = path.join(resourcesPath, dayName);
  }

  getInputText(fileName = "input.txt"): string {
    return readFileSync(path.join(this.basePath, fileName), "utf-8");
  }

  getInputLines(fileName = "input.txt"): Array<string> {
    return this.getInputText(fileName)
      .split(/\r?\n/)
      .filter((line) => line);
  }
}
