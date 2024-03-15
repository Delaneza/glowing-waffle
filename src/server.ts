import { seedDatabase } from '@services/database/mongoose/seeds'
import { scheduleAllJobs } from '@services/scheduler'
import { config } from '@shared/config'
import { initializePassportStrategies } from '@services/auth/passport'
import { app } from './app'
import { mongoose } from './services/database/mongoose'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown', error)
})

mongoose.connect(config.mongodb.uri)

app.listen(Number(config.port), config.host, () => {
  console.log(`Server running on ${config.host}:${config.port} in ${config.env} mode`)
  // logger.info(`Server running on ${config.host}:${config.port} in ${config.env} mode`)
  initializePassportStrategies()
  seedDatabase()
  scheduleAllJobs()
})
