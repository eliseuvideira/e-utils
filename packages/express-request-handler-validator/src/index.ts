import { query } from "express";
import { body } from "./functions/body";
import { params } from "./functions/params";

export const Validator = {
  body,
  query,
  params,
};

export { ValidatorProps } from "./types/validator-props";
