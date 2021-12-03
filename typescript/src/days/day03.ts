import { groupBy } from "lodash";
import { Day } from "../day";

export default class extends Day {
  input: Array<string>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines();
  }

  firstStar(): number {
    const width = this.input[0].length;

    let gamma = "";
    let epsilon = "";

    for (let i = 0; i < width; i++) {
      const digits = groupBy(this.input.map((line) => line[i]));
      gamma += digits["0"].length > digits["1"].length ? "0" : "1";
      epsilon += digits["0"].length > digits["1"].length ? "1" : "0";
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
  }

  secondStar(): number {
    const width = this.input[0].length;

    let oxygen = [...this.input];
    let scrubber = [...this.input];

    for (let i = 0; i < width && oxygen.length > 1; i++) {
      const digits = groupBy(oxygen.map((line) => line[i]));
      const remaining = digits["0"].length > digits["1"].length ? "0" : "1";
      oxygen = oxygen.filter((o) => o[i] === remaining);
    }

    for (let i = 0; i < width && scrubber.length > 1; i++) {
      const digits = groupBy(scrubber.map((line) => line[i]));
      const remaining = digits["0"].length > digits["1"].length ? "1" : "0";
      scrubber = scrubber.filter((o) => o[i] === remaining);
    }

    return parseInt(oxygen[0], 2) * parseInt(scrubber[0], 2);
  }
}
