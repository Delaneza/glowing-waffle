import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

export function masterAthenticated(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('master', { session: false })
}
