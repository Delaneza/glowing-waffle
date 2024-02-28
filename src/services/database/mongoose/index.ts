import mongoose from 'mongoose'

import { config } from '@shared/config'

const mongodbConfig = config.mongodb

Object.keys(mongodbConfig.options).forEach((key: any) => {
  mongoose.set(key, mongodbConfig.options[key])
})

mongoose.connection.on('error', (err) => {
  // use a logger here
  console.error('MongoDB Connection Error', err)
  process.exit(-1)
})

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})

export { mongoose }
