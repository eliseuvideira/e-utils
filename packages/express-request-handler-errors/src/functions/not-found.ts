import { HttpError } from "@e-utils/http-error";
import { NextFunction } from "../types/next-function";
import { Response } from "../types/response";
import { Request } from "../types/request";
import { RequestHandler } from "../types/request-handler";

export const NotFound: () => RequestHandler =
  (): RequestHandler =>
  async (_req: Request, _res: Response, next: NextFunction) => {
    next(
      new HttpError({
        status: 404,
        message: "Resource not found.",
        properties: {
          code: "RESOURCE_NOT_FOUND",
          details: "The requested resource was not found.",
          instructions: "Please check the resource ID and try again.",
        },
      }),
    );
  };
