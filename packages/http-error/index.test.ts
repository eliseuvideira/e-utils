import { isHttpError } from "./src/functions/is-http-error";
import { HttpError } from "./src/utils/http-error";

describe("isHttpError", () => {
  it("should return true if the input is an HttpError object", () => {
    const error = new HttpError({
      status: 404,
      message: "Resource not found.",
      properties: {
        code: "RESOURCE_NOT_FOUND",
        details: "An unexpected error occurred.",
        instructions: "Please try again later.",
      },
    });
    expect(isHttpError(error)).toBe(true);
  });

  it("should return false if the input is not an HttpError object", () => {
    const error = new Error("Some error");
    expect(isHttpError(error)).toBe(false);
  });
});
