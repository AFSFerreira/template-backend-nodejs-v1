import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetElectionNoticeUseCase } from '@use-cases/document-management/get-election-notice'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetElectionNoticeController implements IController {
  constructor(
    @inject(GetElectionNoticeUseCase)
    private readonly useCase: GetElectionNoticeUseCase,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { filename, stream } = await this.useCase.execute()

    return await reply.sendDownload(stream, filename)
  }
}
