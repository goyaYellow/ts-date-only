import { DateOnly } from "../lib/date-only"
import { DateTerm } from "../lib/date-term"

describe("コンストラクタ", () => {
  describe("正常系", () => {
    test(`start>endな日付を渡された場合にインスタンス化できる!`, () => {
      var actual = new DateTerm(new DateOnly(2022, 6, 15), new DateOnly(2023, 6, 15))

      expect(actual).toBeInstanceOf(DateTerm)
    })

    test(`start==endな日付を渡された場合にインスタンス化できる!`, () => {
      var actual = new DateTerm(new DateOnly(2022, 6, 15), new DateOnly(2022, 6, 15))

      expect(actual).toBeInstanceOf(DateTerm)
    })
  })

  describe("異常系", () => {
    test(`start<endな日付を渡された場合にエラーをスローする`, () => {
      expect(() => {
        new DateTerm(new DateOnly(2023, 6, 15), new DateOnly(2022, 6, 15))
      }).toThrowError(Error)
    })
  })
})

describe("期間確認系", () => {
  describe("任意の日付が期間内に含まれるか検証する関数のテスト", () => {
    describe.each([
      [2022, 1, 2],
      [2022, 1, 5],
      [2022, 1, 8],
    ])(
      "2022/1/2→2022/1/8を示すインスタンスに期間内の日付を渡すと、Trueが🐸",
      (year, month, day) => {
        test(`2022/1/2→2022/1/8を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
          // 準備
          const source = new DateTerm(new DateOnly(2022, 1, 2), new DateOnly(2022, 1, 8))
          const checked = new DateOnly(year, month, day)
          const expected = true

          // 実行
          const actual = source.isInclude(checked)

          // 検証
          expect(actual).toBe(expected)
        })
      },
    )

    describe.each([
      [2022, 1, 1],
      [2022, 2, 5],
    ])(
      "2022/1/2→2022/1/8を示すインスタンスに期間外の日付を渡すと、Falseが🐸",
      (year, month, day) => {
        test(`2022/1/2→2022/1/8を示すインスタンスに${year}/${month}/${day}を渡すと、Falseが🐸`, () => {
          // 準備
          const source = new DateTerm(new DateOnly(2022, 1, 2), new DateOnly(2022, 1, 8))
          const checked = new DateOnly(year, month, day)
          const expected = false

          // 実行
          const actual = source.isInclude(checked)

          // 検証
          expect(actual).toBe(expected)
        })
      },
    )
  })
})
