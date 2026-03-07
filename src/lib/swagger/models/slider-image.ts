import { httpFileSchema } from '@custom-types/http/presenter/file/file-default'
import { httpSliderImageSchema } from '@custom-types/http/presenter/slider-image/slider-image-default'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiMetaResponseSchema } from '@lib/zod/helpers/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/zod/helpers/api-response-schema'
import { z } from 'zod'

export const sliderImageSwaggerDocs = {
  getAllHomePageSlidersRestrict: {
    summary: 'Listar imagens do slider (restrito)',
    description:
      'Retorna a lista paginada de todas as imagens do slider da página inicial, incluindo imagens inativas.',
    tags: [swaggerTokens.tags.sliderImage.restricted],
    response: {
      200: z
        .object({
          data: z.array(httpSliderImageSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de imagens do slider'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getAllHomePageSliders: {
    summary: 'Listar imagens do slider',
    description: 'Retorna a lista paginada de imagens ativas do slider da página inicial.',
    tags: [swaggerTokens.tags.sliderImage.public],
    response: {
      200: z
        .object({
          data: z.array(httpSliderImageSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de imagens ativas do slider'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createHomePageSliderImage: {
    summary: 'Criar imagem do slider',
    description: 'Cadastra uma nova imagem no slider da página inicial.',
    tags: [swaggerTokens.tags.sliderImage.restricted],
    response: {
      201: z
        .object({ data: z.object({ sliderImage: httpSliderImageSchema }) })
        .describe('Imagem do slider criada com sucesso'),
      400: apiErrorResponseSchema.describe('Ordem inválida para a imagem de slider'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      409: apiErrorResponseSchema.describe('Limite de imagens de slider atingido'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  uploadSliderImage: {
    summary: 'Upload de imagem do slider',
    description: 'Faz o upload de uma imagem para uso no slider da página inicial.',
    tags: [swaggerTokens.tags.sliderImage.restricted],
    response: {
      201: z.object({ data: httpFileSchema }).describe('Imagem enviada com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Falha ao persistir a imagem do slider'),
    },
  },

  updateSliderImage: {
    summary: 'Atualizar imagem do slider',
    description: 'Atualiza os dados de uma imagem do slider existente.',
    tags: [swaggerTokens.tags.sliderImage.restricted],
    response: {
      200: z.object({ data: httpSliderImageSchema }).describe('Imagem do slider atualizada com sucesso'),
      400: apiErrorResponseSchema.describe('Ordem inválida para a imagem de slider'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Imagem de slider não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteSliderImage: {
    summary: 'Excluir imagem do slider',
    description: 'Remove uma imagem do slider da página inicial.',
    tags: [swaggerTokens.tags.sliderImage.restricted],
    response: {
      204: z.void().describe('Imagem do slider excluída com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Imagem de slider não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
