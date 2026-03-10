import { httpNewsletterTemplateSchema } from '@custom-types/http/presenter/newsletter-template/newsletter-template-default'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-tokens'
import { apiMetaResponseSchema } from '@lib/swagger/schemas/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const newsletterTemplateSwaggerDocs = {
  getAllNewsletterTemplates: {
    summary: 'Listar templates de newsletter',
    description: 'Retorna a lista paginada de todos os templates de newsletter disponíveis.',
    tags: [swaggerTokens.tags.newsletterTemplate.restricted],
    response: {
      200: z
        .object({
          data: z.array(httpNewsletterTemplateSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de templates de newsletter'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findNewsletterTemplateByPublicId: {
    summary: 'Buscar template de newsletter por ID público',
    description: 'Retorna os dados de um template de newsletter específico pelo seu identificador público.',
    tags: [swaggerTokens.tags.newsletterTemplate.restricted],
    response: {
      200: z.object({ data: httpNewsletterTemplateSchema }).describe('Dados do template de newsletter'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Template de newsletter não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
