export enum DayOfTheWeek {
  Mon = "Mon",
  Tue = "Tue",
  Wed = "Wed",
  Thu = "Thu",
  Fri = "Fri",
  Sat = "Sat",
  Sun = "Sun",
}

const convertFromDay = (source: number): DayOfTheWeek => {
  switch (source) {
    case 0:
      return DayOfTheWeek.Mon
    case 1:
      return DayOfTheWeek.Tue
    case 2:
      return DayOfTheWeek.Wed
    case 3:
      return DayOfTheWeek.Thu
    case 4:
      return DayOfTheWeek.Fri
    case 5:
      return DayOfTheWeek.Sat
    case 6:
      return DayOfTheWeek.Sun
    default:
      throw new Error(`sourceは0~1のいずれか出ないといけません. source:${source}`)
  }
}

export const fromDate = (source: Date): DayOfTheWeek => {
  return convertFromDay(source.getDay())
}
