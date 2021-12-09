import { Day } from "../day";

export default class extends Day {
  input: Array<Array<number>>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines().map((line) => line.split("").map((e) => parseInt(e)));
  }

  firstStar(): number {
    return this.getLowPoints().sum(({ num }) => num + 1);
  }

  secondStar(): number {
    return this.getLowPoints()
      .map(
        ({ x, y }) =>
          this.findBasinPoints(x, y, []).filter(
            ({ x, y }, index, list) => list.findIndex((pos) => pos.x === x && pos.y === y) === index
          ).length
      )
      .orderByDescending()
      .slice(0, 3)
      .reduce((acc, curr) => acc * curr);
  }

  getAdjacents(x: number, y: number): Array<{ x: number; y: number }> {
    return [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ].filter(({ x, y }) => x >= 0 && y >= 0 && x < this.input[0].length && y < this.input.length);
  }

  getLowPoints(): Array<{ num: number; x: number; y: number }> {
    return this.input
      .flatMap((line, y) => line.map((num, x) => ({ num, x, y })))
      .filter(({ num, x, y }) =>
        this.getAdjacents(x, y)
          .map(({ x, y }) => this.input[y][x])
          .every((adjNum) => adjNum > num)
      );
  }

  findBasinPoints(x: number, y: number, list: Array<{ x: number; y: number }>): Array<{ x: number; y: number }> {
    list.push({ x, y });

    this.getAdjacents(x, y)
      .filter(
        ({ x, y }) => this.input[y][x] < 9 && list.findIndex(({ x: listX, y: listY }) => listX === x && listY === y) < 0
      )
      .forEach(({ x, y }) => this.findBasinPoints(x, y, list));

    return list;
  }
}
