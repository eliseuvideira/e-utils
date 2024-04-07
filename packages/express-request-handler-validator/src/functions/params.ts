import { ExpressRequestHandler } from "@e-utils/express-request-handler";
import { createValidator } from "./create-validator";
import { ZodSchema } from "../types/zod-schema";
import { ValidatorProps } from "../types/validator-props";

export const params = <T extends ZodSchema>({
  schema,
}: ValidatorProps<T>): ExpressRequestHandler =>
  createValidator({
    key: "params",
    schema,
  });
