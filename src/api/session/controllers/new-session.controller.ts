import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'

import { newSessionUseCase } from '../usecases'

export async function newSessionController(req: Request, res: Response) {
  const { email, password } = req.body
  
  

  const { token, user } = await newSessionUseCase({ email, password })

  return ok(res, { token, user })
}
