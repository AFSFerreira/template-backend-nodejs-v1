import type { WebSocketServer } from 'ws'

export type ChannelHandler = (parsedMessage: unknown, wss: WebSocketServer) => void
