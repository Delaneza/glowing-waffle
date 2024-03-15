import { created } from '@shared/http/http-responses'
import { Request, Response } from 'express'

import { createUserUseCase } from '../usecases'

export async function createUserController(req: Request, res: Response) {
  
  const { email, password, name } = req.body

  const user = await createUserUseCase({ email, password, name })

  return created(res, user)
}
