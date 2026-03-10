import { httpFileSchema } from '@custom-types/http/presenter/file/file-default'
import { httpNewsletterSchema } from '@custom-types/http/presenter/newsletter/newsletter-default'
import { httpNewsletterDetailedWithContentSchema } from '@custom-types/http/presenter/newsletter/newsletter-detailed-with-content'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-tokens'
import { apiMetaResponseSchema } from '@lib/swagger/schemas/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const newsletterSwaggerDocs = {
  getAllNewsletters: {
    summary: 'Listar newsletters',
    description: 'Retorna a lista paginada de todas as newsletters cadastradas.',
    tags: [swaggerTokens.tags.newsletter.auth],
    response: {
      200: z
        .object({
          data: z.array(httpNewsletterSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de newsletters'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findNewsletterByPublicIdRestricted: {
    summary: 'Buscar newsletter restrita por ID público',
    description: 'Retorna os detalhes completos de uma newsletter incluindo conteúdo para edição (ProseMirror).',
    tags: [swaggerTokens.tags.newsletter.restricted],
    response: {
      200: z.object({ data: httpNewsletterDetailedWithContentSchema }).describe('Detalhes completos da newsletter'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Newsletter não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findNewsletterByPublicId: {
    summary: 'Buscar newsletter por ID público',
    description: 'Retorna os dados básicos de uma newsletter pelo seu identificador público.',
    tags: [swaggerTokens.tags.newsletter.auth],
    response: {
      200: z.object({ data: httpNewsletterSchema }).describe('Dados da newsletter'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      404: apiErrorResponseSchema.describe('Newsletter não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getNewsletterHtmlContent: {
    summary: 'Obter conteúdo HTML da newsletter',
    description: 'Retorna o conteúdo HTML renderizado de uma newsletter específica.',
    tags: [swaggerTokens.tags.newsletter.auth],
    response: {
      200: z.string().describe('Conteúdo HTML da newsletter'),
      400: apiErrorResponseSchema.describe('Conteúdo da newsletter inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      404: apiErrorResponseSchema.describe('Newsletter não encontrada'),
      409: apiErrorResponseSchema.describe('Newsletter não possui um template configurado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao recuperar o arquivo HTML da newsletter'),
    },
  },

  uploadNewsletterHtml: {
    summary: 'Upload de arquivo HTML da newsletter',
    description: 'Faz o upload de um arquivo HTML para a newsletter.',
    tags: [swaggerTokens.tags.newsletter.restricted],
    response: {
      200: z.object({ data: httpFileSchema }).describe('Arquivo HTML enviado com sucesso'),
      400: apiErrorResponseSchema.describe('Nome de arquivo ou conteúdo inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      413: apiErrorResponseSchema.describe('Arquivo muito grande'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao persistir o arquivo HTML da newsletter'),
    },
  },

  uploadNewsletterImage: {
    summary: 'Upload de imagem da newsletter',
    description: 'Faz o upload de uma imagem para a newsletter.',
    tags: [swaggerTokens.tags.newsletter.restricted],
    response: {
      200: z.object({ data: httpFileSchema }).describe('Imagem enviada com sucesso'),
      400: apiErrorResponseSchema.describe('Link de imagem inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createNewsletter: {
    summary: 'Criar newsletter',
    description: 'Cadastra uma nova newsletter no sistema.',
    tags: [swaggerTokens.tags.newsletter.restricted],
    response: {
      201: z.object({ data: httpNewsletterSchema }).describe('Newsletter criada com sucesso'),
      400: apiErrorResponseSchema.describe('Conteúdo da newsletter inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      409: apiErrorResponseSchema.describe('Newsletter com mesmo volume e edição já existe'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  sendNewsletterEmail: {
    summary: 'Enviar newsletter por e-mail',
    description: 'Envia a newsletter por e-mail para todos os assinantes cadastrados.',
    tags: [swaggerTokens.tags.newsletter.restricted],
    response: {
      204: z.void().describe('Newsletter enviada por e-mail com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Newsletter não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  updateNewsletter: {
    summary: 'Atualizar newsletter',
    description: 'Atualiza os dados de uma newsletter existente.',
    tags: [swaggerTokens.tags.newsletter.restricted],
    response: {
      200: z.object({ data: httpNewsletterSchema }).describe('Newsletter atualizada com sucesso'),
      400: apiErrorResponseSchema.describe('Conteúdo da newsletter inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Newsletter não encontrada'),
      409: apiErrorResponseSchema.describe('Newsletter com mesmo volume e edição já existe'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  previewNewsletterContent: {
    summary: 'Pré-visualizar conteúdo da newsletter',
    description:
      'Compila um conteúdo ProseMirror com o template selecionado e retorna o HTML renderizado para pré-visualização.',
    tags: [swaggerTokens.tags.newsletter.restricted],
    response: {
      200: z.string().describe('Conteúdo HTML compilado da newsletter'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Template de newsletter não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteNewsletter: {
    summary: 'Excluir newsletter',
    description: 'Remove uma newsletter do sistema.',
    tags: [swaggerTokens.tags.newsletter.restricted],
    response: {
      204: z.void().describe('Newsletter excluída com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Newsletter não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
