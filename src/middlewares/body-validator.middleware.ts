import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

export function bodyValidator(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization

      if (authHeader === undefined) {
        return res.status(401).json({ message: 'Credenciais inválidas.' })
      }
      const credentials = decodeBasicAuth(authHeader)

      req.body.email = credentials?.username || req.body.email
      req.body.password = credentials?.password || req.body.password

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

function decodeBasicAuth(authHeader: string): { username: string; password: string } | null {
  if (authHeader.startsWith('Basic ')) {
    const encodedCredentials = authHeader.substring(6)

    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8')

    const [username, password] = decodedCredentials.split(':')
    return { username, password }
  } else {
    return null
  }
}
