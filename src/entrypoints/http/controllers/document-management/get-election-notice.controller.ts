import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetElectionNoticeUseCase } from '@use-cases/document-management/get-election-notice'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { injectable } from 'tsyringe'

@injectable()
export class GetElectionNoticeController implements IController {
  constructor(private useCase: GetElectionNoticeUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { filename, stream } = await this.useCase.execute()

    return await reply.sendDownload(stream, filename)
  }
}
