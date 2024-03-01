import { created } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { createScenarioUseCase } from '../usecases'

export async function createScenarioController(req: Request, res: Response) {
  const { name, description } = req.body
  const { userId: user } = req

  const scenario = await createScenarioUseCase({ user, name, description })

  return created(res, scenario)
}
