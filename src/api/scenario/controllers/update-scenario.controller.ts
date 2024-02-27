import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import Joi from 'joi'
import { UpdateScenarioUseCase } from '../usecases'

export const UpdateScenarioDTO = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
})

export async function UpdateScenarioController(req: Request, res: Response) {
  const { id } = req.params
  const { name, description } = req.body

  const scenario = await UpdateScenarioUseCase({ id, name, description })

  return ok(res, scenario)
}
