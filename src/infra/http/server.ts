import { config } from '@shared/config';
import { app } from './app';

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown', error)
  process.exit(1)
})

// mongoose.connect(config.mongodb.uri)
// mongoose.Promise = Promise

app.listen(config.port, config.host, () => console.log(`Server running on ${config.host}:${config.port} in ${config.env} mode`))
