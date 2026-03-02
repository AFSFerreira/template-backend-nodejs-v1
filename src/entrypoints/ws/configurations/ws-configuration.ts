import type { WebsocketPluginOptions } from '@fastify/websocket'
import { MB_IN_BYTES } from '@constants/size-constants'

export const wsConfiguration = {
  options: {
    maxPayload: 1 * MB_IN_BYTES,
  },
} as const satisfies WebsocketPluginOptions
