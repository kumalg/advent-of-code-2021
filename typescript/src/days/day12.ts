import { groupBy } from "lodash";
import { Day } from "../day";

export default class extends Day {
  input: Array<string>;
  nodes: { [key: string]: Array<string> };

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines();

    const connections = this.input.map((line) => line.split("-"));

    this.nodes = Object.fromEntries([...new Set(connections.flat())].map((node) => [node, []]));

    connections.forEach(([a, b]) => {
      this.nodes[a].push(b);
      this.nodes[b].push(a);
    });
  }

  getSomething(currentPath: Array<string>, blackList: Array<string>, smallCaveMaxCount = 1): Array<Array<string>> {
    const last = currentPath.last();
    const smallCavesDisallowed =
      smallCaveMaxCount > 1 &&
      Object.values(groupBy(currentPath.filter((node) => node.toLowerCase() === node))).some(
        (count) => count.length > 1
      );
    const pathBlacklist = [
      ...blackList,
      ...currentPath.filter(
        (node) =>
          node.toLowerCase() === node &&
          (smallCavesDisallowed || smallCaveMaxCount <= currentPath.filter((nod) => nod === node).length)
      ),
    ];
    const nextBlacklistItems: Array<string> = [];

    if (last === "end") {
      return [currentPath];
    }

    const possibleWays = this.nodes[last].filter((nextNode) => !pathBlacklist.includes(nextNode));

    if (possibleWays.length === 0) {
      if (last.toLowerCase() === last) {
        blackList.push(last);
      } else {
        nextBlacklistItems.push(last);
      }
      return [];
    }

    return [
      ...possibleWays.flatMap((nextNode) =>
        this.getSomething([...currentPath, nextNode], [...blackList, ...nextBlacklistItems], smallCaveMaxCount)
      ),
    ];
  }

  firstStar(): number {
    return this.getSomething(["start"], ["start"]).length;
  }

  secondStar(): number {
    return this.getSomething(["start"], ["start"], 2).length;
  }
}
