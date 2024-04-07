import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export type GetValidationErrorMessageProps = {
  error: ZodError;
};

export const getValidationErrorMessage = ({
  error,
}: GetValidationErrorMessageProps): string => {
  const validationError = fromZodError(error);

  return validationError.message;
};
