import { EmptyUsersInfoError } from '@use-cases/errors/empty-users-info-error'
import { makeExportDataUseCase } from '@use-cases/factories/user/make-export-data-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function exportData(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const exportDataUseCase = makeExportDataUseCase()

  try {
    const userCSVInfoResponse = await exportDataUseCase.execute()

    return await reply
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename="usuarios.csv"')
      .send(userCSVInfoResponse.usersCSVInfo)
  } catch (error) {
    if (error instanceof EmptyUsersInfoError) {
      await reply.status(204).send({ message: error.message })
    }
  }
}
