import { hasMessage } from "./has-message";

describe("hasMessage", () => {
  it("should return true if the value is an object with a 'message' property of type string", () => {
    expect.assertions(2);

    const value1 = {
      message: "Hello, world!",
    };
    const value2 = {
      message: "",
    };

    expect(hasMessage(value1)).toBe(true);
    expect(hasMessage(value2)).toBe(true);
  });

  it("should return false if the value is not an object or if it doesn't have a 'message' property of type string", () => {
    expect.assertions(3);

    const value1 = "Hello, world!";
    const value2 = null;
    const value3 = {
      message: 123,
    };

    expect(hasMessage(value1)).toBe(false);
    expect(hasMessage(value2)).toBe(false);
    expect(hasMessage(value3)).toBe(false);
  });

  test.each([
    {
      value: {
        message: "Hello, world!",
      },
      expected: true,
    },
    {
      value: {
        message: "",
      },
      expected: true,
    },
    {
      value: "Hello, world!",
      expected: false,
    },
    {
      value: null,
      expected: false,
    },
    {
      value: {
        message: 123,
      },
      expected: false,
    },
    {
      value: "Hello, world!",
      expected: false,
    },
    {
      value: true,
      expected: false,
    },
    {
      value: false,
      expected: false,
    },
    {
      value: 123,
      expected: false,
    },
    {
      value: [],
      expected: false,
    },
    {
      value: {},
      expected: false,
    },
  ])(`hasMessage($value) should return $expected`, ({ value, expected }) => {
    expect(hasMessage(value)).toBe(expected);
  });
});
