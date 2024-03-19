import { adaptRoute } from '@middlewares/adapt-route.middleware'
import { password } from '@middlewares/password-authenticated.middleware'
import express, { Router } from 'express'
import { newAuthController } from '../controllers'

const authRoutes: Router = express.Router()

authRoutes.post('/', password(), adaptRoute(newAuthController))

export { authRoutes }
