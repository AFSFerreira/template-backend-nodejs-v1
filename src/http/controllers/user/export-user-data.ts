import type { FastifyReply, FastifyRequest } from 'fastify'
import { EmptyUsersInfoException } from '@/use-cases/errors/empty-users-info-exception'
import { makeExportDataUseCase } from '@/use-cases/factories/user/make-export-data-use-case'

export async function exportUserData(
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
    if (error instanceof EmptyUsersInfoException) {
      reply.status(204).send({ message: error.message })
    }
  }
}
