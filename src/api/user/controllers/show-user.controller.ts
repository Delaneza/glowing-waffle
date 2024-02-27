import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { ShowUserUseCase } from '../usecases'

export async function ShowUserController(req: Request, res: Response) {
  const { userId: id } = req

  const user = await ShowUserUseCase(id)

  return ok(res, user)
}
