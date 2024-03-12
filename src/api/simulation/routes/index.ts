import { adaptRoute } from '@shared/http/route-adapter'
import { bodyValidator } from '@src/middlewares/body-validator.middleware'
import { ensureAuthenticated } from '@src/middlewares/ensure-authenticated.middleware'
import { Router } from 'express'
import { createSimulationController, listSimulationsController, showSimulationController } from '../controllers'
import { CreateSimulationDTO } from '../dtos/create-simulation.dto'

const simulationRoutes: Router = Router()

simulationRoutes.post(
  '/',
  ensureAuthenticated(),
  bodyValidator(CreateSimulationDTO),
  adaptRoute(createSimulationController)
)

simulationRoutes.get('/', ensureAuthenticated(), adaptRoute(listSimulationsController))

simulationRoutes.get('/:id', ensureAuthenticated(), adaptRoute(showSimulationController))

export { simulationRoutes }
