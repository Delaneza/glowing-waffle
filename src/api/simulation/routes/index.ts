import { adaptRoute } from '@shared/http/route-adapter'
import { BodyValidator } from '@src/middlewares/body-validator.middleware'
import { EnsureAuthenticated } from '@src/middlewares/ensure-authenticated.middleware'
import { Router } from 'express'
import { createSimulationController, listSimulationsController, showSimulationController } from '../controllers'
import { CreateSimulationDTO } from '../dtos/create-simulation.dto'

const simulationRoutes: Router = Router()

simulationRoutes.post(
  '/',
  EnsureAuthenticated(),
  BodyValidator(CreateSimulationDTO),
  adaptRoute(createSimulationController)
)

simulationRoutes.get('/', EnsureAuthenticated(), adaptRoute(listSimulationsController))

simulationRoutes.get('/:id', EnsureAuthenticated(), adaptRoute(showSimulationController))

export { simulationRoutes }
