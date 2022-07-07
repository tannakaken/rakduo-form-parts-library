import {
  isValidDateFormat,
  isValidEmail,
  isValidPhoneNumber,
} from "./string.helper";

test("正しいeメールの形式の時にはtrueを返す", () => {
  expect(isValidEmail("sayaka_takeuchi@rakudo.io")).toBe(true);
  expect(isValidEmail("sayaka_takeuchi+1@rakudo.io")).toBe(true);
});

test("正しくないeメールの形式の時にはfalseを返す", () => {
  expect(isValidEmail("sayaka_takeuchi")).toBe(false);
  expect(isValidEmail("sayaka_takeuchi@@rakudo.io")).toBe(false);
  expect(isValidEmail("sayaka_takeuchi@")).toBe(false);
  expect(isValidEmail("sayaka_takeuchi+1@rakudo@io")).toBe(false);
  expect(isValidEmail("sayaka_takeuchi@rakudo@i")).toBe(false);
  expect(isValidEmail("")).toBe(false);
});

test("正しい携帯電話の形式にはtrueを返す", () => {
  expect(isValidPhoneNumber("09012345678")).toBe(true);
  expect(isValidPhoneNumber("0521234567")).toBe(true);
});

test("正しくない携帯電話の形式にはfalseを返す", () => {
  expect(isValidPhoneNumber("090-1234-5678")).toBe(false);
  expect(isValidPhoneNumber("(052)123456")).toBe(false);
  expect(isValidPhoneNumber("052123456")).toBe(false);
  expect(isValidPhoneNumber("052123456789")).toBe(false);
  expect(isValidPhoneNumber("")).toBe(false);
});

test("正しい西暦の形式であればtrueを返す", () => {
  expect(isValidDateFormat("2020-01-01")).toBe(true);
  expect(isValidDateFormat("2999-10-20")).toBe(true);
  expect(isValidDateFormat("2100-12-31")).toBe(true);
  expect(isValidDateFormat("2100-02-31")).toBe(true);
});

test("正しくない西暦の形式であればfalseを返す", () => {
  expect(isValidDateFormat("2020-99-99")).toBe(false);
  expect(isValidDateFormat("1999-01-01")).toBe(false);
  expect(isValidDateFormat("202-01-01")).toBe(false);
  expect(isValidDateFormat("2020-1-1")).toBe(false);
});
