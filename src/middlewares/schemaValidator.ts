import { ZodSchema } from 'zod';

export default function schemaValidator(schema: ZodSchema) {
  return (req: any, res: any, next: any) => {
    try {
      const parsedBody = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      console.log(error);

      res.status(400).json({ success: false, message: 'Invalid request' });
    }
  };
}
