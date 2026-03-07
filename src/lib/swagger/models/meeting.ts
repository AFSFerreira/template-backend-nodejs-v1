import { httpFileSchema } from '@custom-types/http/presenter/file/file-default'
import { httpMeetingWithDetailsSchema } from '@custom-types/http/presenter/meeting/meeting-detailed'
import { httpMeetingEnrollmentDetailedSchema } from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-detailed'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiMetaResponseSchema } from '@lib/zod/helpers/api-meta-response-schema'
import { apiErrorResponseSchema } from '@lib/zod/helpers/api-response-schema'
import { z } from 'zod'

export const meetingSwaggerDocs = {
  getAllMeetings: {
    summary: 'Listar reuniões',
    description: 'Retorna a lista paginada de todas as reuniões cadastradas com seus detalhes.',
    tags: [swaggerTokens.tags.meeting.public],
    response: {
      200: z
        .object({
          data: z.array(httpMeetingWithDetailsSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de reuniões'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  findMeetingByPublicId: {
    summary: 'Buscar reunião por ID público',
    description: 'Retorna os detalhes de uma reunião específica pelo seu identificador público.',
    tags: [swaggerTokens.tags.meeting.public],
    response: {
      200: z.object({ data: httpMeetingWithDetailsSchema }).describe('Detalhes da reunião'),
      404: apiErrorResponseSchema.describe('Reunião não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getMeetingParticipants: {
    summary: 'Listar participantes da reunião',
    description: 'Retorna a lista paginada de participantes inscritos em uma reunião específica.',
    tags: [swaggerTokens.tags.meeting.restricted],
    response: {
      200: z
        .object({
          data: z.array(httpMeetingEnrollmentDetailedSchema),
          meta: apiMetaResponseSchema,
        })
        .describe('Lista de participantes da reunião'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Reunião não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  exportMeetingEnrollments: {
    summary: 'Exportar inscrições da reunião',
    description: 'Exporta os dados das inscrições de uma reunião em formato de arquivo para download.',
    tags: [swaggerTokens.tags.meeting.restricted],
    response: {
      200: z.string().describe('Arquivo de exportação das inscrições'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Reunião não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  createMeeting: {
    summary: 'Criar reunião',
    description: 'Cadastra uma nova reunião no sistema com informações de pagamento e datas.',
    tags: [swaggerTokens.tags.meeting.restricted],
    response: {
      201: z.object({ data: httpMeetingWithDetailsSchema }).describe('Reunião criada com sucesso'),
      400: apiErrorResponseSchema.describe('Data da reunião ou data limite de pagamento inválida'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      409: apiErrorResponseSchema.describe('Já existe uma reunião ativa ou conflito de datas'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  registerUserMeeting: {
    summary: 'Inscrever usuário na reunião',
    description: 'Inscreve um usuário autenticado em uma reunião ativa.',
    tags: [swaggerTokens.tags.meeting.auth],
    response: {
      201: z.void().describe('Usuário inscrito com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      404: apiErrorResponseSchema.describe('Reunião não encontrada'),
      409: apiErrorResponseSchema.describe('Usuário já inscrito ou reunião finalizada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  registerGuestMeeting: {
    summary: 'Inscrever convidado na reunião',
    description: 'Inscreve um convidado (não autenticado) em uma reunião ativa.',
    tags: [swaggerTokens.tags.meeting.public],
    response: {
      201: z.void().describe('Convidado inscrito com sucesso'),
      404: apiErrorResponseSchema.describe('Reunião não encontrada'),
      409: apiErrorResponseSchema.describe('Convidado já inscrito ou reunião finalizada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  uploadMeetingBanner: {
    summary: 'Upload de banner da reunião',
    description: 'Faz o upload de uma imagem de banner para a reunião.',
    tags: [swaggerTokens.tags.meeting.restricted],
    response: {
      200: z.object({ data: httpFileSchema }).describe('Banner enviado com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao persistir o banner da reunião'),
    },
  },

  uploadMeetingAgenda: {
    summary: 'Upload de programa da reunião',
    description: 'Faz o upload do arquivo de programa/agenda da reunião.',
    tags: [swaggerTokens.tags.meeting.restricted],
    response: {
      200: z.object({ data: httpFileSchema }).describe('Programa enviado com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
      500: apiErrorResponseSchema.describe('Erro ao persistir o programa da reunião'),
    },
  },

  updateMeeting: {
    summary: 'Atualizar reunião',
    description: 'Atualiza os dados de uma reunião existente.',
    tags: [swaggerTokens.tags.meeting.restricted],
    response: {
      200: z.object({ data: httpMeetingWithDetailsSchema }).describe('Reunião atualizada com sucesso'),
      400: apiErrorResponseSchema.describe('Data da reunião ou data limite de pagamento inválida'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso ou alteração de pagamento proibida'),
      404: apiErrorResponseSchema.describe('Reunião não encontrada'),
      409: apiErrorResponseSchema.describe('Conflito de datas com reunião existente'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteMeeting: {
    summary: 'Excluir reunião',
    description: 'Remove uma reunião do sistema.',
    tags: [swaggerTokens.tags.meeting.restricted],
    response: {
      204: z.void().describe('Reunião excluída com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Reunião não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
