import type { WebSocket, WebSocketServer } from 'ws'
import { redisTokens } from '@lib/redis/helpers/redis-tokens'
import { clientStates } from '@ws/client-states'

export function dashboardMetricsChannelHandler(parsedMessage: unknown, wss: WebSocketServer) {
  wss.clients.forEach((client: WebSocket) => {
    const state = clientStates.get(client)

    if (
      client.readyState === client.OPEN &&
      state?.subscriptions.has(redisTokens.pubSub.subscriptions.dashboardMetrics)
    ) {
      client.send(
        JSON.stringify({
          action: 'METRICS_UPDATED',
          payload: parsedMessage,
        }),
      )
    }
  })
}
