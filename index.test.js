const customParseFloat = require("./customParseFloat");

test("Numeric value", () => {
  expect(customParseFloat(10)).toBe(10);
});

test("Number quotes", () => {
  expect(customParseFloat("10")).toBe(10);
});

test("Negative number in quotes", () => {
  expect(customParseFloat("-10.24")).toBeCloseTo(parseFloat("-10.24"));
});

test("Value that starts with number", () => {
  expect(customParseFloat("10f")).toBe(parseFloat("10f"));
});

test("Value that ends with number", () => {
  expect(Number.isNaN(customParseFloat("f10"))).toBeTruthy();
});

test("Value NaN", () => {
  expect(Number.isNaN(customParseFloat(NaN))).toBeTruthy();
});

test("Value numeric Infinity", () => {
  expect(customParseFloat(Infinity)).toBe(Infinity);
});

test("Value numeric -Infinity", () => {
  expect(customParseFloat(-Infinity)).toBe(-Infinity);
});

test("Value string Infinity", () => {
  expect(customParseFloat("Infinitylove")).toBe(parseFloat("Infinitylove"));
});

test("Value string -Infinity", () => {
  expect(customParseFloat("-Infinity123")).toBe(parseFloat("-Infinity123"));
});

test("Value {}", () => {
  expect(Number.isNaN(customParseFloat({}))).toBeTruthy();
});

test("Value []", () => {
  expect(Number.isNaN(customParseFloat([]))).toBeTruthy();
});

test("Value any function", () => {
  expect(
    Number.isNaN(
      customParseFloat(() => {
        hello: () => {
          console.log("ji");
        };
      })
    )
  ).toBeTruthy();
});

test("Value any class", () => {
  expect(Number.isNaN(customParseFloat(class Person {}))).toBeTruthy();
});

test("Value with a lot of spaces in start and end", () => {
  expect(customParseFloat("      10   ")).toBe(10);
});

test("Value space", () => {
  expect(Number.isNaN(customParseFloat(" "))).toBeTruthy();
});

test("Value empty string", () => {
  expect(Number.isNaN(customParseFloat(""))).toBeTruthy();
});

test("Value -4e-2", () => {
  expect(customParseFloat("-4e-2")).toBe(parseFloat("-4e-2"));
});

test("Value 314e-2", () => {
  expect(customParseFloat("314e-2")).toBeCloseTo(parseFloat("314e-2"));
});

test("Value 0.0314E+2 (with upper exponent)", () => {
  expect(customParseFloat("0.0314E+2")).toBeCloseTo(parseFloat("0.0314E+2"));
});

test("Value 3.14some non-digit characters", () => {
  expect(customParseFloat("3.14some non-digit characters")).toBe(
    parseFloat("3.14some non-digit characters")
  );
});

test("Value object with function toString()", () => {
  const obj = {
    toString() {
      return "3.14";
    },
  };
  expect(customParseFloat(obj)).toBe(parseFloat(obj));
});

test("Binary value", () => {
  expect(customParseFloat(0b10011)).toBe(parseFloat(0b10011));
});

test("Very large number in string", () => {
  expect(customParseFloat("1.7976931348623159e+308")).toBe(
    parseFloat("1.7976931348623159e+308")
  );
});
