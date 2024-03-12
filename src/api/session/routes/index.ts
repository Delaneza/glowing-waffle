import { adaptRoute } from '@shared/http/route-adapter'
import { bodyValidator } from '@src/middlewares/body-validator.middleware'
import express, { Router } from 'express'
import { newSessionController } from '../controllers'
import { NewSessionDTO } from '../dtos'

const sessionRoutes: Router = express.Router()

sessionRoutes.post('/', bodyValidator(NewSessionDTO), adaptRoute(newSessionController))

export { sessionRoutes }
