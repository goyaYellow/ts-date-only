import { DateOnly } from "../lib/date-only"
import { DayOfTheWeek } from "../lib/day-of-the-week"

describe("コンストラクタ", () => {
  describe("正常系", () => {
    describe.each([
      [2022, 1, 1],
      [2020, 2, 29], // うるう年
    ])(`年月日として正常な値を渡された場合にインスタンス化できる!`, (year, month, day) => {
      test(`インスタンス化できる!${year}/${month}/${day}`, () => {
        expect(new DateOnly(year, month, day)).toBeInstanceOf(DateOnly)
      })
    })
  })

  describe("異常系", () => {
    describe.each([
      [-2022, 1, 1],
      [2020, -1, 1],
      [2020, 1, -1],
    ])("年月日として異常な値が渡された場合にエラーをスローする", (year, month, day) => {
      test(`年月日として異常な値が渡された場合にエラーをスローする${year}/${month}/${day}`, () => {
        expect(() => {
          new DateOnly(year, month, day)
        }).toThrowError(Error)
      })
    })

    describe.each([[-1], [2022.1]])("存在し得ない年が渡された場合にエラーをスローする", (year) => {
      test(`存在し得ない年が渡された場合にエラーをスローする。${year}/1/1`, () => {
        expect(() => {
          new DateOnly(year, 1, 1)
        }).toThrowError(Error)
      })
    })

    describe.each([[-1], [1.1]])("存在し得ない月が渡された場合にエラーをスローする", (month) => {
      test(`存在し得ない月が渡された場合にエラーをスローする。2022/${month}/1`, () => {
        expect(() => {
          new DateOnly(2022, month, 1)
        }).toThrowError(Error)
      })
    })

    describe.each([[-1], [1.1]])("存在し得ない日が渡された場合にエラーをスローする", (day) => {
      test(`存在し得ない日が渡された場合にエラーをスローする。2022/1/${day}`, () => {
        expect(() => {
          new DateOnly(2022, 1, day)
        }).toThrowError(Error)
      })
    })

    describe.each([[-1], [1.1]])("存在し得ない年が渡された場合にエラーをスローする", (month) => {
      test(`存在し得ない年が渡された場合にエラーをスローする。2022/${month}/1`, () => {
        expect(() => {
          new DateOnly(2022, month, 1)
        }).toThrowError(Error)
      })
    })

    describe.each([
      [2021, 2, 29], // うるう年じゃない
      [2100, 2, 29], // うるう年じゃない
      [1, 1, 1],
    ])("存在し得ない年月日が値が渡された場合にエラーをスローする", (year, month, day) => {
      test(`存在し得ない年月日が値が渡された場合にエラーをスローする。${year}/${month}/${day}`, () => {
        expect(() => {
          new DateOnly(year, month, day)
        }).toThrowError(Error)
      })
    })
  })
})

describe("ファクトリ系", () => {
  describe("文字列を元にインスタンスを生成する関数のテスト", () => {
    describe("正常系", () => {
      test("スラッシュ区切りの年月日形式の文字列を渡してセパレータを指定しなければ、文字列で示した年月日を示すインスタンスが🐸", () => {
        // 準備
        const source = "2022/01/02"
        const expected = new DateOnly(2022, 1, 2)

        // 実行
        const actual = DateOnly.fromByStr(source)

        // 検証
        expect(actual.equals(expected)).toBe(true)
      })

      test("ハイフン区切りの年月日形式の文字列を渡してセパレータにハイフンを指定すると、文字列で示した年月日を示すインスタンスが🐸", () => {
        // 準備
        const source = "2022-01-02"
        const expected = new DateOnly(2022, 1, 2)

        // 実行
        const actual = DateOnly.fromByStr(source, "-")

        // 検証
        expect(actual.equals(expected)).toBe(true)
      })
    })

    describe("異常系", () => {
      test("文節が４つの文字列を渡すと、エラーがスローされる", () => {
        // 準備
        const source = "2022/01/02/03"

        // 実行
        // 検証
        expect(() => {
          DateOnly.fromByStr(source)
        }).toThrowError(Error)
      })

      test("文節が2つの文字列を渡すと、エラーがスローされる", () => {
        // 準備
        const source = "2022/01"

        // 実行
        // 検証
        expect(() => {
          DateOnly.fromByStr(source)
        }).toThrowError(Error)
      })

      test("アルファベットが含まれる文字列を渡すと、エラーがスローされる", () => {
        // 準備
        const source = "TWENTY/ONE/ONE"

        // 実行
        // 検証
        expect(() => {
          DateOnly.fromByStr(source)
        }).toThrowError(Error)
      })
    })
  })

  describe("Dateを元にインスタンスを生成する関数のテスト", () => {
    describe("正常系", () => {
      test("2022/1/2を示す日付を渡すと、2022/1/2を示した年月日を示すインスタンスが🐸", () => {
        // 準備
        const source = new Date(2022, 1 - 1, 2)
        const expected = new DateOnly(2022, 1, 2)

        // 実行
        const actual = DateOnly.fromByDate(source)

        // 検証
        expect(actual.equals(expected)).toBe(true)
      })

      describe("異常系", () => {
        // 特にないかな？
      })
    })
  })
})

