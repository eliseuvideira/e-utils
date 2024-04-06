import { ExpressRequestHandler } from "../types/ExpressRequestHandler";
import { RequestHandler } from "../types/RequestHandler";

export const create =
  (handler: RequestHandler): ExpressRequestHandler =>
  (req, res, next): void => {
    Promise.resolve(handler(req, res, next)).catch((err: unknown) => next(err));
  };
