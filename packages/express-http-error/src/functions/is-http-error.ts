import { HttpError } from "../utils/http-error";

export const isHttpError = (error: unknown): error is HttpError => {
  if (error instanceof HttpError) {
    return true;
  }

  if (error instanceof Error) {
    return (
      "status" in error &&
      typeof error.status === "number" &&
      "properties" in error
    );
  }

  if (typeof error === "object" && error !== null) {
    return (
      "status" in error &&
      typeof error.status === "number" &&
      "properties" in error
    );
  }

  return false;
};
