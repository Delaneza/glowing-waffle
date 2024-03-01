// import { NextFunction, Request, Response } from 'express'
// import Joi from 'joi'

// type Schema = {
//   validate(value: any, options?: Joi.ValidationOptions): Joi.ValidationResult
// }

// export function BodyValidator(schema: Schema) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req.body, { abortEarly: false })

//     if (error) {
//       const details = error.details.map((err) => ({
//         message: err.message,
//         key: err.context?.key,
//       }))

//       res.status(400).json(details)
//     } else {
//       next()
//     }
//   }
// }

import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

export function BodyValidator(schema: z.ZodSchema) {
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
