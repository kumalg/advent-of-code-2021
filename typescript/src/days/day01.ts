import { Day } from "../day";

export default class extends Day {
  input: Array<number>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines().map((line) => parseInt(line));
  }

  private getIncreasedCount(array: Array<number>, zipSize: number): number {
    return array
      .slice(0, 1 - zipSize || undefined)
      .map((_, i) =>
        array.slice(i, i + zipSize).reduce((acc, curr) => acc + curr)
      )
      .filter((number, i, list) => i > 0 && number > list[i - 1]).length;
  }

  firstStar(): number {
    return this.getIncreasedCount(this.input, 1);
  }

  secondStar(): number {
    return this.getIncreasedCount(this.input, 3);
  }
}
