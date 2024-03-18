import { adaptRoute } from '@middlewares/adapt-route.middleware'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { password } from '@src/middlewares/password.authenticated.middleware'
import express, { Router } from 'express'
import { newSessionController } from '../controllers'
import { NewSessionDTO } from '../dtos'

const sessionRoutes: Router = express.Router()

sessionRoutes.post('/', password(), adaptRoute(newSessionController))

export { sessionRoutes }
