import { created } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateUserUseCase } from '../usecases'

export const CreateUserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
})

export async function CreateUserController(req: Request, res: Response) {
  const { email, password, name } = req.body

  console.log('name', req.body)

  const user = await CreateUserUseCase({ email, password, name })

  return created(res, user)
}
