import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { z } from 'zod'
import { DeleteManyScenariosUseCase } from '../usecases'

export const DeleteManyScenariosDTO = z.object({
  ids: z.array(z.string()),
})

export async function DeleteManyScenariosController(req: Request, res: Response) {
  const { ids } = req.body

  const response = await DeleteManyScenariosUseCase({ ids })

  return ok(res, response)
}
