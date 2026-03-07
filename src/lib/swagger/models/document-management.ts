import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiErrorResponseSchema } from '@lib/zod/helpers/api-response-schema'
import { z } from 'zod'

export const documentManagementSwaggerDocs = {
  getStatute: {
    summary: 'Baixar estatuto',
    description: 'Realiza o download do arquivo de estatuto da instituição.',
    tags: [swaggerTokens.tags.documentManagement.public],
    response: {
      200: z.string().describe('Arquivo do estatuto (stream)'),
      404: apiErrorResponseSchema.describe('Arquivo de estatuto não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao ler o arquivo de estatuto'),
    },
  },

  getElectionNotice: {
    summary: 'Baixar edital de eleição',
    description: 'Realiza o download do arquivo de edital de eleição.',
    tags: [swaggerTokens.tags.documentManagement.public],
    response: {
      200: z.string().describe('Arquivo do edital de eleição (stream)'),
      404: apiErrorResponseSchema.describe('Arquivo de edital não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao ler o arquivo de edital'),
    },
  },

  uploadStatute: {
    summary: 'Upload do estatuto',
    description: 'Realiza o upload de um novo arquivo de estatuto da instituição.',
    tags: [swaggerTokens.tags.documentManagement.restricted],
    response: {
      201: z.void().describe('Estatuto enviado com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      413: apiErrorResponseSchema.describe('Arquivo excede o tamanho limite'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Falha ao salvar o arquivo'),
    },
  },

  uploadElectionNotice: {
    summary: 'Upload do edital de eleição',
    description: 'Realiza o upload de um novo arquivo de edital de eleição.',
    tags: [swaggerTokens.tags.documentManagement.restricted],
    response: {
      201: z.void().describe('Edital enviado com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      413: apiErrorResponseSchema.describe('Arquivo excede o tamanho limite'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Falha ao salvar o arquivo'),
    },
  },
} as const
