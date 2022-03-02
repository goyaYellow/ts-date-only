import * as dayOfTheWeek from "./day-of-the-week";

export class DateOnly {
  public readonly year: number;
  public readonly month: number;
  public readonly day: number;

  public constructor(year: number, month: number, day: number) {
    if (year <= 0)
      throw new Error(`yearは1以上の自然数でないといけません。year=${year}`);
    if (year % 1 !== 0)
      throw new Error(`yearは1以上の自然数でないといけません。year=${year}`);
    if (month <= 0)
      throw new Error(`monthは1以上の自然数でないといけません。month=${month}`);
    if (month % 1 !== 0)
      throw new Error(`monthは1以上の自然数でないといけません。month=${month}`);
    if (day <= 0)
      throw new Error(`dayは1以上の自然数でないといけません。day=${day}`);
    if (day % 1 !== 0)
      throw new Error(`dayは1以上の自然数でないといけません。day=${day}`);

    const criterion = new Date(`${year}-${month}-${day}`);
    if (
      year !== criterion.getFullYear() ||
      month !== criterion.getMonth() + 1 ||
      day !== criterion.getDate()
    )
      throw new Error(
        `不正な年月日です。year=${year}。month=${month}。day=${day}。Date=${criterion}`
      );

    this.year = year;
    this.month = month;
    this.day = day;
  }

  // #region ファクトリ系

  public static fromByStr(source: string, separator?: string): DateOnly {
    if (separator === undefined) separator = "/";

    const splitted = source.split(separator);

    if (splitted.length !== 3)
      throw new Error(`元ネタの形式が不正です！ source=${source}`);

    const year = Number(splitted[0]);
    const month = Number(splitted[1]);
    const day = Number(splitted[2]);
    return new DateOnly(year, month, day);
  }

  public static fromByDate(source: Date): DateOnly {
    return new DateOnly(
      source.getFullYear(),
      source.getMonth() + 1,
      source.getDate()
    );
  }

  // #endregion

  // #region 値取得系

  public asDateWithFirstTime(): Date {
    return new Date(this.year, this.month, this.day, 0, 0, 0, 0);
  }

  public asDateWithLastTime(): Date {
    return new Date(
      this.year,
      this.month,
      this.day,
      23,
      59,
      59,
      999999999999999999
    );
  }

  public getDayOfWeek(): dayOfTheWeek.DayOfTheWeek {
    return dayOfTheWeek.convertFromDate(this.asDateWithFirstTime());
  }

  // #endregion

  // #region 加算系
  public addYear(year: number): DateOnly {
    return new DateOnly(this.year + year, this.month, this.day);
  }

  public addMonth(month: number): DateOnly {
    return new DateOnly(this.year, this.month + month, this.day);
  }

  public addDay(day: number): DateOnly {
    return new DateOnly(this.year, this.month, this.day + day);
  }

  //#endregion

  // #region 比較系

  public equals(other: DateOnly): boolean {
    return (
      this.year === other.year &&
      this.month === other.month &&
      this.day === other.day
    );
  }

  public isLessThan(other: DateOnly): boolean {
    if (this.year > other.year) {
      return false;
    } else if (this.year < other.year) {
      return true;
    }

    if (this.month > other.month) {
      return false;
    } else if (this.month < other.month) {
      return true;
    }

    if (this.day > other.day) {
      return false;
    } else if (this.day < other.day) {
      return true;
    }

    return false;
  }

  public isMoreThan(other: DateOnly): boolean {
    return !this.isLessThan(other);
  }

  public isLessThanOrEqual(other: DateOnly): boolean {
    return this.isLessThan(other) || this.equals(other);
  }

  public isMoreThanOrEqual(other: DateOnly): boolean {
    return this.isMoreThan(other) || this.equals(other);
  }

  // #endregion
}
