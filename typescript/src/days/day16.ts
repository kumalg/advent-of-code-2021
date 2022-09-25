import { Day } from "../day";

export default class extends Day {
  input: string;

  constructor(resourcesPath: string) {
    super(resourcesPath, __filename);
    this.input = this.getInputText();
  }

  toBitArray(hexInput: string): Array<string> {
    return hexInput.split("").flatMap((hexDigit) => parseInt(hexDigit, 16).toString(2).padStart(4, "0").split(""));
  }

  firstStar(): number {
    let bitArray = this.toBitArray(this.input);
    const versionNumbers = [];

    while (bitArray.length > 6) {
      console.log(bitArray.join(""));

      const packetVersion = parseInt(bitArray.slice(0, 3).join(""), 2);
      versionNumbers.push(packetVersion);
      const typeID = parseInt(bitArray.slice(3, 6).join(""), 2);
      let bitsCount = 0;
      if (typeID === 4) {
        bitsCount = bitArray.findIndex((bit, i) => bit === "0" && i > 5 && (i - 6) % 5 === 0) + 7 + 1;
      } else {
        const totalLengthInBits = bitArray[6] === "0" ? 15 : 11;
        const eeee = parseInt(bitArray.slice(7, 7 + totalLengthInBits).join(""), 2);

        bitsCount = 7 + totalLengthInBits + (totalLengthInBits === 11 ? eeee * 11 : eeee);

        console.log({ packetVersion, typeID, totalLengthInBits, eeee });
      }

      bitArray = bitArray.slice(bitsCount);
    }

    return versionNumbers.sum();
  }

  secondStar(): number {
    return 0;
  }
}
