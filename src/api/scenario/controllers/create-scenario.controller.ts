import { created } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { createScenarioUseCase } from '../usecases'

export async function createScenarioController(req: Request, res: Response) {
  const { name, description } = req.body
  const {
    user: { id },
  } = req

  const scenario = await createScenarioUseCase({ user: id, name, description })

  return created(res, scenario)
}
