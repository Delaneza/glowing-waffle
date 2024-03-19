import { roles } from '@api/user/models'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import z from 'zod'

const AuthErrorSchema = z.object({
  message: z.string(),
})

interface IUser {
  email: string
  password: string
  role: 'admin' | 'user'
  active: boolean
}

interface ITokenOptions {
  required: boolean
  Iroles?: string[]
}

export function ensureAuthenticated({ required, Iroles = roles }: ITokenOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('token', { session: false }, (err: Error, user: IUser, info: string) => {
      try {
        if (err || (required && !user) || (required && !Iroles.includes(user.role)) || !user.active) {
          const authError = AuthErrorSchema.safeParse({ message: err.message })
          if (!authError.success) throw new Error('Token expirado')
        }

        return req.logIn(user, { session: false }, (err: Error) => {
          if (err) return res.status(401).end()
          return next()
        })
      } catch (error) {
        next(error)
      }
    })(req, res, next)
  }
}
