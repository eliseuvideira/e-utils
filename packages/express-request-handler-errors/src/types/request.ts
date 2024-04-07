import { Request as ExpressRequest } from "express";

export type Request = ExpressRequest<
  unknown, unknown, unknown, unknown, Record<string, unknown>
>;
