import { DateOnly } from "../lib/date-only";

test(`インスタンス化できる？`, () => {
  expect(new DateOnly(-1, -2, -3)).toBe("hoge");
});
