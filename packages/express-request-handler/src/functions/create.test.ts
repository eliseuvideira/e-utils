import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { create } from "./create";

describe("create", () => {
  it("should call the handler function with the correct arguments", () => {
    expect.assertions(1);

    const handler = jest.fn();

    const req = {} as ExpressRequest;
    const res = {} as ExpressResponse;
    const next = jest.fn(() => {
      expect(next).not.toHaveBeenCalled();
    });

    create(handler)(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
  });

  it("should call the next function with the error if the handler function throws an error", () => {
    expect.assertions(2);

    const handler = jest.fn(async () => {
      throw new Error("Failure");
    });

    const req = {} as ExpressRequest;
    const res = {} as ExpressResponse;
    const next = jest.fn((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Failure");
    });

    create(handler)(req, res, next);
  });
});
