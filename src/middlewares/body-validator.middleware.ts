import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

type Schema = {
  validate(value: any, options?: Joi.ValidationOptions): Joi.ValidationResult
}

export function BodyValidator(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      const details = error.details.map((err) => ({
        message: err.message,
        key: err.context.key,
      }))

      res.status(400).json(details)
    } else {
      next()
    }
  }
}
