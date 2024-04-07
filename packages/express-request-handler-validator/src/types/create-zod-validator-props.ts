import { ZodSchema } from "./zod-schema";

export type CreateValidatorProps<T extends ZodSchema> = {
  key: "body" | "params" | "query";
  schema: T;
};
