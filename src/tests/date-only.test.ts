import { DateOnly } from "../lib/date-only";

describe("コンストラクタ", () => {
  describe("正常系", () => {
    describe.each([
      [2022, 1, 1],
      [2020, 2, 29], // うるう年
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

describe("ファクトリ系", () => {
  describe("文字列を元にインスタンスを生成する関数のテスト", () => {
    test("スラッシュ区切りの年月日形式の文字列を渡してセパレータを指定しなければ、文字列で示した年月日を示すインスタンスが🐸", () => {
      // 準備
      const source = "2022/01/02";
      const expected = new DateOnly(2022, 1, 2);

      // 実行
      const actual = DateOnly.fromByStr(source);

      // 検証
      expect(actual.equals(expected)).toBe(false);
    });
  });
});
