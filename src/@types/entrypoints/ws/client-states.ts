export interface ClientState {
  isAlive: boolean
  tokenExp?: number
  subscriptions: Set<string>
}
