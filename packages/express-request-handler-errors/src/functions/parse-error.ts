import { hasMessage } from "./has-message";

export type ParseErrorMessageProps = {
  err: unknown;
  status: number;
  secure: boolean;
};

export const parseErrorMessage = ({
  err,
  status,
  secure,
}: ParseErrorMessageProps): string => {
  if (secure && status === 500) {
    return "Internal server error.";
  }

  if (hasMessage(err)) {
    return err.message;
  }

  return "An unknown error occurred.";
};
