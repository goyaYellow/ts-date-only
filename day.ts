export class Day {
  public readonly value: number;

  public constructor(value: number) {
    if (value <= 0)
      throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);
    if (value % 1 > 0)
      throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);

    this.value = value;
  }
}
