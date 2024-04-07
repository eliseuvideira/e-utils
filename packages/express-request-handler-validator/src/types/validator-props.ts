import { ZodSchema } from "./zod-schema";

export type ValidatorProps<T extends ZodSchema> = {
  schema: T;
};
