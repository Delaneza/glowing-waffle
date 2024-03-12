import { logger } from '@services/logger/logger'
import { AppError } from '@shared/errors/app-error.error'
import { fail } from '@shared/http/http-responses'
import { NextFunction, Request, Response } from 'express'

export function appErrorHandling(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err.name,
    })
  }

  return fail(res, err)
}
