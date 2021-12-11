import { bold, yellowBright } from "chalk";
import { Day } from "../day";

export default class extends Day {
  input: Array<Array<number>>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines().map((line) => line.split("").map((num) => parseInt(num)));
  }

  getDiagonals(x: number, y: number): Array<[number, number]> {
    const maxY = this.input.length - 1;
    const maxX = this.input[0].length - 1;

    const diagonals: Array<[number, number]> = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];

    return diagonals.filter(([x, y]) => x >= 0 && y >= 0 && x <= maxX && y <= maxY);
  }

  printState(state: Array<Array<number>>): void {
    console.log(
      state.map((line) => line.map((num) => (num == 0 ? yellowBright(bold(num)) : num.toString())).join("")).join("\n")
    );
    console.log();
  }

  getNextStep(initialState: Array<Array<number>>): { state: Array<Array<number>>; zeros: number } {
    const lightsHandled: Array<[number, number]> = [];

    const state = initialState.map((row) => row.map((num) => ++num % 10));

    while (lightsHandled.length < state.flatMap((r) => r).filter((n) => n === 0).length) {
      const zerosPos: Array<[number, number]> = (
        state.flatMap((row, y) => row.map((num, x) => (num === 0 ? [x, y] : null))).filter((p) => p !== null) as Array<
          [number, number]
        >
      ).filter(([x, y]) => lightsHandled.findIndex(([handledX, handledY]) => x === handledX && y === handledY) < 0);

      zerosPos.forEach(([x, y]) => {
        this.getDiagonals(x, y).forEach(([x, y]) => {
          if (state[y][x] > 0 && state[y][x] < 9) {
            state[y][x] += 1;
          } else if (state[y][x] === 9) {
            state[y][x] = 0;
          }
        });
        lightsHandled.push([x, y]);
      });
    }

    return { state, zeros: lightsHandled.length };
  }

  firstStar(): number {
    let state = this.input;
    let lightsCount = 0;

    for (let i = 0; i < 100; i++) {
      const { state: nextState, zeros } = this.getNextStep(state);
      state = nextState;
      lightsCount += zeros;
    }

    return lightsCount;
  }

  secondStar(): number {
    let state = this.input;
    let lastLightsCount = 0;
    const allItems = state.sum((row) => row.length);

    let i = 0;
    while (lastLightsCount < allItems) {
      const { state: nextState, zeros } = this.getNextStep(state);
      state = nextState;
      lastLightsCount = zeros;
      i++;
    }

    return i;
  }
}
