import type { WebSocket } from 'ws'
import { redisTokens } from '@lib/redis/helpers/redis-tokens'
import { PageVisualizationCacheService } from '@services/caches/page-visualization-cache'
import { clientStates } from '@ws/client-states'
import { container } from 'tsyringe'

export async function subscribeMetrics(socket: WebSocket, _userId: string | null, _payload: unknown) {
  const state = clientStates.get(socket)

  if (state) {
    state.subscriptions.add(redisTokens.pubSub.subscriptions.dashboardMetrics)

    socket.send(
      JSON.stringify({
        event: 'SUBSCRIBED',
        channel: redisTokens.pubSub.subscriptions.dashboardMetrics,
        message: 'Inscrição nas métricas em tempo real confirmada.',
      }),
    )

    const pageVisualizationCacheService = container.resolve(PageVisualizationCacheService)
    const chartData = await pageVisualizationCacheService.getPageViewsLast7Days()

    socket.send(
      JSON.stringify({
        event: 'METRICS_UPDATED',
        data: chartData,
      }),
    )
  }
}
