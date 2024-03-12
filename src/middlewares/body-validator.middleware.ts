import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

export function bodyValidator(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.map((err) => ({
          message: err.message,
          path: err.path.join('.'),
        }))

        res.status(400).json(details)
      } else {
        next(error)
      }
    }
  }
}
