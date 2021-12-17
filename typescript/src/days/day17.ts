import { Day } from "../day";
import { range } from "../helpers";

export default class extends Day {
  validVelocities: Array<Array<[number, number]>>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    const input = this.getInputText();

    const [xFrom, xTo, yFrom, yTo] =
      input
        .match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/)
        ?.slice(1)
        .map((e) => parseInt(e)) || [];

    const targetPoints = range(Math.abs(yFrom - yTo) + 1, yFrom).flatMap((y) =>
      range(Math.abs(xFrom - xTo) + 1, xFrom).map((x): [number, number] => [x, y])
    );

    const velocitiesPoints: Array<Array<[number, number]>> = range(1000, yFrom)
      .flatMap((y) => range(xTo, 1).map((x): [number, number] => [x, y]))
      .map(([startX, startY]) => {
        const points: Array<[number, number]> = [[startX, startY]];

        let velocityX = startX;
        let velocityY = startY;
        let currentX = startX;
        let currentY = startY;

        while (currentX <= xTo && currentY >= yFrom) {
          velocityX = velocityX === 0 ? 0 : Math.abs(velocityX) - 1 * (velocityX / Math.abs(velocityX));
          velocityY--;
          currentX += velocityX;
          currentY += velocityY;

          points.push([currentX, currentY]);
        }

        return points;
      });

    this.validVelocities = velocitiesPoints.filter((points) => {
      return points.some(
        ([x, y]) => targetPoints.findIndex(([targetX, targetY]) => targetX === x && targetY === y) > -1
      );
    });
  }

  firstStar(): number {
    return Math.max(...this.validVelocities.flatMap((points) => points.map(([, y]) => y)));
  }

  secondStar(): number {
    return this.validVelocities.length;
  }
}
