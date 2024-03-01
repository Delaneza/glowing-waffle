import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { z } from 'zod'
import { UpdateScenarioUseCase } from '../usecases'

export const UpdateScenarioDTO = z.object({
  name: z.string(),
  description: z.string(),
})

export async function UpdateScenarioController(req: Request, res: Response) {
  const { id } = req.params
  const { name, description } = req.body

  const scenario = await UpdateScenarioUseCase({ id, name, description })

  return ok(res, scenario)
}
