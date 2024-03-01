import mongoose from 'mongoose'

import { logger } from '@services/logger/logger'
import { config } from '@shared/config'

const mongodbConfig = config.mongodb

Object.keys(mongodbConfig.options).forEach((key: any) => {
  mongoose.set(key, mongodbConfig.options[key])
})

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err)
  process.exit(-1)
})

mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB')
})

export { mongoose }
