import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { deleteManyScenariosUseCase } from '../usecases'

export async function deleteManyScenariosController(req: Request, res: Response) {
  const { ids } = req.body

  const response = await deleteManyScenariosUseCase({ ids })

  return ok(res, response)
}
