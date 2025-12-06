import { ExportUsersDataUseCase } from '@use-cases/user/export-users-data'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function exportUsersData(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(ExportUsersDataUseCase)

  const userCSVInfoResponse = await useCase.execute()

  return await reply
    .header('Content-Type', 'text/csv')
    .header('Content-Disposition', 'attachment; filename="usuarios.csv"')
    .send(userCSVInfoResponse.usersCSVInfo)
}
