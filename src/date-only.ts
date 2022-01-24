import { Day } from "./day";
import * as dayOfTheWeek from "./day-of-the-week";
import { Month } from "./month";
import { Year } from "./year";

export class DateOnly {
  public readonly year: Year;
  public readonly month: Month;
  public readonly day: Day;

  public constructor(year: Year, month: Month, day: Day) {
    // TODO ありえな年月日だったときにどうする？

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

  public static createByNum(year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    return this.createByDate(date);
  }

  public static createByDate(source: Date): DateOnly {
    return new DateOnly(
      new Year(source.getFullYear()),
      new Month(source.getMonth()),
      new Day(source.getDate())
    );
  }

  public asDateWithFirstTime(): Date {
    return new Date(
      this.year.value,
      this.month.value,
      this.day.value,
      0,
      0,
      0,
      0
    );
  }

  public asDateWithLastTime(): Date {
    return new Date(
      this.year.value,
      this.month.value,
      this.day.value,
      23,
      59,
      59,
      999999999999999999
    );
  }

  public addYear(year: number): DateOnly;
  public addYear(year: Year): DateOnly;
  public addYear(year: number | Year): DateOnly {
    if (typeof year === "number") {
      return new DateOnly(this.year.add(new Year(year)), this.month, this.day);
    } else {
      return new DateOnly(this.year.add(year), this.month, this.day);
    }
  }

  public addMonth(month: number): DateOnly;
  public addMonth(month: Month): DateOnly;
  public addMonth(month: number | Month): DateOnly {
    if (typeof month === "number") {
      return DateOnly.createByNum(
        this.year.value,
        this.month.value + month,
        this.day.value
      );
    } else {
      return DateOnly.createByNum(
        this.year.value,
        this.month.value + month.value,
        this.day.value
      );
    }
  }

  public addDay(day: number): DateOnly;
  public addDay(day: Day): DateOnly;
  public addDay(day: number | Day): DateOnly {
    if (typeof day === "number") {
      return DateOnly.createByNum(
        this.year.value,
        this.month.value,
        this.day.value + day
      );
    } else {
      return DateOnly.createByNum(
        this.year.value,
        this.month.value,
        this.day.value + day.value
      );
    }
  }

  public getDayOfTheWeek(): dayOfTheWeek.DayOfTheWeek {
    return dayOfTheWeek.convertFromDate(this.asDateWithFirstTime());
  }
}
