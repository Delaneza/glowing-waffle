import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

export function azureAD(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('azureAD', { session: false })
}
