import { swaggerTokens } from '@lib/swagger/helpers/swagger-tokens'
import { z } from 'zod'

export const healthCheckSwaggerDocs = {
  healthCheck: {
    summary: 'Verificar saúde da aplicação',
    description: 'Verifica o status da aplicação e da conexão com o banco de dados.',
    tags: [swaggerTokens.tags.healthCheck.public],
    response: {
      200: z
        .object({
          status: z.literal('ok'),
          uptime: z.number(),
          timestamp: z.string(),
        })
        .describe('Aplicação saudável'),
      500: z
        .object({
          status: z.literal('error'),
          message: z.string(),
        })
        .describe('Aplicação com falha'),
    },
  },
} as const
