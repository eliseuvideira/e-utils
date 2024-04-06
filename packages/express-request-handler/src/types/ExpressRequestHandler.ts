import { RequestHandler as GenericExpressRequestHandler } from "express";

export type ExpressRequestHandler = GenericExpressRequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  Record<string, unknown>
>;
