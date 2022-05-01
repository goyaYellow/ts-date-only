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
