import { created } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import Joi from 'joi'
import { CreateUserUseCase } from '../usecases'

export const CreateUserDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
})

export async function CreateUserController(req: Request, res: Response) {
  const { email, password, name } = req.body

  const user = await CreateUserUseCase({ email, password, name })

  return created(res, user)
}
