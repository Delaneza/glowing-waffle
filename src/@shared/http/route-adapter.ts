import { Controller } from '@shared/interfaces/controller.interface'
import { NextFunction, Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      return await controller(request, response, next)
    } catch (error) {
      return next(error)
    }
  }
}
