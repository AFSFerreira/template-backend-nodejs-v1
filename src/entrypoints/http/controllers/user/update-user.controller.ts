import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  UpdateBodyType,
  UpdateUserBodySchemaType,
} from '@custom-types/entrypoints/http/schemas/user/update-user-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { modelIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { UpdateUserUseCase } from '@use-cases/user/update-user'
import { getRequestUserId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateUserController implements IController {
  constructor(
    @inject(UpdateUserUseCase)
    private readonly useCase: UpdateUserUseCase,

    @inject(UserDefaultPresenter)
    private readonly userDefaultPresenter: UserDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: UpdateBodyType }>, reply: FastifyReply) {
    const { user } = await this.useCase.execute({
      id: modelIdSchema.parse(getRequestUserId(request)),
      data: request.body as UpdateUserBodySchemaType,
    })

    const formattedReply = this.userDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply)
  }
}
