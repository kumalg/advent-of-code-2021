import { groupBy } from "lodash";
import { Day } from "../day";

export default class extends Day {
  polymer: string;
  instructions: { [key: string]: string };

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    const input = this.getInputLines();

    this.polymer = input[0];
    this.instructions = Object.fromEntries(input.slice(1).map((line) => line.split(" -> ")));
  }

  firstStar(): number {
    const steps = 10;

    const polymer = this.polymer.split("");
    for (let step = 0; step < steps; step++) {
      for (let charIndex = 0; charIndex < polymer.length; charIndex++) {
        const pair = polymer.slice(charIndex, charIndex + 2).join("");
        const matchingInsertion = this.instructions[pair];

        if (matchingInsertion) {
          polymer.splice(++charIndex, 0, matchingInsertion);
        }
      }
    }

    const charCounts = Object.values(groupBy(polymer)).map((list) => list.length);

    return Math.max(...charCounts) - Math.min(...charCounts);
  }

  secondStar(): number {
    const steps = 40;

    const polymer = this.polymer.split("");
    for (let step = 0; step < steps; step++) {
      console.log("calculating step:", step);
      for (let charIndex = 0; charIndex < polymer.length; charIndex++) {
        const pair = polymer.slice(charIndex, charIndex + 2).join("");
        const matchingInsertion = this.instructions[pair];

        if (matchingInsertion) {
          polymer.splice(++charIndex, 0, matchingInsertion);
        }
      }
    }

    const charCounts = Object.values(groupBy(polymer)).map((list) => list.length);

    return Math.max(...charCounts) - Math.min(...charCounts);
  }
}
