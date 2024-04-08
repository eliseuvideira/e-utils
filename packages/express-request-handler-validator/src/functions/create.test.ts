import { Request, Response } from "@e-utils/express-request-handler";
import { create } from "./create";
import { ZodError, z } from "zod";
import { HttpError } from "@e-utils/http-error";

const OBJECT_SCHEMA = z.record(z.string(), z.unknown());

describe("create", () => {
  it("should validate the body and pass the request to the next handler", async () => {
    const validator = create({
      body: z.object({
        name: z.string(),
      }),
      query: OBJECT_SCHEMA,
      params: OBJECT_SCHEMA,
    });

    const req = {
      body: {
        name: "John Doe",
        age: 25,
      },
      query: {},
      params: {},
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await Promise.resolve(validator(req, res, next));

    expect(req.body).toEqual({
      name: "John Doe",
    });
    expect(req.query).toEqual({});
    expect(req.params).toEqual({});
    expect(next).toHaveBeenCalled();
  });

  it("should validate the body and throw an error if the request is invalid", async () => {
    expect.assertions(4);

    const handler = create({
      body: z.object({
        name: z.string(),
      }),
      query: OBJECT_SCHEMA,
      params: OBJECT_SCHEMA,
    });

    const req = {
      body: {
        age: 20,
      },
      query: {},
      params: {},
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await handler(req, res, next);

    expect(next).toHaveBeenCalled();

    const error: ZodError = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(HttpError);
    expect(error.message).toBe("Invalid request.");
    expect(error).toMatchObject({
      status: 400,
      properties: {
        code: "INVALID_REQUEST",
        details: "The request is invalid.",
        instructions: "Please check the request and try again.",
        errors: [
          {
            expected: "string",
            path: ["body", "name"],
          },
        ],
      },
    });
  });

  it("should validate the query and pass the request to the next handler", async () => {
    const validator = create({
      body: OBJECT_SCHEMA,
      query: z.object({
        name: z.string(),
      }),
      params: OBJECT_SCHEMA,
    });

    const req = {
      body: {},
      query: {
        name: "John Doe",
        age: 25,
      },
      params: {},
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await Promise.resolve(validator(req, res, next));

    expect(req.body).toEqual({});
    expect(req.query).toEqual({
      name: "John Doe",
    });
    expect(req.params).toEqual({});
    expect(next).toHaveBeenCalled();
  });

  it("should validate the query and throw an error if the request is invalid", async () => {
    expect.assertions(4);

    const handler = create({
      body: OBJECT_SCHEMA,
      query: z.object({
        name: z.string(),
      }),
      params: OBJECT_SCHEMA,
    });

    const req = {
      body: {},
      query: {
        age: 20,
      },
      params: {},
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await handler(req, res, next);

    expect(next).toHaveBeenCalled();

    const error: ZodError = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(HttpError);
    expect(error.message).toBe("Invalid request.");
    expect(error).toMatchObject({
      status: 400,
      properties: {
        code: "INVALID_REQUEST",
        details: "The request is invalid.",
        instructions: "Please check the request and try again.",
        errors: [
          {
            expected: "string",
            path: ["query", "name"],
          },
        ],
      },
    });
  });

  it("should validate the params and pass the request to the next handler", async () => {
    const validator = create({
      body: OBJECT_SCHEMA,
      query: OBJECT_SCHEMA,
      params: z.object({
        name: z.string(),
      }),
    });

    const req = {
      body: {},
      query: {},
      params: {
        name: "John Doe",
        age: 25,
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await Promise.resolve(validator(req, res, next));

    expect(req.body).toEqual({});
    expect(req.query).toEqual({});
    expect(req.params).toEqual({
      name: "John Doe",
    });
    expect(next).toHaveBeenCalled();
  });

  it("should validate the params and throw an error if the request is invalid", async () => {
    expect.assertions(4);

    const handler = create({
      body: OBJECT_SCHEMA,
      query: OBJECT_SCHEMA,
      params: z.object({
        name: z.string(),
      }),
    });

    const req = {
      body: {},
      query: {},
      params: {
        age: 20,
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await handler(req, res, next);

    expect(next).toHaveBeenCalled();

    const error: ZodError = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(HttpError);
    expect(error.message).toBe("Invalid request.");
    expect(error).toMatchObject({
      status: 400,
      properties: {
        code: "INVALID_REQUEST",
        details: "The request is invalid.",
        instructions: "Please check the request and try again.",
        errors: [
          {
            expected: "string",
            path: ["params", "name"],
          },
        ],
      },
    });
  });

  it("should validate the body, query, and params and pass the request to the next handler", async () => {
    const validator = create({
      body: z.object({
        name: z.string(),
      }),
      query: z.object({
        age: z.number(),
      }),
      params: z.object({
        id: z.string(),
      }),
    });

    const req = {
      body: {
        name: "John Doe",
      },
      query: {
        age: 25,
      },
      params: {
        id: "123",
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await Promise.resolve(validator(req, res, next));

    expect(req.body).toEqual({
      name: "John Doe",
    });
    expect(req.query).toEqual({
      age: 25,
    });
    expect(req.params).toEqual({
      id: "123",
    });
    expect(next).toHaveBeenCalled();
  });

  it("should validate the body, query, and params and throw an error if the request is invalid", async () => {
    expect.assertions(4);

    const handler = create({
      body: z.object({
        name: z.string(),
      }),
      query: z.object({
        age: z.number(),
      }),
      params: z.object({
        id: z.string(),
      }),
    });

    const req = {
      body: {
        name: "John Doe",
      },
      query: {
        age: "25",
      },
      params: {
        id: 123,
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await handler(req, res, next);

    expect(next).toHaveBeenCalled();

    const error: ZodError = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(HttpError);
    expect(error.message).toBe("Invalid request.");
    expect(error).toMatchObject({
      status: 400,
      properties: {
        code: "INVALID_REQUEST",
        details: "The request is invalid.",
        instructions: "Please check the request and try again.",
        errors: [
          {
            expected: "number",
            path: ["query", "age"],
          },
          {
            expected: "string",
            path: ["params", "id"],
          },
        ],
      },
    });
  });
});
