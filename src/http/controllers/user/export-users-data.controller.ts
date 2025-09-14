import { makeExportUsersDataUseCase } from '@use-cases/factories/user/make-export-users-data-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function exportUsersData(_request: FastifyRequest, reply: FastifyReply) {
  const exportUsersDataUseCase = makeExportUsersDataUseCase()

  const userCSVInfoResponse = await exportUsersDataUseCase.execute()

  return await reply
    .header('Content-Type', 'text/csv')
    .header('Content-Disposition', 'attachment; filename="usuarios.csv"')
    .send(userCSVInfoResponse.usersCSVInfo)
}
