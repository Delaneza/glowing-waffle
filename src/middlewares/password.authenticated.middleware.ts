import { AuthorizationError, ExpiredTokenError, authenticationError } from '@src/shared/errors/authentication.error'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { z } from 'zod'

interface IUser {
  email: string
  password: string
  role: 'admin' | 'user'
  active: boolean
}

interface ITokenOptions {
  required: boolean
  role: string[]
}

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.enum(['user', 'planner', 'application']),
})

const AuthErrorSchema = z.object({
  message: z.string(),
})

export function password(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('password', { session: false }, (err: Error, user: IUser, info: string) => {
    try {
      if (err) {
        const authError = AuthErrorSchema.safeParse({ message: err.message })
        if (!authError.success) throw ExpiredTokenError('authentication' , 'Token expirado')
      }

      if (!user?.email || !user?.password /* || !user?.role || !user?.active */) {
        throw authenticationError('authentication', `Usuário ou senha inválidos`)
      }

      if (user.role !== req.body.role) {
        throw AuthorizationError('authentication', `Usuário não autorizado`)
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
