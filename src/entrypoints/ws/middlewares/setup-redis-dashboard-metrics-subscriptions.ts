import type { ChannelHandler } from '@custom-types/entrypoints/ws/redis-pubsub'
import type { FastifyInstance } from 'fastify'
import { logError } from '@lib/pino/helpers/log-error'
import { redisTokens } from '@lib/redis/helpers/redis-tokens'
import { redisSubscriber } from '@lib/redis/index'
import { dashboardMetricsChannelHandler } from '@ws/handlers/channels/dashboard-metrics-channel.handler'

const channelHandlers: Record<string, ChannelHandler> = {
  [redisTokens.pubSub.channels.dashboardMetrics]: dashboardMetricsChannelHandler,
}

/**
 * Inicializa as subscrições Redis Pub/Sub e registra um listener genérico que despacha
 * mensagens para handlers isolados por canal (padrão OCP — aberto para extensão,
 * fechado para modificação). Para adicionar um novo canal, basta incluir uma entrada
 * em `channelHandlers` sem alterar o listener.
 *
 * @param app - Instância do Fastify com o servidor WebSocket acoplado.
 */
export async function setupRedisPubSubSubscriptions(app: FastifyInstance) {
  const wss = app.websocketServer
  const channels = Object.keys(channelHandlers)

  await redisSubscriber.subscribe(...channels)

  redisSubscriber.on('message', (channel, message) => {
    const handler = channelHandlers[channel]

    if (!handler) return

    try {
      const parsedMessage: unknown = JSON.parse(message)
      handler(parsedMessage, wss)
    } catch (error) {
      logError({ error, context: { channel }, message: 'Falha ao processar mensagem do Redis Pub/Sub' })
    }
  })
}
