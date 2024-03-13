import { adaptRoute } from '@middlewares/adapt-route.middleware'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated.middleware'
import { Router } from 'express'
import {
  createScenarioController,
  deleteManyScenariosController,
  deleteScenarioController,
  listScenariosController,
  showScenarioController,
  updateScenarioController,
} from '../controllers'
import { createScenarioDTO, deleteManyScenariosDTO, updateScenarioDTO } from '../dtos'

const scenarioRoutes: Router = Router()

scenarioRoutes.post('/', ensureAuthenticated(), bodyValidator(createScenarioDTO), adaptRoute(createScenarioController))

scenarioRoutes.get('/', ensureAuthenticated(), adaptRoute(listScenariosController))

scenarioRoutes.get('/:id', ensureAuthenticated(), adaptRoute(showScenarioController))

scenarioRoutes.put(
  '/:id',
  ensureAuthenticated(),
  bodyValidator(updateScenarioDTO),
  adaptRoute(updateScenarioController)
)

scenarioRoutes.delete('/:id', ensureAuthenticated(), adaptRoute(deleteScenarioController))

scenarioRoutes.post(
  '/deleteMany',
  ensureAuthenticated(),
  bodyValidator(deleteManyScenariosDTO),
  adaptRoute(deleteManyScenariosController)
)

export { scenarioRoutes }
