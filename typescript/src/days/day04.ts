import { Day } from "../day";

export default class extends Day {
  numbers: Array<number>;
  boards: Array<Array<Array<number>>>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    const input = this.getInputText()
      .trim()
      .split(/\r?\n\r?\n/);

    this.numbers = input[0].split(",").map((co) => parseInt(co));
    this.boards = input.slice(1).map((text) =>
      text.split(/\r?\n/).map((row) =>
        row
          .split(/\s+/)
          .filter((text) => text)
          .map((rowNum) => parseInt(rowNum))
      )
    );
  }

  firstStar(): number {
    const { numbers } = this;
    let winner: number[][] = [[]];
    let winningSubset: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
      const numbersSubset = numbers.slice(0, i + 1);

      const possiblyWinner = this.boards.find((numRows) => {
        const marked = numRows.map((row) =>
          row.map((num) => numbersSubset.includes(num))
        );
        return (
          marked.some((row) => row.every((bol) => bol)) ||
          marked[0].some((_, i) =>
            marked.map((row) => row[i]).every((bol) => bol)
          )
        );
      });

      if (possiblyWinner) {
        winner = possiblyWinner;
        winningSubset = numbersSubset;
        break;
      }
    }

    return (
      winner
        .flat()
        .filter((num) => !winningSubset.includes(num))
        .sum() * winningSubset[winningSubset.length - 1]
    );
  }

  secondStar(): number {
    const { numbers } = this;
    const winnerIndexes: number[] = [];
    let winner: number[][] = [[]];
    let winningSubset: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
      const numbersSubset = numbers.slice(0, i + 1);

      const possiblyWinner = this.boards
        .map((board, index) => ({ board, index }))
        .filter(({ index }) => !winnerIndexes.includes(index))
        .filter(({ board: numRows }) => {
          const marked = numRows.map((row) =>
            row.map((num) => numbersSubset.includes(num))
          );
          return (
            marked.some((row) => row.every((bol) => bol)) ||
            marked[0].some((_, i) =>
              marked.map((row) => row[i]).every((bol) => bol)
            )
          );
        });

      if (possiblyWinner?.length > 0) {
        winner = possiblyWinner[0].board;
        winningSubset = numbersSubset;
        possiblyWinner.forEach(({ index }) => winnerIndexes.push(index));

        if (winnerIndexes.length === this.boards.length) {
          break;
        }
      }
    }

    return (
      winner
        .flat()
        .filter((num) => !winningSubset.includes(num))
        .sum() * winningSubset[winningSubset.length - 1]
    );
  }
}
