import { conflict, fail } from "@shared/http/http-responses"
import { NextFunction, Request, Response } from "express"

export function AppErrorHandling(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err)

  switch (err.constructor.name) {
    case "UserAlreadyExistsError":
      return conflict(res, err)
    default:
      return fail(res, err)
  }
}