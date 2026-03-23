import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { modelIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { DeleteUserUseCase } from '@use-cases/user/delete-user'
import { getRequestUserId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DeleteUserController implements IController {
  constructor(
    @inject(DeleteUserUseCase)
    private readonly useCase: DeleteUserUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    await this.useCase.execute({ id: modelIdSchema.parse(getRequestUserId(request)) })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
