import { NextFunction } from "./next-function";
import { Request } from "./request";
import { Response } from "./response";

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
