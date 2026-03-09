import type { WsDispatcher } from './dispatcher'
import { subscribeMetrics } from './handlers/subscribe-metrics.handler'

export function registerHandlers(dispatcher: WsDispatcher) {
  dispatcher.register('subscribe_metrics', subscribeMetrics)
}
