import { logger } from '@services/logger/logger'
import { config } from '@shared/config'
import { app } from './app'
import { mongoose } from './services/database/mongoose'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown', error)
})

mongoose.connect(config.mongodb.uri)

app.listen(config.port, config.host, () => {
  logger.info(`Server running on ${config.host}:${config.port} in ${config.env} mode`)
})
