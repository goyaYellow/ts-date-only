import { DateOnly } from "../lib/date-only";

test(`インスタンス化できる!`, () => {
  expect(new DateOnly(2022, 3, 11)).toBeInstanceOf(DateOnly);
});

test(`インスタンス化できる？`, () => {
  expect(() => {
    new DateOnly(-1, -2, -3);
  }).toThrowError(Error);
});
