import { DayOfTheWeek, fromDate } from "../lib/day-of-the-week";

describe("日付をもとに曜日を算出する関数に関するテスト", () => {
  describe.each([
    [new Date("2022-1-1"), DayOfTheWeek.Sun],
    [new Date("2022-1-2"), DayOfTheWeek.Mon],
    [new Date("2022-1-3"), DayOfTheWeek.Tue],
    [new Date("2022-1-4"), DayOfTheWeek.Wed],
    [new Date("2022-1-5"), DayOfTheWeek.Thu],
    [new Date("2022-1-6"), DayOfTheWeek.Fri],
    [new Date("2022-1-7"), DayOfTheWeek.Sat],
  ])("日付を渡すと、該当する曜日を返す", (source, expected) => {
    test("日付を渡すと、該当する曜日を返す", () => {
      // 実行
      const actual = fromDate(source);

      // 検証
      expect(actual).toBe(expected);
    });
  });
});
