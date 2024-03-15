import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { showUserUseCase } from '../usecases'

export async function showUserController(req: Request, res: Response) {
  const { user: id } = req

  const user = await showUserUseCase(id)

  return ok(res, user)
}
