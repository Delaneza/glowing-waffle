import { scenarioRoutes } from '@api/scenario/routes'
import { sessionRoutes } from '@api/session/routes'
import { simulationRoutes } from '@api/simulation/routes'
import { userRoutes } from '@api/user/routes'
import express, { Router } from 'express'

const routes: Router = express.Router()

routes.use('/users', userRoutes)
routes.use('/auth', sessionRoutes)
routes.use('/scenarios', scenarioRoutes)
routes.use('/simulations', simulationRoutes)

export { routes }
