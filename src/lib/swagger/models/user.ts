import { httpUserSchema } from '@custom-types/entrypoints/http/presenter/user/user-default'
import { httpSimplifiedUserDetailsSchema } from '@custom-types/entrypoints/http/presenter/user/user-simplified'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-tokens'
import { apiMetaResponseSchema } from '@lib/swagger/schemas/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'
import { apiMessageSchema } from '../schemas/api-message-schema'

export const userSwaggerDocs = {
  // ========== AUTH ==========

  authenticate: {
    summary: 'Autenticar usuário',
    description: 'Realiza a autenticação do usuário e retorna o token de acesso junto com os dados do perfil.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      200: z
        .object({
          data: z.object({
            accessToken: z.string(),
            user: httpUserSchema,
          }),
        })
        .describe('Autenticação bem-sucedida'),
      401: apiErrorResponseSchema.describe('Credenciais inválidas'),
      403: apiErrorResponseSchema.describe('Usuário inativo, pendente ou e-mail não verificado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  refreshToken: {
    summary: 'Atualizar token de acesso',
    description: 'Gera um novo token de acesso a partir do refresh token presente nos cookies.',
    tags: [swaggerTokens.tags.user.auth],
    response: {
      200: z.object({ data: z.object({ accessToken: z.string() }) }).describe('Token atualizado com sucesso'),
      401: apiErrorResponseSchema.describe('Token inválido ou expirado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findUserById: {
    summary: 'Buscar usuário por ID público (admin)',
    description: 'Retorna os dados completos de um usuário específico para administração.',
    tags: [swaggerTokens.tags.user.admin],
    response: {
      200: z.object({ data: httpUserSchema }).describe('Dados completos do usuário'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  logout: {
    summary: 'Realizar logout',
    description: 'Encerra a sessão do usuário autenticado.',
    tags: [swaggerTokens.tags.user.auth],
    response: {
      200: z.object({ data: apiMessageSchema }).describe('Logout bem-sucedido'),
      401: apiErrorResponseSchema.describe('Token inválido ou expirado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  forgotPassword: {
    summary: 'Solicitar recuperação de senha',
    description: 'Envia um e-mail com instruções para redefinir a senha, caso o usuário exista.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      200: z.object({ data: apiMessageSchema }).describe('Solicitação processada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  resetPassword: {
    summary: 'Redefinir senha',
    description: 'Redefine a senha do usuário utilizando o token de recuperação.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      200: z.object({ data: apiMessageSchema }).describe('Senha redefinida com sucesso'),
      401: apiErrorResponseSchema.describe('Token inválido ou expirado, ou recuperação não solicitada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  verifyEmail: {
    summary: 'Verificar e-mail',
    description: 'Confirma o e-mail do usuário através do token de verificação enviado por e-mail.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      200: apiMessageSchema.describe('E-mail verificado com sucesso'),
      400: apiErrorResponseSchema.describe('Verificação de e-mail não solicitada'),
      401: apiErrorResponseSchema.describe('Token inválido ou expirado'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  // ========== PROFILE ==========

  getUserProfile: {
    summary: 'Obter perfil do usuário',
    description: 'Retorna os dados detalhados do perfil do usuário autenticado.',
    tags: [swaggerTokens.tags.user.auth],
    response: {
      200: z.object({ data: httpUserSchema }).describe('Dados do perfil do usuário'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  updateUser: {
    summary: 'Atualizar dados do usuário',
    description: 'Atualiza os dados do perfil do usuário autenticado.',
    tags: [swaggerTokens.tags.user.auth],
    response: {
      200: z.object({ data: httpUserSchema }).describe('Dados do usuário atualizados'),
      400: apiErrorResponseSchema.describe('Área de atuação ou informações de identidade inválidas'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      409: apiErrorResponseSchema.describe('Conflito de dados (e-mail, username, documento ou endereço duplicado)'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  changePassword: {
    summary: 'Alterar senha',
    description: 'Altera a senha do usuário autenticado mediante confirmação da senha atual.',
    tags: [swaggerTokens.tags.user.auth],
    response: {
      200: z.object({ data: apiMessageSchema }).describe('Senha atualizada com sucesso'),
      401: apiErrorResponseSchema.describe('Senha antiga incorreta ou usuário não autenticado'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  requestEmailChange: {
    summary: 'Solicitar alteração de e-mail',
    description:
      'Envia uma solicitação de alteração de e-mail. Um e-mail de confirmação será enviado ao novo endereço.',
    tags: [swaggerTokens.tags.user.auth],
    response: {
      200: z.object({ data: apiMessageSchema }).describe('Solicitação de alteração enviada'),
      400: apiErrorResponseSchema.describe('E-mails não conferem ou domínio de e-mail inválido'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      409: apiErrorResponseSchema.describe('Já existe um usuário com o mesmo e-mail'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteUser: {
    summary: 'Excluir conta do usuário',
    description: 'Remove a conta do usuário autenticado.',
    tags: [swaggerTokens.tags.user.auth],
    response: {
      204: z.void().describe('Conta excluída com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  // ========== PUBLIC ==========

  getAllUsers: {
    summary: 'Listar usuários (simplificado)',
    description: 'Retorna a lista paginada de usuários com informações simplificadas.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      200: z
        .object({
          data: z.array(httpSimplifiedUserDetailsSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista simplificada de usuários'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  checkAvailability: {
    summary: 'Verificar disponibilidade',
    description: 'Verifica a disponibilidade de username, e-mail ou documento de identidade.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      200: z
        .object({ data: z.record(z.string(), z.boolean()) })
        .describe('Resultado da verificação de disponibilidade'),
      400: apiErrorResponseSchema.describe('Nenhuma propriedade de entrada fornecida'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createUser: {
    summary: 'Cadastrar novo usuário',
    description: 'Cadastra um novo usuário no sistema. Após o cadastro, um e-mail de verificação será enviado.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      201: z.object({ data: httpUserSchema }).describe('Usuário criado com sucesso'),
      400: apiErrorResponseSchema.describe('Área de atuação, domínio de e-mail ou informações de identidade inválidas'),
      409: apiErrorResponseSchema.describe('Usuário, e-mail, username ou documento já existente'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
