import { ZodError, ZodType, ZodTypeDef } from "zod";
import { fromZodError } from "zod-validation-error";
import { HttpError } from "@e-utils/http-error";
import {
  ExpressRequestHandler,
  Handler,
} from "@e-utils/express-request-handler";

export type CreateValidatorProps<
  T extends ZodType<unknown, ZodTypeDef, unknown>,
> = {
  key: "body" | "params" | "query";
  schema: T;
};

export const createValidator = <
  T extends ZodType<unknown, ZodTypeDef, unknown>,
>({
  key,
  schema,
}: CreateValidatorProps<T>): ExpressRequestHandler =>
  Handler.create(async (req, _res, next) => {
    try {
      const result = schema.parse(req[key]);

      req[key] = result;

      next(undefined);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);

        throw new HttpError({
          status: 400,
          message: validationError.message,
          properties: {
            code: "INVALID_REQUEST",
            details: "The request is invalid.",
            instructions: "Please check the request and try again.",
          },
          cause: err,
        });
      }

      throw err;
    }
  });