describe("値取得系", () => {
  describe("値をその日の最初の時刻をもつDate型インスタンスとして返す関数のテスト", () => {
    test("2022/1/2を示すインスタンスで関数を呼び出すと、2022/1/2 00:00:00.00 を示すインスタンスが🐸", () => {
      // 準備
      const source = new DateOnly(2022, 1, 2)
      const expected = new Date(2022, 1 - 1, 2, 0, 0, 0)

      // 実行
      const actual = source.asDateWithFirstTime()

      // 検証
      expect(actual.getTime() === expected.getTime()).toBe(true)
    })
  })

  describe("値をその日の最後の時刻をもつDate型インスタンスとして返す関数のテスト", () => {
    test("2022/1/2を示すインスタンスで関数を呼び出すと、2022/1/2 23:59:59.999 を示すインスタンスが🐸", () => {
      // 準備
      const source = new DateOnly(2022, 1, 2)
      const expected = new Date(2022, 1 - 1, 2, 23, 59, 59, 999)

      // 実行
      const actual = source.asDateWithLastTime()

      // 検証
      expect(actual.getTime() === expected.getTime()).toBe(true)
    })
  })

  describe("該当する曜日を返す関数のテスト", () => {
    test("2022/1/2を示すインスタンスで関数を呼び出すと、日曜日が🐸", () => {
      // 準備
      const source = new DateOnly(2022, 1, 2)
      const expected = DayOfTheWeek.Sun

      // 実行
      const actual = source.getDayOfWeek()

      // 検証
      expect(actual === expected).toBe(true)
    })
  })
})

