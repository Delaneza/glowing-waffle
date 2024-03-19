import { ok } from '@shared/http/http-responses'
import { UserDocument } from '@src/api/user/models/user.model'
import { Request, Response } from 'express'
import { newAuthUseCase } from '../usecases'

export async function newAuthController(req: Request, res: Response) {
  const { token, user } = await newAuthUseCase(req.user as UserDocument)
  return ok(res, { token, user })
}
