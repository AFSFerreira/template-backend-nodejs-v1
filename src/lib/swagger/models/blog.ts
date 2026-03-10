import { httpBlogSchema } from '@custom-types/http/presenter/blog/blog-default'
import { httpBlogDetailedSchema } from '@custom-types/http/presenter/blog/blog-detailed'
import { httpBlogDetailedForAdminSchema } from '@custom-types/http/presenter/blog/blog-detailed-for-admin'
import { httpBlogDetailedWithContentSchema } from '@custom-types/http/presenter/blog/blog-detailed-with-content'
import { httpSimplifiedBlogSchema } from '@custom-types/http/presenter/blog/blog-simplified'
import { httpFileSchema } from '@custom-types/http/presenter/file/file-default'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiMetaResponseSchema } from '@lib/swagger/schemas/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const blogSwaggerDocs = {
  getAllBlogs: {
    summary: 'Listar blogs publicados',
    description: 'Retorna a lista paginada de blogs publicados visíveis ao público.',
    tags: [swaggerTokens.tags.blog.public],
    response: {
      200: z
        .object({
          data: z.array(httpSimplifiedBlogSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de blogs'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getAllBlogsDetailed: {
    summary: 'Listar blogs detalhados para gestão',
    description: 'Retorna a lista paginada de todos os blogs com detalhes administrativos, incluindo status editorial.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z
        .object({
          data: z.array(httpBlogDetailedForAdminSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de blogs detalhados'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getAllUserBlogsDetailed: {
    summary: 'Listar blogs do usuário autenticado',
    description: 'Retorna a lista paginada dos blogs do usuário autenticado com detalhes de gestão.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z
        .object({
          data: z.array(httpBlogDetailedForAdminSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de blogs do usuário'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getBlogHtmlContent: {
    summary: 'Obter conteúdo HTML do blog',
    description: 'Retorna o conteúdo do blog renderizado em HTML.',
    tags: [swaggerTokens.tags.blog.public],
    response: {
      200: z.string().describe('Conteúdo HTML do blog'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getRestrictBlogHtmlContent: {
    summary: 'Obter conteúdo HTML do blog (restrito)',
    description: 'Retorna o conteúdo do blog renderizado em HTML para produtores de conteúdo.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.string().describe('Conteúdo HTML do blog'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findBlogByPublicIdRestricted: {
    summary: 'Buscar blog detalhado com conteúdo (restrito)',
    description: 'Retorna os detalhes completos de um blog incluindo o conteúdo ProseMirror para edição.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpBlogDetailedWithContentSchema }).describe('Blog encontrado com conteúdo'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Acesso ao blog proibido'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findBlogByPublicId: {
    summary: 'Buscar blog por ID público',
    description: 'Retorna os detalhes de um blog publicado específico.',
    tags: [swaggerTokens.tags.blog.public],
    response: {
      200: z.object({ data: httpBlogDetailedSchema }).describe('Blog encontrado'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createPendingBlog: {
    summary: 'Criar blog com status pendente',
    description: 'Cria um novo blog com status editorial pendente de aprovação.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      201: z.object({ data: httpBlogSchema }).describe('Blog criado com sucesso'),
      400: apiErrorResponseSchema.describe('Dados inválidos ou conteúdo do blog inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Recurso não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createDraftBlog: {
    summary: 'Criar blog como rascunho',
    description: 'Cria um novo blog com status editorial de rascunho.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      201: z.object({ data: httpBlogSchema }).describe('Rascunho criado com sucesso'),
      400: apiErrorResponseSchema.describe('Dados inválidos ou conteúdo do blog inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Recurso não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createDraftCopyBlog: {
    summary: 'Criar cópia de rascunho de um blog',
    description: 'Cria uma cópia de um blog existente como rascunho.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      201: z.object({ data: httpBlogSchema }).describe('Cópia de rascunho criada com sucesso'),
      400: apiErrorResponseSchema.describe('Erro ao copiar conteúdo ou imagens do blog'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão para copiar este blog'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Falha ao copiar conteúdo ou imagens'),
    },
  },

  createAndPublishBlog: {
    summary: 'Criar e publicar blog',
    description: 'Cria um novo blog e o publica diretamente. Requer permissão de líder de conteúdo.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      201: z.object({ data: httpBlogSchema }).describe('Blog publicado com sucesso'),
      400: apiErrorResponseSchema.describe('Dados inválidos ou conteúdo do blog inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Recurso não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  uploadBlogImage: {
    summary: 'Upload de imagem para blog',
    description: 'Realiza o upload de uma imagem para uso no conteúdo do blog.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpFileSchema }).describe('Imagem enviada com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      413: apiErrorResponseSchema.describe('Arquivo excede o tamanho limite'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  uploadBlogBanner: {
    summary: 'Upload de banner do blog',
    description: 'Realiza o upload da imagem de banner do blog.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpFileSchema }).describe('Banner enviado com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      413: apiErrorResponseSchema.describe('Arquivo excede o tamanho limite'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  submitDraftForReview: {
    summary: 'Submeter rascunho para revisão',
    description: 'Altera o status editorial do blog de rascunho para em revisão.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpBlogSchema }).describe('Status atualizado com sucesso'),
      400: apiErrorResponseSchema.describe('Blog não está em estado de rascunho'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão para alterar status'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  submitReviewToPending: {
    summary: 'Submeter revisão para pendente',
    description: 'Altera o status editorial do blog de em revisão para pendente de aprovação.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpBlogSchema }).describe('Status atualizado com sucesso'),
      400: apiErrorResponseSchema.describe('Blog não está no estado correto'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão para alterar status'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  submitPendingToPublish: {
    summary: 'Publicar blog pendente',
    description: 'Altera o status editorial do blog de pendente para publicado.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpBlogSchema }).describe('Blog publicado com sucesso'),
      400: apiErrorResponseSchema.describe('Blog não está aguardando aprovação'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão para alterar status'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  submitPublishedToPending: {
    summary: 'Despublicar blog',
    description: 'Altera o status editorial do blog de publicado para pendente.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpBlogSchema }).describe('Blog despublicado com sucesso'),
      400: apiErrorResponseSchema.describe('Blog não está publicado'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão para alterar status'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  submitPendingToReview: {
    summary: 'Solicitar alterações no blog',
    description: 'Altera o status editorial do blog de pendente para alterações solicitadas.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpBlogSchema }).describe('Alterações solicitadas com sucesso'),
      400: apiErrorResponseSchema.describe('Blog não está aguardando aprovação'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão para alterar status'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  updateBlog: {
    summary: 'Atualizar blog',
    description: 'Atualiza os dados de um blog existente.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      200: z.object({ data: httpBlogSchema }).describe('Blog atualizado com sucesso'),
      400: apiErrorResponseSchema.describe('Dados inválidos ou conteúdo do blog inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteBlog: {
    summary: 'Excluir blog',
    description: 'Remove permanentemente um blog do sistema.',
    tags: [swaggerTokens.tags.blog.restricted],
    response: {
      204: z.void().describe('Blog excluído com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão para deletar este blog'),
      404: apiErrorResponseSchema.describe('Blog não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
