import { appErrorHandling } from '@middlewares/error-handling.middleware'
import { config } from '@shared/config'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express, { Express } from 'express'
import forceSSL from 'express-force-ssl'
import helmet from 'helmet'
import morgan from 'morgan'
import { routes } from './api'

const app: Express = express()
const env = config.env

const possibleEnvs = {
  LOCAL: 'local',
  DEVELOP: 'devlop',
  STAGING: 'staging',
  PRODUCTION: 'production',
}

const isForceSSL = env !== possibleEnvs.LOCAL

if (isForceSSL) {
  app.set('forceSSLOptions', {
    enable301Redirects: true,
    trustXFPHeader: false,
    httpsPort: 443,
    sslRequiredMessage: 'SSL Required.',
  })
  app.use(forceSSL)
}

/**
 * Set up middleware
 */
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.disable('x-powered-by')

/**
 * Set up static files and docs
 */
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger))

/**
 * Set up routes
 */
app.use(routes)

/**
 * Set up error handling
 */
app.use(appErrorHandling)

export { app }
