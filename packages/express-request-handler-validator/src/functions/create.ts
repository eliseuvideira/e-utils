import { ZodError, ZodTypeAny, z } from "zod";
import {
  ExpressRequestHandler,
  Handler,
} from "@e-utils/express-request-handler";
import { HttpError } from "@e-utils/http-error";

export type CreateProps<
  Body extends ZodTypeAny,
  Query extends ZodTypeAny,
  Params extends ZodTypeAny,
> = {
  body: Body;
  query: Query;
  params: Params;
};

export const create = <
  Body extends ZodTypeAny,
  Query extends ZodTypeAny,
  Params extends ZodTypeAny,
>({
  body,
  query,
  params,
}: CreateProps<Body, Query, Params>): ExpressRequestHandler => {
  const schema = z.object({
    body,
    query,
    params,
  });

  return Handler.create(async (req, _res, next) => {
    const args = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    try {
      const result = schema.parse(args);

      req.body = result.body;
      req.query = result.query;
      req.params = result.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpError({
          status: 400,
          message: "Invalid request.",
          properties: {
            code: "INVALID_REQUEST",
            details: "The request is invalid.",
            instructions: "Please check the request and try again.",
            errors: error.errors,
          },
          cause: error,
        });
      }

      throw error;
    }
  });
};
