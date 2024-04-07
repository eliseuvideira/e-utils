import { isHttpError } from "./is-http-error";
import { HttpError } from "../utils/http-error";

describe("isHttpError", () => {
  it("should return true for an instance of HttpError", () => {
    const error = new HttpError({
      message: "Resource not found.",
      status: 404,
      properties: {
        code: "RESOURCE_NOT_FOUND",
        details: "The requested resource was not found.",
        instructions: "Please check the resource ID and try again.",
      },
    });

    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for an instance of Error with status and properties", () => {
    const instance: unknown = new Error("Internal server error.");
    const error = instance as Record<string, unknown>;
    error.status = 500;
    error.properties = {
      code: "INTERNAL_SERVER_ERROR",
      details: "An unexpected error occurred.",
      instructions: "Please try again later.",
    };

    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for an object with status and properties", () => {
    const error = {
      message: "Internal server error.",
      status: 500,
      properties: {
        code: "INTERNAL_SERVER_ERROR",
        details: "An unexpected error occurred.",
        instructions: "Please try again later.",
      },
    };

    expect(isHttpError(error)).toBe(true);
  });

  test.each([
    {
      type: "Error",
      value: new Error("Something went wrong."),
      expected: false,
    },
    {
      type: "string",
      value: "Invalid input.",
      expected: false,
    },
    {
      type: "number",
      value: 404,
      expected: false,
    },
    {
      type: "null",
      value: null,
      expected: false,
    },
    {
      type: "undefined",
      value: undefined,
      expected: false,
    },
  ])(
    "should return false for other types of errors ($type)",
    ({ value, expected }) => {
      expect(isHttpError(value)).toBe(expected);
    }
  );
});
