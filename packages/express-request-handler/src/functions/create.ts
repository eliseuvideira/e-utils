import { ExpressRequestHandler } from "../types/express-request-handler";
import { RequestHandler } from "../types/request-handler";

export const create =
  (handler: RequestHandler): ExpressRequestHandler =>
  (req, res, next): void => {
    Promise.resolve(handler(req, res, next)).catch((err: unknown) => next(err));
  };
