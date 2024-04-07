import { NotFound } from "./not-found";
import { Request } from "../types/request";
import { Response } from "../types/response";
import { HttpError } from "@e-utils/http-error";

describe("NotFound", () => {
  it("should call the 'next' function with a new HttpError object", async () => {
    expect.assertions(1);

    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    await Promise.resolve(NotFound()(req, res, next));

    expect(next).toHaveBeenCalledWith(
      new HttpError({
        status: 404,
        message: "Resource not found.",
        properties: {
          code: "RESOURCE_NOT_FOUND",
          details: "The requested resource was not found.",
          instructions: "Please check the resource ID and try again.",
        },
      }),
    );
  });
});
