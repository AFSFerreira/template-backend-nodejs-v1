import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateBodyType, UpdateUserBodySchemaType } from '@custom-types/http/schemas/user/update-user-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDetailedPresenter } from '@http/presenters/user/user-detailed.presenter'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { UpdateUserUseCase } from '@use-cases/user/update-user'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateUserController implements IController {
  constructor(
    @inject(UpdateUserUseCase)
    private readonly useCase: UpdateUserUseCase,

    @inject(UserDetailedPresenter)
    private readonly userDetailedPresenter: UserDetailedPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: UpdateBodyType }>, reply: FastifyReply) {
    const { user } = await this.useCase.execute({
      publicId: modelPublicIdSchema.parse(getRequestUserPublicId(request)),
      data: request.body as UpdateUserBodySchemaType,
    })

    const formattedReply = this.userDetailedPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
