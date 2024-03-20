import { ok } from '@shared/http/http-responses'
import { NextFunction, Request, Response } from 'express'
import { listScenariosUseCase } from '../usecases'

export async function listScenariosController(
  { querymen: { query, select, cursor }, params }: Request,
  res: Response,
  next: NextFunction
) {
  console.log('query', query)
  console.log('params', params)
  console.log('cursor', cursor)
  console.log('select', select)

  const result = await listScenariosUseCase({ query, select, cursor })

  return ok(res, result)
}
