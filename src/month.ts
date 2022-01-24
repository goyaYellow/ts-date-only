export class Month {
  public readonly value: number;

  public constructor(value: number) {
    if (value <= 0)
      throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);
    if (value % 1 > 0)
      throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);

    this.value = value;
  }

  public add(other: number): Month;
  public add(other: Month): Month;
  public add(other: number | Month): Month {
    if (typeof other === "number") {
      return new Month(this.value + other);
    } else {
      return new Month(this.value + other.value);
    }
  }
}
