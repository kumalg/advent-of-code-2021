import { range } from "../helpers";
import { Day } from "../day";

export default class extends Day {
  input: Array<number>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputText()
      .trim()
      .split(",")
      .map((e) => parseInt(e));
  }

  firstStar(): number {
    const { input } = this;
    const max = [...input].sort((a, b) => b - a)[0];

    return range(max, 1)
      .map((curr) => input.map((i) => Math.abs(i - curr)).sum())
      .sort((a, b) => a - b)[0];
  }

  secondStar(): number {
    const { input } = this;
    const max = [...input].sort((a, b) => b - a)[0];

    return range(max, 1)
      .map((curr) => input.map((i) => range(Math.abs(i - curr), 1).sum()).sum())
      .sort((a, b) => a - b)[0];
  }
}
