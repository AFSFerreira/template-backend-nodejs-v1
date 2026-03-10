import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateBodyType, UpdateUserBodySchemaType } from '@custom-types/http/schemas/user/update-user-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateUserUseCase } from '@use-cases/user/update-user'
import type { FastifyReply } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateUserController implements IController {
  constructor(private useCase: UpdateUserUseCase) {}

  async handle(request: ZodRequest<{ body: UpdateBodyType }>, reply: FastifyReply) {
    const publicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
    const parsedBody = request.body as UpdateUserBodySchemaType
    const { user } = await this.useCase.execute({
      publicId,
      data: parsedBody,
    })

    const formattedReply = UserDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
