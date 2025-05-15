import type { WsAuth, WsController, WsRouteConfig } from '@custom-types/entrypoints/ws/dispatcher'

export type { WsController } from '@custom-types/entrypoints/ws/dispatcher'

export class WsDispatcher {
  private static instance: WsDispatcher | undefined
  private routes: Map<string, WsRouteConfig> = new Map()

  private constructor() {}

  public static getInstance(): WsDispatcher {
    if (!WsDispatcher.instance) {
      WsDispatcher.instance = new WsDispatcher()
    }
    return WsDispatcher.instance
  }

  public register(action: string, controller: WsController, auth?: WsAuth) {
    this.routes.set(action, { controller, auth })
  }

  public getRoute(action: string): WsRouteConfig | undefined {
    return this.routes.get(action)
  }
}
