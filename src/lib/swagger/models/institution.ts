import { httpInstitutionSchema } from '@custom-types/http/presenter/institution/institution-default'
import { httpInstitutionWithUsersCountSchema } from '@custom-types/http/presenter/institution/institution-with-users-count'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-tokens'
import { apiMetaResponseSchema } from '@lib/swagger/schemas/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const institutionSwaggerDocs = {
  getAllInstitutionsWithUsers: {
    summary: 'Listar instituições com contagem de usuários',
    description: 'Retorna a lista paginada de instituições com a quantidade de usuários associados a cada uma.',
    tags: [swaggerTokens.tags.institution.public],
    response: {
      200: z
        .object({
          data: z.array(httpInstitutionWithUsersCountSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de instituições com contagem de usuários'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      503: apiErrorResponseSchema.describe('Falha ao recuperar informações das instituições'),
    },
  },

  getAllInstitutionsNames: {
    summary: 'Listar nomes de instituições',
    description: 'Retorna a lista paginada de nomes de todas as instituições cadastradas.',
    tags: [swaggerTokens.tags.institution.public],
    response: {
      200: z
        .object({
          data: z.array(z.string()),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de nomes de instituições'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getAllInternalInstitutionsNames: {
    summary: 'Listar nomes de instituições internas',
    description: 'Retorna a lista paginada de nomes das instituições internas cadastradas.',
    tags: [swaggerTokens.tags.institution.public],
    response: {
      200: z
        .object({
          data: z.array(httpInstitutionSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de instituições internas'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createInstitution: {
    summary: 'Criar instituição',
    description: 'Cadastra uma nova instituição no sistema.',
    tags: [swaggerTokens.tags.institution.restricted],
    response: {
      201: z.object({ data: httpInstitutionSchema }).describe('Instituição criada com sucesso'),
      400: apiErrorResponseSchema.describe('Nome da instituição inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      409: apiErrorResponseSchema.describe('Instituição já existe'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  updateInstitution: {
    summary: 'Atualizar instituição',
    description: 'Atualiza os dados de uma instituição existente.',
    tags: [swaggerTokens.tags.institution.restricted],
    response: {
      200: z.object({ data: httpInstitutionSchema }).describe('Instituição atualizada com sucesso'),
      400: apiErrorResponseSchema.describe('Nome da instituição inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Instituição não encontrada'),
      409: apiErrorResponseSchema.describe('Instituição já existe'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteInstitution: {
    summary: 'Excluir instituição',
    description: 'Remove uma instituição do sistema.',
    tags: [swaggerTokens.tags.institution.restricted],
    response: {
      204: z.void().describe('Instituição excluída com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Instituição não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
