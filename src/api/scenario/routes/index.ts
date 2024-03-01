import { adaptRoute } from '@shared/http/route-adapter'
import { BodyValidator } from '@src/middlewares/body-validator.middleware'
import { EnsureAuthenticated } from '@src/middlewares/ensure-authenticated.middleware'
import { Router } from 'express'
import {
  createScenarioController,
  deleteManyScenariosController,
  deleteScenarioController,
  listScenariosController,
  updateScenarioController,
} from '../controllers'
import { createScenarioDTO, deleteManyScenariosDTO, updateScenarioDTO } from '../dtos'

const scenarioRoutes: Router = Router()

scenarioRoutes.post('/', EnsureAuthenticated(), BodyValidator(createScenarioDTO), adaptRoute(createScenarioController))

scenarioRoutes.get('/', EnsureAuthenticated(), adaptRoute(listScenariosController))

scenarioRoutes.get('/:id', EnsureAuthenticated(), adaptRoute(showScenarioController))

scenarioRoutes.put(
  '/:id',
  EnsureAuthenticated(),
  BodyValidator(updateScenarioDTO),
  adaptRoute(updateScenarioController)
)

scenarioRoutes.delete('/:id', EnsureAuthenticated(), adaptRoute(deleteScenarioController))

scenarioRoutes.post(
  '/deleteMany',
  EnsureAuthenticated(),
  BodyValidator(deleteManyScenariosDTO),
  adaptRoute(deleteManyScenariosController)
)

export { scenarioRoutes }
