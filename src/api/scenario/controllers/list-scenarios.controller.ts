import { ok } from '@shared/http/http-responses'
import { Request, Response } from 'express'
import { listScenariosUseCase } from '../usecases'

export async function listScenariosController(req: Request, res: Response) {
  const { name, description, cursor } = req.query

  const scenarios = await listScenariosUseCase({
    name: name as string,
    description: description as string,
    cursor: cursor ? JSON.parse(cursor as string) : {},
  })

  return ok(res, scenarios)
}
