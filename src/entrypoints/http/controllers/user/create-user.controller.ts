import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RegisterBodyType, RegisterUserBodySchemaType } from '@custom-types/http/schemas/user/register-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDetailedPresenter } from '@http/presenters/user/user-detailed.presenter'
import { CreateUserUseCase } from '@use-cases/user/create-user'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateUserController implements IController {
  constructor(
    @inject(CreateUserUseCase)
    private readonly useCase: CreateUserUseCase,

    @inject(UserDetailedPresenter)
    private readonly userDetailedPresenter: UserDetailedPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: RegisterBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body as RegisterUserBodySchemaType
    const { user } = await this.useCase.execute(parsedBody)

    const formattedReply = this.userDetailedPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
