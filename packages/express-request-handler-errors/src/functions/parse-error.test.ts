import { parseErrorMessage } from "./parse-error";
import { HttpError } from "@e-utils/http-error";

describe("parseErrorMessage", () => {
  it("should return 'Internal server error.' if secure is true and status is 500 and the error is not an HttpError", () => {
    expect.assertions(1);

    const err = new Error("Some error");
    const status = 500;
    const secure = true;

    const result = parseErrorMessage({
      err,
      status,
      secure,
    });

    expect(result).toBe("Internal server error.");
  });

  it("should return 'Internal server error.' if secure is true and status is 500 and the error is an HttpError", () => {
    expect.assertions(1);

    const err = new HttpError({
      status: 500,
      message: "Database error.",
      properties: {
        code: "INTERNAL_SERVER_ERROR",
        details: "An unexpected error occurred.",
        instructions: "Please try again later.",
      },
    });
    const status = 500;
    const secure = true;

    const result = parseErrorMessage({
      err,
      status,
      secure,
    });

    expect(result).toBe("Internal server error.");
  });

  it("should return the error message if secure is false and status is 500", () => {
    const err = new Error("Database error.");
    const status = 500;
    const secure = false;

    const result = parseErrorMessage({
      err,
      status,
      secure,
    });

    expect(result).toBe("Database error.");
  });

  it("should return the error message if secure is true and status is not 500", () => {
    const err = new HttpError({
      status: 404,
      message: "Resource not found.",
      properties: {
        code: "RESOURCE_NOT_FOUND",
        details: "An unexpected error occurred.",
        instructions: "Please try again later.",
      },
    });
    const status = err.status;
    const secure = true;

    const result = parseErrorMessage({
      err,
      status,
      secure,
    });

    expect(result).toBe("Resource not found.");
  });

  it("should return 'An unknown error occurred.' if secure is true and status is not 500 and the error does not have a message", () => {
    const err = {};
    const status = 400;
    const secure = true;

    const result = parseErrorMessage({
      err,
      status,
      secure,
    });

    expect(result).toBe("An unknown error occurred.");
  });
});
