import { ZodError, ZodType, ZodTypeDef } from "zod";
import { HttpError } from "@e-utils/http-error";
import {
  ExpressRequestHandler,
  Handler,
} from "@e-utils/express-request-handler";
import { CreateValidatorProps } from "../types/create-zod-validator-props";
import { getValidationErrorMessage } from "./get-validation-error-message";

export const createValidator = <
  T extends ZodType<unknown, ZodTypeDef, unknown>,
>({
  key,
  schema,
}: CreateValidatorProps<T>): ExpressRequestHandler =>
  Handler.create(async (req, _res, next) => {
    try {
      req[key] = schema.parse(req[key]);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = getValidationErrorMessage({ error });

        throw new HttpError({
          status: 400,
          message,
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
