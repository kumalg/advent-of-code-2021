import { groupBy } from "lodash";
import { Day } from "../day";

export default class extends Day {
  input: Array<{ start: number[]; end: number[] }>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    const regex = /(\d+),(\d+) -> (\d+),(\d+)/;
    this.input = this.getInputLines().map((line) => {
      const [xS, yS, xE, yE] =
        line
          .match(regex)
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
          return [...new Array(Math.abs(yEnd - yStart) + 1)].map((_, i) => [
            xEnd,
            Math.min(yEnd, yStart) + i,
          ]);
        }

        if (yStart === yEnd) {
          return [...new Array(Math.abs(xEnd - xStart) + 1)].map((_, i) => [
            Math.min(xEnd, xStart) + i,
            yEnd,
          ]);
        }

        if (
          withDiagonals &&
          Math.abs(xStart - xEnd) === Math.abs(yStart - yEnd)
        ) {
          return [...new Array(Math.abs(xEnd - xStart) + 1)].map((_, i) => [
            xStart < xEnd ? xStart + i : xStart - i,
            yStart < yEnd ? yStart + i : yStart - i,
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
