import { RequestHandler as ExpressRequestHandler } from "express";

export type RequestHandler = ExpressRequestHandler<
  unknown, unknown, unknown, unknown, Record<string, unknown>
>;
