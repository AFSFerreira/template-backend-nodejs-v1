import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetStatuteUseCase } from '@use-cases/document-management/get-statute'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { injectable } from 'tsyringe'

@injectable()
export class GetStatuteController implements IController {
  constructor(private useCase: GetStatuteUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { filename, stream } = await this.useCase.execute()

    return await reply.sendDownload(stream, filename)
  }
}
