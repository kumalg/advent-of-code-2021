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
      const oxygenDigits = groupBy(oxygen.map((line) => line[i]));

      const oxygenLength0 = oxygenDigits["0"]?.length || 0;
      const oxygenLength1 = oxygenDigits["1"]?.length || 0;

      if (oxygenLength0 > oxygenLength1) {
        oxygen = oxygen.filter((o) => o[i] === "0");
      } else {
        oxygen = oxygen.filter((o) => o[i] === "1");
      }
    }

    for (let i = 0; i < width && scrubber.length > 1; i++) {
      const scrubberDigits = groupBy(scrubber.map((line) => line[i]));

      const scrubberLength0 = scrubberDigits["0"].length || 0;
      const scrubberLength1 = scrubberDigits["1"].length || 0;

      if (scrubberLength0 > scrubberLength1) {
        scrubber = scrubber.filter((o) => o[i] === "1");
      } else {
        scrubber = scrubber.filter((o) => o[i] === "0");
      }
    }

    return parseInt(oxygen[0], 2) * parseInt(scrubber[0], 2);
  }
}
