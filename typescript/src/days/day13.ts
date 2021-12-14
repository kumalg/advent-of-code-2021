import { bold, yellowBright } from "chalk";
import { Day } from "../day";
import { range } from "../helpers";

export default class extends Day {
  input: Array<string>;
  dots: Array<[number, number]>;
  folds: Array<{ side: string; position: number }>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines();

    this.dots = this.input
      .filter((line) => line && !line.startsWith("fold"))
      .map((line) => line.split(",").map((num) => parseInt(num)))
      .map(([x, y]) => [x, y]);

    this.folds = this.input
      .filter((line) => line && line.startsWith("fold"))
      .map((foldLine) => foldLine.match(/fold along ([xy])=(\d+)/))
      .map(([, side, position]: any) => ({
        side,
        position: parseInt(position),
      }));
  }

  fold(maxSteps: number | undefined = undefined): Array<[number, number]> {
    let currentDots = [...this.dots];

    this.folds.slice(0, maxSteps).forEach(({ side, position }) => {
      if (side === "y") {
        currentDots = currentDots.map(([x, y]) => (y >= position ? [x, 2 * position - y] : [x, y]));
      } else {
        currentDots = currentDots.map(([x, y]) => (x >= position ? [2 * position - x, y] : [x, y]));
      }
    });

    return currentDots.filter(([x, y], index) => currentDots.findIndex(([x2, y2]) => x === x2 && y === y2) === index);
  }

  firstStar(): number {
    return this.fold(1).length;
  }

  secondStar(): number {
    const dots = this.fold();

    const xMax = Math.max(...dots.map(([x]) => x));
    const yMax = Math.max(...dots.map(([, y]) => y));

    const list = range(yMax + 1).map((y) =>
      range(xMax + 1).map((x) =>
        dots.some(([currX, currY]) => currX === x && currY === y) ? yellowBright(bold("█")) : " "
      )
    );

    console.log(list.map((line) => line.join("")).join("\n"));

    return dots.length;
  }
}
