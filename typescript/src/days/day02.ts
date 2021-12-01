import { Day } from "../day";

export default class extends Day {
  input: Array<string>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines();
  }

  firstStar(): string | number {
    throw new Error("Method not implemented.");
  }

  secondStar(): string | number {
    throw new Error("Method not implemented.");
  }
}
