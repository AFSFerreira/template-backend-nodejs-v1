import { httpDirectorPositionSchema } from '@custom-types/http/presenter/director-position/director-position-default'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiMetaResponseSchema } from '@lib/zod/helpers/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/zod/helpers/api-response-schema'
import { z } from 'zod'

export const directorPositionSwaggerDocs = {
  getAllDirectorPositions: {
    summary: 'Listar cargos de diretoria',
    description: 'Retorna a lista paginada de todos os cargos de diretoria cadastrados.',
    tags: [swaggerTokens.tags.directorPosition.restricted],
    response: {
      200: z
        .object({
          data: z.array(httpDirectorPositionSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de cargos de diretoria'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createDirectorPosition: {
    summary: 'Criar cargo de diretoria',
    description: 'Cadastra um novo cargo no sistema de diretoria.',
    tags: [swaggerTokens.tags.directorPosition.restricted],
    response: {
      201: z.object({ directorPosition: httpDirectorPositionSchema }).describe('Cargo criado com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      409: apiErrorResponseSchema.describe('Cargo de diretoria já existe'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  updateDirectorPosition: {
    summary: 'Atualizar cargo de diretoria',
    description: 'Atualiza os dados de um cargo de diretoria existente.',
    tags: [swaggerTokens.tags.directorPosition.restricted],
    response: {
      200: z.object({ data: httpDirectorPositionSchema }).describe('Cargo atualizado com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Cargo de diretoria não encontrado'),
      409: apiErrorResponseSchema.describe('Cargo de diretoria já existe'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteDirectorPosition: {
    summary: 'Excluir cargo de diretoria',
    description: 'Remove um cargo de diretoria do sistema.',
    tags: [swaggerTokens.tags.directorPosition.restricted],
    response: {
      204: z.void().describe('Cargo excluído com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Cargo de diretoria não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
