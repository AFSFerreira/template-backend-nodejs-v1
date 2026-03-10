import { dashboardBlogsMetricsSchema } from '@custom-types/http/presenter/dashboard-metrics/dashboard-blogs-metrics'
import { dashboardNewslettersMetricsSchema } from '@custom-types/http/presenter/dashboard-metrics/dashboard-newsletters-metrics'
import { dashboardUsersMetricsSchema } from '@custom-types/http/presenter/dashboard-metrics/dashboard-users-metrics'
import { swaggerTokens } from '@lib/swagger/helpers/swagger-toneks'
import { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import { z } from 'zod'

export const dashboardMetricsSwaggerDocs = {
  getBlogsMetrics: {
    summary: 'Obter métricas de blogs',
    description: 'Retorna métricas consolidadas sobre os blogs do sistema.',
    tags: [swaggerTokens.tags.dashboardMetrics.restricted],
    response: {
      200: z.object({ data: dashboardBlogsMetricsSchema }).describe('Métricas de blogs'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getUsersMetrics: {
    summary: 'Obter métricas de usuários',
    description: 'Retorna métricas consolidadas sobre os usuários do sistema.',
    tags: [swaggerTokens.tags.dashboardMetrics.restricted],
    response: {
      200: z.object({ data: dashboardUsersMetricsSchema }).describe('Métricas de usuários'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  getNewslettersMetrics: {
    summary: 'Obter métricas de newsletters',
    description: 'Retorna métricas consolidadas sobre as newsletters do sistema.',
    tags: [swaggerTokens.tags.dashboardMetrics.restricted],
    response: {
      200: z.object({ data: dashboardNewslettersMetricsSchema }).describe('Métricas de newsletters'),
      401: apiErrorResponseSchema.describe('Usuário não autenticado'),
      403: apiErrorResponseSchema.describe('Sem permissão de acesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },

  registerPageView: {
    summary: 'Registrar visualização de página',
    description: 'Registra uma visualização única de página com base no IP do visitante.',
    tags: [swaggerTokens.tags.dashboardMetrics.public],
    response: {
      204: z.undefined().describe('Visualização registrada com sucesso'),
      429: apiErrorResponseSchema.describe('Limite de requisições excedido'),
    },
  },
} as const
