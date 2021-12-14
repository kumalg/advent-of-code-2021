import { range } from "../helpers";
import { Day } from "../day";

function countOcurrences(str: string, value: string) {
  const regExp = new RegExp(value, "gi");
  return (str.match(regExp) || []).length;
}

export default class extends Day {
  polymer: string;
  instructions: { [key: string]: string };

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    const input = this.getInputLines();

    this.polymer = input[0];
    this.instructions = Object.fromEntries(input.slice(1).map((line) => line.split(" -> ")));
  }

  getDifference(steps: number): number {
    const initialPairs = Object.fromEntries(
      Object.keys(this.instructions).map((pair) => [pair, countOcurrences(this.polymer, pair)])
    );

    const pairs = range(steps).reduce((oldPairs) => {
      const newPairs = Object.fromEntries(Object.keys(this.instructions).map((key) => [key, 0]));

      Object.entries(oldPairs).forEach(([pair, occurrencies]) => {
        const newChar = this.instructions[pair];

        newPairs[pair[0] + newChar] += occurrencies;
        newPairs[newChar + pair[1]] += occurrencies;
      });

      return newPairs;
    }, initialPairs);

    const keysCount = Object.fromEntries(
      Object.keys(pairs)
        .map(([[char]]) => char)
        .distinct()
        .map((key) => [
          key,
          Object.entries(pairs)
            .filter(([[char]]) => char === key)
            .sum(([, occ]) => occ),
        ])
    );
    keysCount[this.polymer.slice(-1)] += 1;

    const counts = Object.values(keysCount);

    return Math.max(...counts) - Math.min(...counts);
  }

  firstStar(): number {
    return this.getDifference(10);
  }

  secondStar(): number {
    return this.getDifference(40);
  }
}
