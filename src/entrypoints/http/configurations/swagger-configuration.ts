import type { SwaggerOptions } from '@fastify/swagger'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export const swaggerConfiguration = {
  openapi: {
    info: {
      title: 'Template Backend API',
      description: 'Documentação do sistema',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
} as const satisfies SwaggerOptions
