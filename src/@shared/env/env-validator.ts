import { AppError } from '@shared/errors/app-error.error'

export function EnvValidator() {
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'SIMULATIONS_S3_BUCKET',
    'SIMULATIONS_S3_REGION',
    'SIMULATIONS_S3_ACCESS_KEY_ID',
    'SIMULATIONS_S3_SECRET_ACCESS_KEY',
  ]

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingEnvVars.length > 0) {
    const ERROR = {
      message: `Missing required environment variables ${missingEnvVars.join(', ')}`,
      name: 'EnvValidatorError',
      statusCode: 500,
    }

    throw new AppError(ERROR)
  }
}
