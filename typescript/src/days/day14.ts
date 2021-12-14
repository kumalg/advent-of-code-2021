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
    let pairsOccurrencies = Object.fromEntries(
      Object.keys(this.instructions).map((pair) => [pair, countOcurrences(this.polymer, pair)])
    );

    for (let step = 0; step < steps; step++) {
      const newPairs = Object.fromEntries(Object.keys(this.instructions).map((key) => [key, 0]));

      Object.entries(pairsOccurrencies).forEach(([pair, occurrencies]) => {
        const newChar = this.instructions[pair];

        newPairs[pair[0] + newChar] += occurrencies;
        newPairs[newChar + pair[1]] += occurrencies;
      });

      pairsOccurrencies = newPairs;
    }

    const keys = [...new Set(Object.keys(pairsOccurrencies).map(([[char]]) => char))];

    const keysCount = keys.map((key) => {
      return Object.entries(pairsOccurrencies)
        .filter(([[char]]) => char === key)
        .sum(([, occ]) => occ);
    });

    return Math.max(...keysCount) - Math.min(...keysCount) + 1;
  }

  firstStar(): number {
    return this.getDifference(10);
  }

  secondStar(): number {
    return this.getDifference(40);
  }
}
