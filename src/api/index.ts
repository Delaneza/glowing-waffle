import { scenarioRoutes } from '@api/scenario/routes'
import { sessionRoutes } from '@api/session/sessions.route'
import { userRoutes } from '@api/user/users.route'
import express, { Router } from 'express'
import { simulationRoutes } from './simulation/simulations.route'

const routes: Router = express.Router()

routes.use('/users', userRoutes)
routes.use('/auth', sessionRoutes)
routes.use('/scenarios', scenarioRoutes)
routes.use('/simulations', simulationRoutes)

export { routes }
