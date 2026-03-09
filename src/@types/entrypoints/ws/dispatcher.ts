import type { WebSocket } from '@fastify/websocket'
import type { UserRoleType } from '@prisma/generated/enums'

export type WsController = (socket: WebSocket, userId: string | null, payload: unknown) => Promise<unknown> | unknown

export type WsAuth = {
  role?: UserRoleType[]
}

export interface WsRouteConfig {
  controller: WsController
  auth?: WsAuth
}
