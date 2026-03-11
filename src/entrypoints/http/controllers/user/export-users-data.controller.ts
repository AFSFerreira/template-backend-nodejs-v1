import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ExportUsersDataQueryType } from '@custom-types/http/schemas/user/export-users-data-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { ExportUsersDataUseCase } from '@use-cases/user/export-users-data'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ExportUsersDataController implements IController {
  constructor(
    @inject(ExportUsersDataUseCase)
    private readonly useCase: ExportUsersDataUseCase,
  ) {}

  async handle(request: ZodRequest<{ querystring: ExportUsersDataQueryType }>, reply: FastifyReply) {
    const { format } = request.query
    const { reportStream, filename } = await this.useCase.execute({ format })

    return await reply.sendDownload(reportStream, filename)
  }
}
