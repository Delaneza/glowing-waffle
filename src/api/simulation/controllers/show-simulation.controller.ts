import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { showSimulationUseCase } from '../usecases'

export async function showSimulationController(req: Request, res: Response) {
  const { id } = req.params

  const simulation = await showSimulationUseCase({ id })

  return ok(res, simulation)
}
