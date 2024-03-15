import { Request, Response, NextFunction } from "express"  
import passport from "passport"
import z from "zod"






function masterAthenticated(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('master', { session: false })
}