import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { updateScenarioUseCase } from '../usecases'

export async function updateScenarioController(req: Request, res: Response) {
  const { id } = req.params
  const { name, description } = req.body

  const scenario = await updateScenarioUseCase({ id, name, description })

  return ok(res, scenario)
}
