import { ErrorRequestHandler as ExpressErrorRequestHandler } from "express";

export type ErrorRequestHandler = ExpressErrorRequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  Record<string, unknown>
>;
