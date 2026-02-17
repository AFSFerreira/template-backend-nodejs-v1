import type { FastifyRequest } from 'fastify'

function getSingleHeaderValue(header: string | string[] | undefined): string | undefined {
  if (Array.isArray(header)) return header[0]
  return header
}

export function getConnectionInfo(request: FastifyRequest) {
  return {
    ipAddress: request.ip,
    browser: getSingleHeaderValue(request.headers['user-agent']),
    remotePort: request.socket.remotePort,
  }
}
