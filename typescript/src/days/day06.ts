import { groupBy } from "lodash";
import { Day } from "../day";

// "test.txt"

export default class extends Day {
  input: Array<number>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputText()
      .trim()
      .split(",")
      .map((e) => parseInt(e));
  }

  countLanternfishes(days: number) {
    const list = [...this.input];

    const listObject = Object.fromEntries(
      Object.entries(groupBy(list)).map(([key, value]) => [
        key.toString(),
        value.length,
      ])
    );

    const result: object = [...new Array(days)].reduce((acc) => {
      return {
        0: acc["1"] || 0,
        1: acc["2"] || 0,
        2: acc["3"] || 0,
        3: acc["4"] || 0,
        4: acc["5"] || 0,
        5: acc["6"] || 0,
        6: (acc["7"] || 0) + (acc["0"] || 0),
        7: acc["8"] || 0,
        8: acc["0"] || 0,
      };
    }, listObject);

    return Object.values(result).reduce((acc, curr) => acc + curr, 0);
  }

  firstStar(): number {
    return this.countLanternfishes(80);
  }

  secondStar(): number {
    return this.countLanternfishes(256);
  }
}
