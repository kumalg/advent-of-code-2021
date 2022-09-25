import { Day } from "../day";

export default class extends Day {
  input: Array<string>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines();
  }

  private getAllIndices(string: string, pattern: string | RegExp): Array<number> {
    return [...string.matchAll(new RegExp(pattern, "gi"))].map((a) => a.index) as Array<number>;
  }

  firstStar(): number {
    const str = "[[[[0,7],4],[7,[[8,4],9]]],[1,1]]";

    const indices = this.getAllIndices(str, /\[\d+,\d+\]/);

    const elo = indices.filter((index) => {
      const substring = str.substring(0, index);

      const res = this.getAllIndices(substring, /\[/).length - this.getAllIndices(substring, /\]/).length;

      return res === 4;
    })[0];

    if (elo) {
      const leftSubstring = str.substring(0, elo);
      const rightSubstring2 = str.substring(elo);

      const rightSubstringStartIndex = rightSubstring2.indexOf("]");

      const rightSubstring = rightSubstring2.substring(rightSubstringStartIndex + 1);
      const num = rightSubstring2.substring(0, rightSubstringStartIndex + 1);

      console.log(leftSubstring + "   " + num + "   " + rightSubstring);
      console.log(str);

      const [leftNum, rightNum] =
        num
          .match(/\[(\d+),(\d+)\]/)
          ?.slice(1)
          .map((num) => parseInt(num)) || [];

      console.log({ leftNum, rightNum });

      if (leftSubstring.endsWith(",")) {
        console.log("left");
      } else {
        console.log("right");

        const match = rightSubstring.match(/^,(\d+)/);

        if (match !== null) {
          const oldNum = match.slice(1).map((num) => parseInt(num))[0];
          console.log(rightSubstring);
          console.log(rightSubstring.replace(match[0], `0,${oldNum + rightNum}`));
        }

        const matchLeft = leftSubstring.match(/\[\d+/g);

        if (matchLeft) {
          const lastMatchLeft = matchLeft[matchLeft.length - 1];
          console.log(matchLeft);
          console.log(lastMatchLeft);
        }
      }
    }

    console.log(elo);

    return 0;
  }

  secondStar(): number {
    return 0;
  }
}
