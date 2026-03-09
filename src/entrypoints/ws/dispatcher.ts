import type { WsController, WsRouteConfig } from '@custom-types/entrypoints/ws/dispatcher'

export type { WsController } from '@custom-types/entrypoints/ws/dispatcher'

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
