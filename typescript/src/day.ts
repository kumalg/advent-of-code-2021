import { bold, yellowBright } from "chalk";
import { readFileSync } from "fs";
import path from "path";

export abstract class Day {
  basePath: string;

  abstract firstStar(): string | number | bigint;
  abstract secondStar(): string | number | bigint;

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

  printFirstStar(): void {
    console.log(`First star:  ${this.formattedResult(this.firstStar())}`);
  }

  printSecondStar(): void {
    console.log(`Second star: ${this.formattedResult(this.secondStar())}`);
  }

  private formattedResult(result: string | number | bigint): string {
    return bold(yellowBright(result));
  }
}
