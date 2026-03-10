import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ExportUsersDataQueryType } from '@custom-types/http/schemas/user/export-users-data-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { ExportUsersDataUseCase } from '@use-cases/user/export-users-data'
import type { FastifyReply } from 'fastify'
import { injectable } from 'tsyringe'

@injectable()
export class ExportUsersDataController implements IController {
  constructor(private useCase: ExportUsersDataUseCase) {}

  async handle(request: ZodRequest<{ querystring: ExportUsersDataQueryType }>, reply: FastifyReply) {
    const { format } = request.query
    const { reportStream, filename } = await this.useCase.execute({ format })

    return await reply.sendDownload(reportStream, filename)
  }
}
