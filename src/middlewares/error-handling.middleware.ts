import { AppError } from "@shared/errors/app-error.error"
import { fail } from "@shared/http/http-responses"
import { NextFunction, Request, Response } from "express"

export function AppErrorHandling(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err)

  switch (err.constructor.name) {
    case "AppError":
      const appError = err as AppError
      return res.status(appError.statusCode).json({
        message: appError.message,
        error: appError.name
      })
    default:
      return fail(res, err)
  }
}