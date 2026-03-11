import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RegisterBodyType, RegisterUserBodySchemaType } from '@custom-types/http/schemas/user/register-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { CreateUserUseCase } from '@use-cases/user/create-user'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateUserController implements IController {
  constructor(
    @inject(CreateUserUseCase)
    private readonly useCase: CreateUserUseCase,

    @inject(UserDefaultPresenter)
    private readonly userDefaultPresenter: UserDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: RegisterBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body as RegisterUserBodySchemaType
    const { user } = await this.useCase.execute(parsedBody)

    const formattedReply = this.userDefaultPresenter.toHTTP(user)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
