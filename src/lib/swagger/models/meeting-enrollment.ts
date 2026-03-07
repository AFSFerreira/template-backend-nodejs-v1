import { httpMeetingEnrollmentDetailedWithPresentationSchema } from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-detailed-with-presentation'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiErrorResponseSchema } from '@lib/zod/helpers/api-response-schema'
import { z } from 'zod'

export const meetingEnrollmentSwaggerDocs = {
  getMeetingEnrollment: {
    summary: 'Obter detalhes da inscrição',
    description:
      'Retorna os detalhes de uma inscrição na reunião, incluindo informações de apresentação quando aplicável.',
    tags: [swaggerTokens.tags.meetingEnrollment.restricted],
    response: {
      200: z
        .object({ data: httpMeetingEnrollmentDetailedWithPresentationSchema })
        .describe('Detalhes da inscrição na reunião'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Inscrição na reunião não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  deleteMeetingEnrollment: {
    summary: 'Excluir inscrição na reunião',
    description: 'Remove a inscrição de um participante em uma reunião.',
    tags: [swaggerTokens.tags.meetingEnrollment.restricted],
    response: {
      204: z.void().describe('Inscrição excluída com sucesso'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      404: apiErrorResponseSchema.describe('Inscrição na reunião não encontrada'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
