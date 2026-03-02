import type { WebSocket } from '@fastify/websocket'

export type WsController = (socket: WebSocket, userId: string | null, payload: unknown) => Promise<unknown> | unknown

interface WsRouteConfig {
  controller: WsController
  requiresAuth: boolean
}

class WsDispatcher {
  private routes: Map<string, WsRouteConfig> = new Map()

  public register(action: string, requiresAuth: boolean, controller: WsController) {
    this.routes.set(action, { requiresAuth, controller })
  }

  public getRoute(action: string): WsRouteConfig | undefined {
    return this.routes.get(action)
  }
}

export const wsDispatcher = new WsDispatcher()
