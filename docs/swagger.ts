import swaggerJsdoc, { Options } from 'swagger-jsdoc'

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PROJETO BASE - API',
      version: '1.0.0',
      description: 'API para o projeto PROJETO BASE',
    },
  },
  apis: ['./src/**/*route.ts'],
}

export const swagger = swaggerJsdoc(swaggerOptions)
