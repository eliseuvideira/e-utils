import { NextFunction } from "../types/next-function";
import { Request } from "../types/request";
import { Response } from "../types/response";
import { Exception } from "./exception";

describe("Exception", () => {
  it("should handle HTTP errors correctly", async () => {
    const err = {
      status: 404,
      message: "Resource not found.",
      properties: {
        code: "RESOURCE_NOT_FOUND",
        details: "The requested resource was not found.",
        instructions: "Please check the resource ID and try again.",
      },
    };
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const logger = {
      error: jest.fn(),
    };

    await Promise.resolve(
      Exception({
        logger,
      })(err, req, res, next),
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Resource not found.",
    });
  });

  it("should handle non-HTTP errors correctly", async () => {
    const err = new Error("Database error.");
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const logger = {
      error: jest.fn(),
    };

    await Promise.resolve(
      Exception({
        logger,
      })(err, req, res, next),
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Internal server error.",
    });
  });

  it("should log the error if the status is 500", async () => {
    const err = new Error("Database error.");
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const logger = {
      error: jest.fn(),
    };

    await Promise.resolve(
      Exception({
        logger,
      })(err, req, res, next),
    );

    expect(logger.error).toHaveBeenCalledWith(err);
  });
});
