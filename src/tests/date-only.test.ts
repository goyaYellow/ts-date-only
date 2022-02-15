import { DateOnly } from "../lib/date-only";

describe("コンストラクタ", () => {
  describe("正常系", () => {
    describe.each([
      [2022, 1, 1],
      [2020, 2, 29],
    ])(
      `年月日として正常な値を渡された場合にインスタンス化できる!`,
      (year, month, day) => {
        test(`インスタンス化できる!${year}/${month}/${day}`, () => {
          expect(new DateOnly(year, month, day)).toBeInstanceOf(DateOnly);
        });
      }
    );
    test(`インスタンス化できる!`, () => {
      expect(new DateOnly(2022, 3, 11)).toBeInstanceOf(DateOnly);
    });
  });

  test(`インスタンス化できる？`, () => {
    expect(() => {
      new DateOnly(-1, -2, -3);
    }).toThrowError(Error);
  });
});
