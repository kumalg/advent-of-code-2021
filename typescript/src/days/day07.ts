import { range } from "../helpers";
import { Day } from "../day";

export default class extends Day {
  input: Array<number>;
  max: number;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputText()
      .trim()
      .split(",")
      .map((e) => parseInt(e));
    this.max = [...this.input].orderByDescending()[0];
  }

  cheapestOutcomeFuel(burnFunc: (steps: number) => number) {
    return range(this.max, 1)
      .map((to) =>
        this.input.map((from) => burnFunc(Math.abs(from - to))).sum()
      )
      .orderBy()[0];
  }

  firstStar(): number {
    return this.cheapestOutcomeFuel((steps) => steps);
  }

  secondStar(): number {
    return this.cheapestOutcomeFuel((steps) => range(steps, 1).sum());
  }
}
