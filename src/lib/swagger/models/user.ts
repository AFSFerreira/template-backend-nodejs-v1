import { httpFileSchema } from '@custom-types/http/presenter/file/file-default'
import { httpUserSchema } from '@custom-types/http/presenter/user/user-default'
import { httpUserDetailsSchema } from '@custom-types/http/presenter/user/user-detailed'
import { httpUserDetailsForAdminSchema } from '@custom-types/http/presenter/user/user-detailed-for-admin'
import { httpSimplifiedUserDetailsSchema } from '@custom-types/http/presenter/user/user-simplified'
import { httpSimplifiedUserDetailsForAdminSchema } from '@custom-types/http/presenter/user/user-simplified-for-admin'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiMetaResponseSchema } from '@lib/zod/helpers/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/zod/helpers/api-response-schema'
import { z } from 'zod'

const apiMessageSchema = z.object({
  code: z.string().describe('Código identificador da mensagem'),
  message: z.string().describe('Mensagem descritiva'),
})

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
      200: z.object({ data: httpUserDetailsSchema }).describe('Dados do perfil do usuário'),
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
      200: z.object({ data: httpUserDetailsSchema }).describe('Dados do usuário atualizados'),
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

  confirmEmailChange: {
    summary: 'Confirmar alteração de e-mail',
    description: 'Confirma a alteração de e-mail utilizando o token enviado ao novo endereço.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      200: z.object({ data: apiMessageSchema }).describe('E-mail atualizado com sucesso'),
      400: apiErrorResponseSchema.describe('Alteração de e-mail não solicitada'),
      401: apiErrorResponseSchema.describe('Token inválido ou expirado'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  uploadProfileImage: {
    summary: 'Upload de foto de perfil',
    description: 'Faz o upload de uma nova foto de perfil para o usuário.',
    tags: [swaggerTokens.tags.user.public],
    response: {
      201: z.object({ data: httpFileSchema }).describe('Foto de perfil enviada com sucesso'),
      401: apiErrorResponseSchema.describe('Formato de imagem inválido'),
      413: apiErrorResponseSchema.describe('Arquivo de imagem muito grande'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao processar ou persistir a foto de perfil'),
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

  getAllUsersSimplified: {
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
      201: z.object({ data: httpUserDetailsSchema }).describe('Usuário criado com sucesso'),
      400: apiErrorResponseSchema.describe('Área de atuação, domínio de e-mail ou informações de identidade inválidas'),
      409: apiErrorResponseSchema.describe('Usuário, e-mail, username ou documento já existente'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  // ========== ADMIN ==========

  getAllUsersDetailed: {
    summary: 'Listar usuários detalhados (admin)',
    description: 'Retorna a lista paginada de usuários com informações detalhadas para administração.',
    tags: [swaggerTokens.tags.user.restricted],
    response: {
      200: z
        .object({
          data: z.array(httpSimplifiedUserDetailsForAdminSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista detalhada de usuários para admin'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findUserByPublicId: {
    summary: 'Buscar usuário por ID público (admin)',
    description: 'Retorna os dados completos de um usuário específico para administração.',
    tags: [swaggerTokens.tags.user.admin],
    response: {
      200: z.object({ data: httpUserDetailsForAdminSchema }).describe('Dados completos do usuário'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  exportUsersData: {
    summary: 'Exportar dados de usuários',
    description:
      'Exporta os dados dos usuários para download no formato especificado pelo parâmetro `format` (excel ou csv). O padrão é excel.',
    tags: [swaggerTokens.tags.user.restricted],
    response: {
      200: z.string().describe('Arquivo Excel ou CSV com dados dos usuários'),
      204: z.void().describe('Nenhuma informação de usuários disponível para exportação'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  reviewMembershipStatus: {
    summary: 'Revisar status de membro',
    description: 'Revisa o status de membro de um usuário (aprovar ou rejeitar cadastro).',
    tags: [swaggerTokens.tags.user.restricted],
    response: {
      200: z.object({ data: httpUserDetailsSchema }).describe('Status de membro revisado'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado ou status não pendente'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  updateMembershipStatus: {
    summary: 'Atualizar status de membro',
    description: 'Atualiza o status de membro de um usuário (ativar ou inativar).',
    tags: [swaggerTokens.tags.user.admin],
    response: {
      200: z.object({ data: httpUserDetailsSchema }).describe('Status de membro atualizado'),
      400: apiErrorResponseSchema.describe(
        'Não é possível atualizar status de usuários com status VERIFYING ou PENDING',
      ),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Admin não pode inativar a si mesmo ou inativar outros admins'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  updateUserPermissions: {
    summary: 'Atualizar permissões do usuário',
    description: 'Atualiza a role/permissão de um usuário no sistema.',
    tags: [swaggerTokens.tags.user.admin],
    response: {
      204: z.void().describe('Permissões atualizadas com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Admin não pode alterar a própria permissão'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      409: apiErrorResponseSchema.describe('Já existe um administrador no sistema'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  transferAdminRole: {
    summary: 'Transferir role de administrador',
    description: 'Transfere a role de administrador para outro usuário do sistema.',
    tags: [swaggerTokens.tags.user.admin],
    response: {
      204: z.void().describe('Role de administrador transferida com sucesso'),
      400: apiErrorResponseSchema.describe('Não é possível transferir para si mesmo'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso ou usuário não é administrador'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteUserByAdmin: {
    summary: 'Excluir usuário (admin)',
    description: 'Remove a conta de um usuário pelo administrador.',
    tags: [swaggerTokens.tags.user.admin],
    response: {
      204: z.void().describe('Usuário excluído com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Admin não pode excluir a si mesmo'),
      404: apiErrorResponseSchema.describe('Usuário não encontrado'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
