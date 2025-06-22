import { exportUsersAsCsv } from '@/services/export-users'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function exportUserData(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const allUsersData = await exportUsersAsCsv()

  reply
    .header('Content-Type', 'text/csv')
    .header('Content-Disposition', 'attachment; filename="usuarios.csv"')
    .send(allUsersData)
}
