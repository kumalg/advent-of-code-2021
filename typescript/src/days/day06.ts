import { groupBy } from "lodash";
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

  countLanternfishes(days: number) {
    const groupedTimers = groupBy(this.input);
    const initialState: Array<number> = [...new Array(9)].map(
      (_, i) => groupedTimers[i]?.length || 0
    );

    return [...new Array(days)]
      .reduce(
        (acc) => [...acc.slice(1, 7), acc[7] + acc[0], acc[8], acc[0]],
        initialState
      )
      .reduce((acc: number, curr: number) => acc + curr);
  }

  firstStar(): number {
    return this.countLanternfishes(80);
  }

  secondStar(): number {
    return this.countLanternfishes(256);
  }
}
