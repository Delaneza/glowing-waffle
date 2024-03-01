import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'

export async function deleteScenarioController(req: Request, res: Response) {
  const { id } = req.params

  const response = await deleteScenarioUseCase({ id })

  return ok(res, response)
}
