import type { IController } from '@custom-types/utils/http/adapt-route'
import type { DeleteUserUseCase } from '@use-cases/user/delete-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class DeleteUserController implements IController {
  constructor(private useCase: DeleteUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
