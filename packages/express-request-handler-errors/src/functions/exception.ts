import { isHttpError } from "@e-utils/http-error";
import { parseErrorMessage } from "./parse-error";
import { Request } from "../types/request";
import { Response } from "../types/response";
import { NextFunction } from "../types/next-function";
import { ErrorRequestHandler } from "../types/error-request-handler";

export type ExceptionProps = {
  logger?: {
    error: (err: unknown) => void;
  };
  secure?: boolean;
};

export const Exception: (props?: ExceptionProps) => ErrorRequestHandler =
  ({
    logger = {
      error: console.error,
    },
    secure = true,
  }: ExceptionProps = {}): ErrorRequestHandler =>
  async (
    err: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _req: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) => {
    const status = isHttpError(err) ? err.status : 500;

    if (status === 500) {
      logger.error(err);
    }

    const message = parseErrorMessage({
      err,
      status,
      secure,
    });

    res.status(status).json({
      status,
      message,
    });
  };
