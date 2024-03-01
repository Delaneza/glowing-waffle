import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { showScenarioUseCase } from '../usecases'

export async function showScenarioController(req: Request, res: Response) {
  const { id } = req.params

  console.log('id', id)

  const scenario = await showScenarioUseCase({ id })

  return ok(res, scenario)
}
