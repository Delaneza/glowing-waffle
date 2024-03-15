import { adaptRoute } from '@middlewares/adapt-route.middleware'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated.middleware'
import { Router } from 'express'
import { createSimulationController, listSimulationsController, showSimulationController } from '../controllers'
import { CreateSimulationDTO } from '../dtos/create-simulation.dto'

const simulationRoutes: Router = Router()

simulationRoutes.post(
  '/',
  ensureAuthenticated({ required: true }),
  bodyValidator(CreateSimulationDTO),
  adaptRoute(createSimulationController)
)

simulationRoutes.get('/', ensureAuthenticated({ required: true }), adaptRoute(listSimulationsController))

simulationRoutes.get('/:id', ensureAuthenticated({ required: true }), adaptRoute(showSimulationController))

export { simulationRoutes }
