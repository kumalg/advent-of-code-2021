import { Day } from "../day";

export default class extends Day {
  input: Array<string>;
  openingChars = ["(", "[", "{", "<"];
  pairs: { [key: string]: string } = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines();
  }

  findSyntaxError(line: string): string | undefined {
    const expectedHeap: Array<string> = [];

    return line.split("").find((char) => {
      if (this.openingChars.includes(char)) {
        expectedHeap.push(char);
        return false;
      }

      if (this.pairs[expectedHeap.last()] === char) {
        expectedHeap.pop();
        return false;
      }

      return true;
    });
  }

  repairLine(line: string): Array<string> {
    const expectedHeap: Array<string> = [];

    line.split("").forEach((char) => {
      if (this.openingChars.includes(char)) {
        expectedHeap.push(char);
        return;
      }

      if (this.pairs[expectedHeap.last()] === char) {
        expectedHeap.pop();
      }
    });

    return expectedHeap.map((char) => this.pairs[char]).reverse();
  }

  firstStar(): number {
    const points: { [key: string]: number } = {
      ")": 3,
      "]": 57,
      "}": 1197,
      ">": 25137,
    };

    return this.input
      .map(this.findSyntaxError.bind(this))
      .map((char) => (char ? points[char] : 0))
      .sum();
  }

  secondStar(): number {
    const points: { [key: string]: number } = {
      ")": 1,
      "]": 2,
      "}": 3,
      ">": 4,
    };

    const results = this.input
      .filter((line) => !this.findSyntaxError(line))
      .map(this.repairLine.bind(this))
      .map((chars) => chars.reduce((acc, curr): number => acc * 5 + points[curr], 0))
      .orderBy();

    return results[(results.length - 1) / 2];
  }
}
