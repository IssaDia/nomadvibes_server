import { Handler, RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export const createRoute = (
  input: ZodSchema,
  output: ZodSchema,
  ...middlewares: RequestHandler[]
) => {
  return;
};
