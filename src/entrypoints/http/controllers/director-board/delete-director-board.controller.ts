import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteDirectorBoardParamsType } from '@custom-types/http/schemas/director-board/delete-director-board-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { DeleteDirectorBoardUseCase } from '@use-cases/director-board/delete-director-board'
import type { FastifyReply } from 'fastify'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class DeleteDirectorBoardController implements IController {
  constructor(private useCase: DeleteDirectorBoardUseCase) {}

  async handle(request: ZodRequest<{ params: DeleteDirectorBoardParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({
      publicId,
      audit: {
        actorPublicId: getRequestUserPublicId(request),
        ipAddress: getClientIp(request),
      },
    })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
