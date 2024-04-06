import { Response as ExpressResponse } from "express";

export type Response = ExpressResponse<unknown, Record<string, unknown>>;
