import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { ShowScenarioUseCase } from '../usecases'

export async function showScenarioController(req: Request, res: Response) {
  const { id } = req.params

  console.log('id', id)

  const scenario = await ShowScenarioUseCase({ id })

  return ok(res, scenario)
}
