import { groupBy } from "lodash";
import { range } from "../helpers";
import { Day } from "../day";

export default class extends Day {
  input: Array<{ start: number[]; end: number[] }>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines().map((line) => {
      const [xS, yS, xE, yE] =
        line
          .match(/(\d+),(\d+) -> (\d+),(\d+)/)
          ?.slice(1)
          .map((e) => parseInt(e)) || [];

      return {
        start: [xS, yS],
        end: [xE, yE],
      };
    });
  }

  private getOverlappedPointsCount(withDiagonals: boolean): number {
    const points = this.input
      .map(({ start: [xStart, yStart], end: [xEnd, yEnd] }) => {
        if (xStart === xEnd) {
          return range(Math.min(yEnd, yStart), Math.abs(yEnd - yStart) + 1).map(
            (y) => [xEnd, y]
          );
        }

        if (yStart === yEnd) {
          return range(Math.min(xEnd, xStart), Math.abs(xEnd - xStart) + 1).map(
            (x) => [x, yEnd]
          );
        }

        if (
          withDiagonals &&
          Math.abs(xStart - xEnd) === Math.abs(yStart - yEnd)
        ) {
          return range(0, Math.abs(xEnd - xStart) + 1).map((i) => [
            xStart < xEnd ? xStart + i : xStart - i,
            yStart < yEnd ? yStart + i : yStart - i,
          ]);
        }

        return [];
      })
      .flat()
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
