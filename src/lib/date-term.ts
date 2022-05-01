import { DateOnly } from "./date-only"

export class DateTerm {
  public readonly start: DateOnly
  public readonly end: DateOnly

  public constructor(start: DateOnly, end: DateOnly) {
    if (start.isMoreThan(end))
      throw new Error(
        `start <= end でないといけません。start=${start.toString()}。end=${end.toString()}。`,
      )

    this.start = start
    this.end = end
  }
}
