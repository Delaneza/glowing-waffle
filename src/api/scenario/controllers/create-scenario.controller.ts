import { created } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateScenarioUseCase } from '../usecases'

export const CreateScenarioDTO = z.object({
  name: z.string(),
  description: z.string(),
})

export async function CreateScenarioController(req: Request, res: Response) {
  const { name, description } = req.body
  const { userId: user } = req

  const scenario = await CreateScenarioUseCase({ user, name, description })

  return created(res, scenario)
}
