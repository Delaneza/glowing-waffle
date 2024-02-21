import { AppError } from "@shared/errors/app-error.error"
import { forbidden } from "@shared/http/http-responses"
import { NextFunction, Request, Response } from "express"
import { decode } from "jsonwebtoken"

type DecodedJwt = {
  id: string
}

const TOKEN_IS_MISSING = {
  message: 'Token is missing',
  name: 'Unauthorized',
  statusCode: 403
}

export async function EnsureAuthenticated(
  req: Request, res: Response, next: NextFunction
) {
  try {
    const { authorization: accessToken } = req.headers
    const token = accessToken?.split(' ')[1]

    if (!token) {
      return forbidden(res, new AppError(TOKEN_IS_MISSING))
    }

    try {
      const decoded = decode(token) as DecodedJwt

      req.userId = decoded.id

      return next()
    } catch (err) {
      console.error(err)

      return res.status(403).json({
        message: 'Invalid token',
        name: 'Unauthorized',
        statusCode: 403
      })
    }
  } catch (error) {
    return next(error)
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}