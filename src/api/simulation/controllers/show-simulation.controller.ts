import { ok } from '@shared/http/http-responses';
import { Request, Response } from 'express';
import { ShowSimulationUseCase } from '../usecases';

export async function ShowSimulationController(req: Request, res: Response) {
  const { id } = req.params;

  const simulation = await ShowSimulationUseCase({ id });

  return ok(res, simulation);
}