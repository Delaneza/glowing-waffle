import { config } from '@shared/config'
import DatadogWinston from 'datadog-winston'
import { createLogger, format, transports } from 'winston'

const env = config.env

export const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [new transports.Console({ format: format.simple() })],
})

if (env === 'production' || env === 'staging') {
  logger.add(
    new DatadogWinston({
      apiKey: '',
      hostname: 'localhost',
      service: 'backend-project',
      ddsource: 'nodejs',
      ddtags: 'env:dev',
    })
  )
}

export default logger
