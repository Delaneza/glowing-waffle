import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { z } from 'zod'
import { NewSessionUseCase } from '../usecases/new-session.usecase'

export const NewSessionDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function NewSessionController(req: Request, res: Response) {
  const { email, password } = req.body

  const { token, user } = await NewSessionUseCase({ email, password })

  return ok(res, { token, user })
}
