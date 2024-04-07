import { HttpError } from "./http-error";

describe("HttpError", () => {
  it("should create an instance with the correct properties", () => {
    const error = new HttpError({
      message: "Resource not found.",
      status: 404,
      properties: {
        code: "RESOURCE_NOT_FOUND",
        details: "The requested resource was not found.",
        instructions: "Please check the resource ID and try again.",
      },
    });

    expect(error).toBeInstanceOf(HttpError);
    expect(error.message).toBe("Resource not found.");
    expect(error.status).toBe(404);
    expect(error.properties).toEqual({
      code: "RESOURCE_NOT_FOUND",
      details: "The requested resource was not found.",
      instructions: "Please check the resource ID and try again.",
    });
  });

  it("should have a toJSON method that returns the error properties", () => {
    const error = new HttpError({
      message: "Internal server error.",
      status: 500,
      properties: {
        code: "INTERNAL_SERVER_ERROR",
        details: "An unexpected error occurred.",
        instructions: "Please try again later.",
      },
    });

    const json = error.toJSON();

    expect(json).toEqual({
      message: "Internal server error.",
      status: 500,
      properties: {
        code: "INTERNAL_SERVER_ERROR",
        details: "An unexpected error occurred.",
        instructions: "Please try again later.",
      },
      stack: expect.any(String),
      cause: undefined,
    });
  });

  it("should have a cause property", () => {
    const cause = new Error("Something went wrong.");
    const error = new HttpError({
      message: "Internal server error.",
      status: 500,
      properties: {
        code: "INTERNAL_SERVER_ERROR",
        details: "An unexpected error occurred.",
        instructions: "Please try again later.",
      },
      cause,
    });

    expect(error.cause).toBe(cause);
  });

  it("should provide a default value for properties", () => {
    const error = new HttpError({
      message: "Internal server error.",
      status: 500,
    });

    expect(error.properties).toEqual({});
  });
});
