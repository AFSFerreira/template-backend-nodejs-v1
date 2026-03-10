import { httpFileSchema } from '@custom-types/http/presenter/file/file-default'
import { httpInstitutionalInfoSchema } from '@custom-types/http/presenter/institutional-info/institutional-info'
import { httpInstitutionalInfoForAdminSchema } from '@custom-types/http/presenter/institutional-info/institutional-info-for-admin'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-tokens'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const institutionalInfoSwaggerDocs = {
  getInstitutionalInfo: {
    summary: 'Obter informações institucionais',
    description: 'Retorna as informações institucionais públicas do sistema.',
    tags: [swaggerTokens.tags.institutionalInfo.public],
    response: {
      200: z.object({ data: httpInstitutionalInfoSchema }).describe('Informações institucionais'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getInstitutionalInfoAboutDescriptionHTML: {
    summary: 'Obter descrição institucional em HTML',
    description: 'Retorna o conteúdo HTML da descrição "Sobre" da instituição.',
    tags: [swaggerTokens.tags.institutionalInfo.public],
    response: {
      200: z.string().describe('Conteúdo HTML da descrição institucional'),
      404: apiErrorResponseSchema.describe('Informações institucionais não encontradas'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getInstitutionalInfoForAdmin: {
    summary: 'Obter informações institucionais para administrador',
    description: 'Retorna as informações institucionais detalhadas incluindo conteúdo de edição (ProseMirror).',
    tags: [swaggerTokens.tags.institutionalInfo.restricted],
    response: {
      200: z
        .object({ data: httpInstitutionalInfoForAdminSchema })
        .describe('Informações institucionais para administrador'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  uploadInstitutionalAboutImage: {
    summary: 'Upload de imagem institucional',
    description: 'Faz o upload de uma nova imagem para a seção "Sobre" da instituição.',
    tags: [swaggerTokens.tags.institutionalInfo.restricted],
    response: {
      201: z.object({ data: httpFileSchema }).describe('Imagem enviada com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao armazenar a imagem institucional'),
    },
  },

  updateInstitutionalInfo: {
    summary: 'Atualizar informações institucionais',
    description: 'Atualiza as informações institucionais do sistema.',
    tags: [swaggerTokens.tags.institutionalInfo.restricted],
    response: {
      200: z.object({ data: httpInstitutionalInfoSchema }).describe('Informações institucionais atualizadas'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Informações institucionais não encontradas'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
