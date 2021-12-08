import { Day } from "../day";

export default class extends Day {
  input: Array<string>;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputLines();
  }

  firstStar(): number {
    return this.input
      .map(
        (line: string) =>
          line
            .split(" | ")[1]
            .trim()
            .split(" ")
            .filter((linn) => [2, 3, 4, 7].includes(linn.length)).length
      )
      .sum();
  }

  secondStar(): number {
    const easyDigits = {
      "1": ["c", "f"],
      "4": ["b", "c", "d", "f"],
      "7": ["a", "c", "f"],
      "8": ["a", "b", "c", "d", "e", "f", "g"],
    };

    const hardDigits = {
      "2": ["a", "c", "d", "e", "g"],
      "3": ["a", "c", "d", "f", "g"],
      "5": ["a", "b", "d", "f", "g"],
      "6": ["a", "b", "d", "e", "f", "g"],
      "9": ["a", "b", "c", "d", "f", "g"],
      "0": ["a", "b", "c", "e", "f", "g"],
    };

    const digits = {
      ...easyDigits,
      ...hardDigits,
    };

    const digitsSortedStringified = Object.fromEntries(
      Object.entries(digits).map(([key, value]) => [value.sort().join(), key])
    );

    return this.input
      .map((line: string) => {
        const [helper, target] = line.split(" | ");

        const mappedSegments = {
          a: "",
          b: "",
          c: "",
          d: "",
          e: "",
          f: "",
          g: "",
        };

        const helpers = helper
          .trim()
          .split(" ")
          .map((helper) => helper.split(""));

        const targets = target
          .trim()
          .split(" ")
          .map((helper) => helper.split(""));

        const easyNumbers = Object.fromEntries(
          Object.entries(easyDigits).map(([number, segments]) => [
            number,
            helpers.find((help) => help.length === segments.length),
          ])
        );

        const flatHelpers = helpers.flat();

        mappedSegments["a"] =
          easyNumbers["7"]?.filter(
            (seg) => !easyNumbers["1"]?.includes(seg)
          )[0] || "";

        const co = easyNumbers["4"]?.filter(
          (seg) => !easyNumbers["1"]?.includes(seg)
        );

        mappedSegments["b"] =
          co?.find(
            (mappd) => flatHelpers.filter((h) => h === mappd).length === 6
          ) || "";

        mappedSegments["d"] =
          co?.find(
            (mappd) => flatHelpers.filter((h) => h === mappd).length === 7
          ) || "";

        mappedSegments["f"] =
          Object.keys(mappedSegments).find(
            (mappd) => flatHelpers.filter((h) => h === mappd).length === 9
          ) || "";

        mappedSegments["c"] =
          Object.keys(mappedSegments).find(
            (mappd) =>
              flatHelpers.filter((h) => h === mappd).length === 8 &&
              !Object.values(mappedSegments).includes(mappd)
          ) || "";

        mappedSegments["e"] =
          Object.keys(mappedSegments).find(
            (mappd) =>
              flatHelpers.filter((h) => h === mappd).length === 4 &&
              !Object.values(mappedSegments).includes(mappd)
          ) || "";

        mappedSegments["g"] =
          Object.keys(mappedSegments).find(
            (mappd) =>
              flatHelpers.filter((h) => h === mappd).length === 7 &&
              !Object.values(mappedSegments).includes(mappd)
          ) || "";

        const finalMappedSegments = Object.fromEntries(
          Object.entries(mappedSegments).map(([key, value]) => [value, key])
        );

        const result = targets
          .map(
            (targetNum) =>
              digitsSortedStringified[
                targetNum
                  .map((mappd) => finalMappedSegments[mappd])
                  .sort()
                  .join()
              ]
          )
          .join("");

        return parseInt(result);
      })
      .sum();
  }
}
