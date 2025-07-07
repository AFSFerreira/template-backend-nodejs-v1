import { EmptyUsersInfoException } from '@/use-cases/errors/empty-users-info-exception'
import { makeExportDataUseCase } from '@/use-cases/user/factories/make-export-data-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function exportUserData(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  let allUsersData: string | undefined

  try {
    const exportDataUseCase = makeExportDataUseCase()
    const userCSVInfoResponse = await exportDataUseCase.execute()
    
    allUsersData = userCSVInfoResponse.userCSVInfo
  } catch(error) {
    if (error instanceof EmptyUsersInfoException) {
      reply.status(204).send({ message: error.message })
    }
  }

  reply
    .header('Content-Type', 'text/csv')
    .header('Content-Disposition', 'attachment; filename="usuarios.csv"')
    .send(allUsersData)
}
