import { authRoutes } from '@api/auth/routes'
import { scenarioRoutes } from '@api/scenario/routes'
import { simulationRoutes } from '@api/simulation/routes'
import { userRoutes } from '@api/user/routes'
import { Router } from 'express'

const routes: Router = Router()

routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/scenarios', scenarioRoutes)
routes.use('/simulations', simulationRoutes)

export { routes }
