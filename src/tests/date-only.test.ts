import { DateOnly } from "../lib/date-only";

describe("コンストラクタ", () => {
  describe("正常系", () => {
    describe.each([
      [2022, 1, 1],
      [2020, 2, 29], // うるう年
      [2022, 1, 43532],
    ])(
      `年月日として正常な値を渡された場合にインスタンス化できる!`,
      (year, month, day) => {
        test(`インスタンス化できる!${year}/${month}/${day}`, () => {
          expect(new DateOnly(year, month, day)).toBeInstanceOf(DateOnly);
        });
      }
    );
  });

  describe("異常系", () => {
    describe.each([
      [-2022, 1, 1],
      [2020, -1, 1],
      [2020, 1, -1],
    ])(
      "年月日として異常な値が渡された場合にエラーをスローする",
      (year, month, day) => {
        test(`年月日として異常な値が渡された場合にエラーをスローする${year}/${month}/${day}`, () => {
          expect(() => {
            new DateOnly(year, month, day);
          }).toThrowError(Error);
        });
      }
    );

    describe.each([
      [2021, 2, 29], // うるう年じゃない
      [2100, 2, 29], // うるう年じゃない
      [1, 1, 1],
    ])(
      "存在し得ない年月日が値が渡された場合にエラーをスローする",
      (year, month, day) => {
        test(`存在し得ない年月日が値が渡された場合にエラーをスローする。${year}/${month}/${day}`, () => {
          expect(() => {
            new DateOnly(year, month, day);
          }).toThrowError(Error);
        });
      }
    );
  });
});
