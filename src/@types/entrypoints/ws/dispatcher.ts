import type { WebSocket } from '@fastify/websocket'

export type WsController = (socket: WebSocket, userId: string | null, payload: unknown) => Promise<unknown> | unknown

export interface WsRouteConfig {
  controller: WsController
  requiresAuth: boolean
}
