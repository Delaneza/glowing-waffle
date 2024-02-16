import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VLISOP - API',
      version: '1.0.0',
      description: 'API para o projeto VLISOP',
    },
  },
  apis: ['./src/**/*route.ts']
};

export const swagger = swaggerJsdoc(swaggerOptions);