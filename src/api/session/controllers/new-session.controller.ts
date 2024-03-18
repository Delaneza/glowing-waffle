import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { newSessionUseCase } from '../usecases'
import { UserDocument } from '@src/api/user/models/user.model'

export async function newSessionController(req: Request, res: Response) {
  const { token, user } = await newSessionUseCase(req.user as UserDocument)
  return ok(res, { token, user })
}
