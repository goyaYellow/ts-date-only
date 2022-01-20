import { Day } from "./day";
import { Month } from "./month";
import { Year } from "./year";

export class DateOnly {
  public readonly year: Year;
  public readonly month: Month;
  public readonly day: Day;

  public constructor(year: Year, month: Month, day: Day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  public static createByStr(source: string, separator?: string): DateOnly {
    if (separator === undefined) separator = "/";

    const splitted = source.split(separator);

    if (splitted.length !== 3)
      throw new Error(`元ネタの形式が不正です！ source=${source}`);
    const year = Number(splitted[0]);
    const month = Number(splitted[1]);
    const day = Number(splitted[2]);
    return new DateOnly(new Year(year), new Month(month), new Day(day));
  }

  public static createByDate(source: Date): DateOnly {
    return new DateOnly(
      new Year(source.getFullYear()),
      new Month(source.getMonth()),
      new Day(source.getDate())
    );
  }
}
