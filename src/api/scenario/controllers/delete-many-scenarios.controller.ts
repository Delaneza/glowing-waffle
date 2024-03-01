import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { DeleteManyScenariosUseCase } from '../usecases'

export async function deleteManyScenariosController(req: Request, res: Response) {
  const { ids } = req.body

  const response = await DeleteManyScenariosUseCase({ ids })

  return ok(res, response)
}
