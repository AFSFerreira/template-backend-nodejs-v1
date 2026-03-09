import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { RegisterBodyType, RegisterUserBodySchemaType } from '@custom-types/http/schemas/user/register-body-schema'
import type { FastifyReply } from 'fastify'
import { UserPresenter } from '@http/presenters/user-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { CreateUserUseCase } from '@use-cases/user/create-user'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function createUser(request: ZodRequest<{ body: RegisterBodyType }>, reply: FastifyReply) {
  const parsedBody = request.body as RegisterUserBodySchemaType

  const useCase = container.resolve(CreateUserUseCase)

  const { user } = await useCase.execute(parsedBody)

  const formattedReply = UserPresenter.toHTTP<UserDetailedPresenterInput, HTTPUserWithDetails>(
    user,
    tsyringeTokens.presenters.user.userDetailed,
  )

  return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
}