describe("加算系", () => {
  describe("年を加算する関数のテスト", () => {
    test("2022/1/2を示すインスタンスに対し10を渡すと、2023/1/2が🐸", () => {
      // 準備
      const added = 10
      const source = new DateOnly(2022, 1, 2)
      const expected = new DateOnly(2032, 1, 2)

      // 実行
      const actual = source.addYear(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })

    test("2022/1/2を示すインスタンスに対し-10を渡すと、2012/1/2が🐸", () => {
      // 準備
      const added = -10
      const source = new DateOnly(2022, 1, 2)
      const expected = new DateOnly(2012, 1, 2)

      // 実行
      const actual = source.addYear(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })
  })

  describe("月を加算する関数のテスト", () => {
    test("2022/6/2を示すインスタンスに対し3を渡すと、2022/9/2が🐸", () => {
      // 準備
      const added = 3
      const source = new DateOnly(2022, 6, 2)
      const expected = new DateOnly(2022, 9, 2)

      // 実行
      const actual = source.addMonth(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })

    test("2022/6/2を示すインスタンスに対し10を渡すと、2023/4/2が🐸", () => {
      // 準備
      const added = 10
      const source = new DateOnly(2022, 6, 2)
      const expected = new DateOnly(2023, 4, 2)

      // 実行
      const actual = source.addMonth(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })

    test("2022/6/2を示すインスタンスに対し-3を渡すと、2022/3/2が🐸", () => {
      // 準備
      const added = -3
      const source = new DateOnly(2022, 6, 2)
      const expected = new DateOnly(2022, 3, 2)

      // 実行
      const actual = source.addMonth(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })

    test("2022/6/2を示すインスタンスに対し-10を渡すと、2021/8/2が🐸", () => {
      // 準備
      const added = -10
      const source = new DateOnly(2022, 6, 2)
      const expected = new DateOnly(2021, 8, 2)

      // 実行
      const actual = source.addMonth(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })
  })

  describe("日を加算する関数のテスト", () => {
    test("2022/6/15を示すインスタンスに対し8を渡すと、2022/6/23が🐸", () => {
      // 準備
      const added = 8
      const source = new DateOnly(2022, 6, 15)
      const expected = new DateOnly(2022, 6, 23)

      // 実行
      const actual = source.addDay(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })

    test("2022/6/15を示すインスタンスに対し20を渡すと、2023/7/5が🐸", () => {
      // 準備
      const added = 20
      const source = new DateOnly(2022, 6, 15)
      const expected = new DateOnly(2022, 7, 5)

      // 実行
      const actual = source.addDay(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })

    test("2022/6/15を示すインスタンスに対し-8を渡すと、2022/6/7が🐸", () => {
      // 準備
      const added = -8
      const source = new DateOnly(2022, 6, 15)
      const expected = new DateOnly(2022, 6, 7)

      // 実行
      const actual = source.addDay(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })

    test("2022/6/15を示すインスタンスに対し-20を渡すと、2021/5/26が🐸", () => {
      // 準備
      const added = -20
      const source = new DateOnly(2022, 6, 15)
      const expected = new DateOnly(2022, 5, 26)

      // 実行
      const actual = source.addDay(added)

      // 検証
      expect(actual.equals(expected)).toBe(true)
    })
  })
})

describe("比較系", () => {
  describe("インスタンスが示す日付が同じかを判定する関数のテスト", () => {
    test("2022/6/15を示すインスタンスに2022/6/15を渡すと、Trueが🐸", () => {
      // 準備
      const source = new DateOnly(2022, 6, 15)
      const other = new DateOnly(2022, 6, 15)
      const expected = true

      // 実行
      const actual = source.equals(other)

      // 検証
      expect(actual).toBe(expected)
    })

    describe.each([
      [2021, 6, 15],
      [2022, 7, 15],
      [2022, 6, 16],
    ])("2022/6/15を示すインスタンスに異なる日付を渡すと、Falseが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Falseが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = false

        // 実行
        const actual = source.equals(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })
  })

  describe("渡されたインスタンスが示す日付と比べて自分が過去かを判定する関数のテスト", () => {
    test("2022/6/15を示すインスタンスに2022/6/15を渡すと、Falseが🐸", () => {
      // 準備
      const source = new DateOnly(2022, 6, 15)
      const other = new DateOnly(2022, 6, 15)
      const expected = false

      // 実行
      const actual = source.isLessThan(other)

      // 検証
      expect(actual).toBe(expected)
    })

    describe.each([
      [2023, 6, 15],
      [2022, 7, 15],
      [2022, 6, 17],
    ])("2022/6/15を示すインスタンスにそれより未来の日付を渡すと、Trueが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = true

        // 実行
        const actual = source.isLessThan(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })

    describe.each([
      [2021, 6, 15],
      [2022, 5, 15],
      [2022, 6, 14],
    ])("2022/6/15を示すインスタンスにそれより過去の日付を渡すと、Falseが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = false

        // 実行
        const actual = source.isLessThan(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })
  })

  describe("渡されたインスタンスが示す日付と比べて自分が未来かを判定する関数のテスト", () => {
    test("2022/6/15を示すインスタンスに2022/6/15を渡すと、Falseが🐸", () => {
      // 準備
      const source = new DateOnly(2022, 6, 15)
      const other = new DateOnly(2022, 6, 15)
      const expected = false

      // 実行
      const actual = source.isMoreThan(other)

      // 検証
      expect(actual).toBe(expected)
    })

    describe.each([
      [2021, 6, 15],
      [2022, 5, 15],
      [2022, 6, 14],
    ])("2022/6/15を示すインスタンスにそれより過去の日付を渡すと、Trueが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = true

        // 実行
        const actual = source.isMoreThan(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })

    describe.each([
      [2023, 6, 15],
      [2022, 7, 15],
      [2022, 6, 17],
    ])("2022/6/15を示すインスタンスにそれより未来の日付を渡すと、Falseが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = false

        // 実行
        const actual = source.isMoreThan(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })
  })

  describe("渡されたインスタンスが示す日付と比べて自分が同じ日or過去かを判定する関数のテスト", () => {
    test("2022/6/15を示すインスタンスに2022/6/15を渡すと、Trueが🐸", () => {
      // 準備
      const source = new DateOnly(2022, 6, 15)
      const other = new DateOnly(2022, 6, 15)
      const expected = true

      // 実行
      const actual = source.isLessThanOrEqual(other)

      // 検証
      expect(actual).toBe(expected)
    })

    describe.each([
      [2023, 6, 15],
      [2022, 7, 15],
      [2022, 6, 17],
    ])("2022/6/15を示すインスタンスにそれより未来の日付を渡すと、Trueが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = true

        // 実行
        const actual = source.isLessThanOrEqual(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })

    describe.each([
      [2021, 6, 15],
      [2022, 5, 15],
      [2022, 6, 14],
    ])("2022/6/15を示すインスタンスにそれより過去の日付を渡すと、Falseが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = false

        // 実行
        const actual = source.isLessThanOrEqual(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })
  })

  describe("渡されたインスタンスが示す日付と比べて自分が同じ日or未来かを判定する関数のテスト", () => {
    test("2022/6/15を示すインスタンスに2022/6/15を渡すと、Trueが🐸", () => {
      // 準備
      const source = new DateOnly(2022, 6, 15)
      const other = new DateOnly(2022, 6, 15)
      const expected = true

      // 実行
      const actual = source.isMoreThanOrEqual(other)

      // 検証
      expect(actual).toBe(expected)
    })

    describe.each([
      [2021, 6, 15],
      [2022, 5, 15],
      [2022, 6, 14],
    ])("2022/6/15を示すインスタンスにそれより過去の日付を渡すと、Trueが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = true

        // 実行
        const actual = source.isMoreThanOrEqual(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })

    describe.each([
      [2023, 6, 15],
      [2022, 7, 15],
      [2022, 6, 17],
    ])("2022/6/15を示すインスタンスにそれより未来の日付を渡すと、Falseが🐸", (year, month, day) => {
      test(`2022/6/15を示すインスタンスに${year}/${month}/${day}を渡すと、Trueが🐸`, () => {
        // 準備
        const source = new DateOnly(2022, 6, 15)
        const other = new DateOnly(year, month, day)
        const expected = false

        // 実行
        const actual = source.isMoreThanOrEqual(other)

        // 検証
        expect(actual).toBe(expected)
      })
    })
  })
})
