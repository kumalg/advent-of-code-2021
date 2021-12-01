export interface Day {
  firstPart(): Promise<string | number>;
  secondPart(): Promise<string | number>;
}
