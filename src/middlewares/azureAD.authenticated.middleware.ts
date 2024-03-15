import { Request, Response, NextFunction } from "express"
import passport from "passport"

function azureAD(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('azureAD', { session: false })
}
