import { httpActivityAreaWithAcademicPublicationsCountSchema } from '@custom-types/http/presenter/academic-publication/activity-area-with-academic-publications-count'
import { httpActivityAreaSchema } from '@custom-types/http/presenter/activity-area/activity-area-default'
import { httpActivityAreaWithBlogsCountSchema } from '@custom-types/http/presenter/activity-area/activity-area-with-blogs-count'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-tokens'
import { apiMetaResponseSchema } from '@lib/swagger/schemas/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const activityAreaSwaggerDocs = {
  getAllActivityAreas: {
    summary: 'Listar áreas de atuação',
    description: 'Retorna a lista paginada de todas as áreas de atuação.',
    tags: [swaggerTokens.tags.activityArea.public],
    response: {
      200: z
        .object({
          data: z.array(httpActivityAreaSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de áreas de atuação'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getAllActivityAreasWithBlogs: {
    summary: 'Listar áreas de atuação com contagem de blogs',
    description: 'Retorna a lista de áreas de atuação com a quantidade de blogs associados a cada uma.',
    tags: [swaggerTokens.tags.activityArea.public],
    response: {
      200: z
        .object({
          data: z.array(httpActivityAreaWithBlogsCountSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de áreas com contagem de blogs'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getAllActivityAreasWithAcademicPublications: {
    summary: 'Listar áreas de atuação com contagem de publicações acadêmicas',
    description: 'Retorna a lista de áreas de atuação com a quantidade de publicações acadêmicas associadas.',
    tags: [swaggerTokens.tags.activityArea.public],
    response: {
      200: z
        .object({
          data: z.array(httpActivityAreaWithAcademicPublicationsCountSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de áreas com contagem de publicações acadêmicas'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
