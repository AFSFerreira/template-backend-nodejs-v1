import type { ClientState } from '@custom-types/entrypoints/ws/client-states'
import type { WebSocket } from 'ws'

export type { ClientState } from '@custom-types/entrypoints/ws/client-states'

export const clientStates = new WeakMap<WebSocket, ClientState>()
