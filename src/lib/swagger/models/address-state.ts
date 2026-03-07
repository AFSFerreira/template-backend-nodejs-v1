import { httpAddressStatesSchema } from '@custom-types/http/presenter/address/address-with-users-count'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiMetaResponseSchema } from '@lib/zod/helpers/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/zod/helpers/api-response-schema'
import { z } from 'zod'

export const addressSwaggerDocs = {
  getAllStates: {
    summary: 'Listar estados com contagem de usuários',
    description: 'Retorna a lista de estados brasileiros com a quantidade de usuários cadastrados em cada um.',
    tags: [swaggerTokens.tags.address.public],
    response: {
      200: z
        .object({
          data: z.array(httpAddressStatesSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de estados com contagem de usuários'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
