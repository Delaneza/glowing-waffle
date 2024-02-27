import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import Joi from 'joi'
import { NewSessionUseCase } from '../usecases/new-session.usecase'

export const NewSessionDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export async function NewSessionController(req: Request, res: Response) {
  const { email, password } = req.body

  const { token, user } = await NewSessionUseCase({ email, password })

  return ok(res, { token, user })
}
