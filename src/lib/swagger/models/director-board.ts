import { httpDirectorBoardSchema } from '@custom-types/http/presenter/director-board/director-board-default'
import { httpDirectorBoardWithUserSchema } from '@custom-types/http/presenter/director-board/director-board-with-user'
import { httpDirectorBoardWithUserForAdminSchema } from '@custom-types/http/presenter/director-board/director-board-with-user-for-admin'
import { httpFileSchema } from '@custom-types/http/presenter/file/file-default'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiMetaResponseSchema } from '@lib/swagger/schemas/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const directorBoardSwaggerDocs = {
  getAllDirectorsBoard: {
    summary: 'Listar membros do corpo diretivo',
    description: 'Retorna a lista paginada de todos os membros do corpo diretivo.',
    tags: [swaggerTokens.tags.directorBoard.public],
    response: {
      200: z
        .object({
          data: z.array(httpDirectorBoardSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de membros do corpo diretivo'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao processar a lista de membros'),
    },
  },

  getDirectorBoardAboutHTML: {
    summary: 'Obter HTML sobre mim do membro',
    description: 'Retorna o conteúdo "sobre mim" do membro do corpo diretivo renderizado em HTML.',
    tags: [swaggerTokens.tags.directorBoard.public],
    response: {
      200: z.string().describe('Conteúdo HTML sobre o membro'),
      404: apiErrorResponseSchema.describe('Membro do corpo diretivo não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findDirectorBoardByPublicIdForAdmin: {
    summary: 'Buscar membro do corpo diretivo detalhado (admin)',
    description:
      'Retorna os detalhes completos de um membro do corpo diretivo, incluindo conteúdo ProseMirror, para gestores.',
    tags: [swaggerTokens.tags.directorBoard.restricted],
    response: {
      200: z
        .object({ data: httpDirectorBoardWithUserForAdminSchema })
        .describe('Membro encontrado com detalhes administrativos'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Membro do corpo diretivo não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findDirectorBoardByPublicId: {
    summary: 'Buscar membro do corpo diretivo',
    description: 'Retorna os detalhes públicos de um membro do corpo diretivo.',
    tags: [swaggerTokens.tags.directorBoard.public],
    response: {
      200: z.object({ data: httpDirectorBoardWithUserSchema }).describe('Membro encontrado'),
      404: apiErrorResponseSchema.describe('Membro do corpo diretivo não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  uploadDirectorBoardProfileImage: {
    summary: 'Upload de foto de perfil do membro',
    description: 'Realiza o upload da imagem de perfil de um membro do corpo diretivo.',
    tags: [swaggerTokens.tags.directorBoard.restricted],
    response: {
      201: z.object({ data: httpFileSchema }).describe('Imagem enviada com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      413: apiErrorResponseSchema.describe('Arquivo excede o tamanho limite'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao armazenar a imagem'),
    },
  },

  createDirectorBoard: {
    summary: 'Criar membro do corpo diretivo',
    description: 'Cadastra um novo membro no corpo diretivo.',
    tags: [swaggerTokens.tags.directorBoard.restricted],
    response: {
      201: z.object({ data: httpDirectorBoardSchema }).describe('Membro criado com sucesso'),
      400: apiErrorResponseSchema.describe('Conteúdo ProseMirror inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso ou role do usuário incompatível'),
      404: apiErrorResponseSchema.describe('Usuário ou cargo não encontrado'),
      409: apiErrorResponseSchema.describe('Membro já existe ou cargo já ocupado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  updateDirectorBoard: {
    summary: 'Atualizar membro do corpo diretivo',
    description: 'Atualiza os dados de um membro do corpo diretivo.',
    tags: [swaggerTokens.tags.directorBoard.restricted],
    response: {
      200: z.object({ data: httpDirectorBoardWithUserSchema }).describe('Membro atualizado com sucesso'),
      400: apiErrorResponseSchema.describe('Conteúdo ProseMirror inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe(
        'Gestores só podem atualizar seu próprio perfil / Apenas administradores podem alterar o cargo',
      ),
      404: apiErrorResponseSchema.describe('Membro do corpo diretivo não encontrado'),
      409: apiErrorResponseSchema.describe('Cargo já ocupado por outro membro'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteDirectorBoard: {
    summary: 'Excluir membro do corpo diretivo',
    description: 'Remove um membro do corpo diretivo do sistema.',
    tags: [swaggerTokens.tags.directorBoard.restricted],
    response: {
      204: z.void().describe('Membro excluído com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Membro do corpo diretivo não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
