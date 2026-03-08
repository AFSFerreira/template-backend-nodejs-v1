import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ExportUsersDataQueryType } from '@custom-types/http/schemas/user/export-users-data-query-schema'
import type { FastifyReply } from 'fastify'
import { ExportUsersDataUseCase } from '@use-cases/user/export-users-data'
import { container } from 'tsyringe'

export async function exportUsersData(
  request: ZodRequest<{ querystring: ExportUsersDataQueryType }>,
  reply: FastifyReply,
) {
  const { format } = request.query

  const useCase = container.resolve(ExportUsersDataUseCase)

  const { reportStream, filename } = await useCase.execute({ format })

  return await reply.sendDownload(reportStream, filename)
}
