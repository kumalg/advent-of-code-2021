import { readFileSync } from "fs";
import { Day } from "interfaces/day";
import path from "path/posix";

export default class Day1 implements Day {
  input: Array<string>;

  constructor() {
    this.input = readFileSync(path.join(__dirname, "input.txt"), "utf-8")
      .split("\r\n")
      .filter((line) => line);
  }

  async firstPart(): Promise<string | number> {
    console.log(this.input);
    return "mam to";
  }

  async secondPart(): Promise<string | number> {
    return "mam to 2";
  }
}
