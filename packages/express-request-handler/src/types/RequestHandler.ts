import { NextFunction } from "./NextFunction";
import { Request } from "./Request";
import { Response } from "./Response";

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
