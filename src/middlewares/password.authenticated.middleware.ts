import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

interface IUser {
  email: string
  password: string
  role: 'admin' | 'user'
  active: boolean
}

export function password() {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('password', { session: false }, (err: Error, user: IUser) => {
      try {
        if (err || !user) {
          return res.status(401).send('Usuario ou senha invalidos')
        }
        return req.logIn(user, { session: false }, (err: Error) => {
          if (err) return res.status(401).end()
          return next()
        })
      } catch (error) {
        return res.status(500).send('Erro interno do servidor')
      }
    })(req, res, next)
  }
}
