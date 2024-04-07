import { ExpressRequestHandler } from "@e-utils/express-request-handler";
import { createValidator } from "./create-validator";
import { ValidatorProps } from "../types/validator-props";
import { ZodSchema } from "../types/zod-schema";

export const body = <T extends ZodSchema>({
  schema,
}: ValidatorProps<T>): ExpressRequestHandler =>
  createValidator({
    key: "body",
    schema,
  });
