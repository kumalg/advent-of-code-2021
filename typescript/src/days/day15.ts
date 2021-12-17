import Graph from "node-dijkstra";
import { range } from "../helpers";
import { Day } from "../day";

export default class extends Day {
  neighbours(x: number, y: number, input: Array<Array<number>>): Array<[number, number]> {
    const neight: Array<[number, number]> = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    return neight.filter(([x, y]) => x >= 0 && y >= 0 && x < input[0].length && y < input.length);
  }

  getCost(repeat = 1): number {
    const wideMap = this.getInputLines()
      .map((line) => line.split("").map((num) => parseInt(num)))
      .map((line) => range(repeat).flatMap((i) => line.map((num) => (num + i) % 9 || num + i)));

    const map = range(repeat).flatMap((i) => wideMap.map((line) => line.map((num) => (num + i) % 9 || num + i)));

    const nodes = map.flatMap((row, y) =>
      row.map((_: number, x: number) => ({
        key: `${x}_${y}`,
        nodes: this.neighbours(x, y, map).map(([x, y]) => ({ node: `${x}_${y}`, cost: map[y][x] })),
      }))
    );

    const nodesObject: {
      [k: string]: {
        [k: string]: number;
      };
    } = Object.fromEntries(
      nodes.map(({ key, nodes }) => [key, Object.fromEntries(nodes.map(({ node, cost }) => [node, cost]))])
    );

    const dijkstra = new Graph();

    Object.entries(nodesObject).forEach(([key, nodes]) => {
      dijkstra.addNode(key, nodes);
    });

    const last = nodes.last().key;
    const path = dijkstra.path("0_0", last);

    return range(path.length - 1).sum((i) => nodesObject[path[i]][path[i + 1]]);
  }

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
  }

  firstStar(): number {
    return this.getCost();
  }

  secondStar(): number {
    return this.getCost(5);
  }
}
