import { httpAcademicPublicationSchema } from '@custom-types/http/presenter/academic-publication/academic-publication-default'
import { httpAcademicPublicationYearSchema } from '@custom-types/http/presenter/academic-publication/academic-publication-year'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiMetaResponseSchema } from '@lib/swagger/schemas/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const academicPublicationSwaggerDocs = {
  getAllAcademicPublications: {
    summary: 'Listar publicações acadêmicas',
    description: 'Retorna a lista paginada de todas as publicações acadêmicas cadastradas.',
    tags: [swaggerTokens.tags.academicPublication.public],
    response: {
      200: z
        .object({
          data: z.array(httpAcademicPublicationSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de publicações acadêmicas'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getAcademicPublicationsYears: {
    summary: 'Listar anos de publicações acadêmicas',
    description: 'Retorna a lista de anos com contagem de publicações acadêmicas.',
    tags: [swaggerTokens.tags.academicPublication.public],
    response: {
      200: z
        .object({
          data: z.array(httpAcademicPublicationYearSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de anos com contagem de publicações'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
