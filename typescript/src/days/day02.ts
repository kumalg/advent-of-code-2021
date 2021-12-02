import { Day } from "../day";

export default class extends Day {
  input: Array<{ type: string; value: number }>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines().map((line) => {
      const [type, value] = line.split(" ");
      return {
        type,
        value: parseInt(value),
      };
    });
  }

  firstStar(): number {
    const finalPosition = this.input.reduce(
      (position, { type, value }) => {
        if (type === "forward") {
          position.horizontal += value;
        } else if (type === "down") {
          position.depth += value;
        } else if (type === "up") {
          position.depth -= value;
        }
        return position;
      },
      { horizontal: 0, depth: 0 }
    );

    return finalPosition.horizontal * finalPosition.depth;
  }

  secondStar(): number {
    const finalPosition = this.input.reduce(
      (position, { type, value }) => {
        if (type === "forward") {
          position.horizontal += value;
          position.depth += position.aim * value;
        } else if (type === "down") {
          position.aim += value;
        } else if (type === "up") {
          position.aim -= value;
        }
        return position;
      },
      { aim: 0, horizontal: 0, depth: 0 }
    );

    return finalPosition.horizontal * finalPosition.depth;
  }
}
