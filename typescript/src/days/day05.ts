import { groupBy } from "lodash";
import { Day } from "../day";

export default class extends Day {
  input: Array<{ start: number[]; end: number[] }>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines().map((line) => {
      const [startStr, endStr] = line.split(" -> ");
      const start = startStr.split(",").map((e: string) => parseInt(e));
      const end = endStr.split(",").map((e: string) => parseInt(e));

      return {
        start,
        end,
      };
    });
  }

  private getOverlappedPointsCount(withDiagonals: boolean): number {
    const points = this.input
      .map(({ start, end }) => {
        if (start[0] === end[0]) {
          return [...new Array(Math.abs(end[1] - start[1]) + 1)].map((_, i) => [
            end[0],
            Math.min(end[1], start[1]) + i,
          ]);
        }

        if (start[1] === end[1]) {
          return [...new Array(Math.abs(end[0] - start[0]) + 1)].map((_, i) => [
            Math.min(end[0], start[0]) + i,
            end[1],
          ]);
        }

        if (
          withDiagonals &&
          Math.abs(start[0] - end[0]) === Math.abs(start[1] - end[1])
        ) {
          return [...new Array(Math.abs(end[0] - start[0]) + 1)].map((_, i) => [
            start[0] < end[0] ? start[0] + i : start[0] - i,
            start[1] < end[1] ? start[1] + i : start[1] - i,
          ]);
        }

        return [];
      })
      .flatMap((e) => e)
      .map(([x, y]) => x + "," + y);

    return Object.values(groupBy(points)).filter((e) => e.length > 1).length;
  }

  firstStar(): number {
    return this.getOverlappedPointsCount(false);
  }

  secondStar(): number {
    return this.getOverlappedPointsCount(true);
  }
}