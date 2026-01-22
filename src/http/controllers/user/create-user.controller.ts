import type { HTTPUserWithDetails, UserDetailedPresenterInput } from '@custom-types/http/presenter/user/user-detailed'
import type { RegisterUserBodySchemaType } from '@custom-types/http/schemas/user/register-body-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UserPresenter } from '@presenters/user-presenter'
import { registerBodySchema } from '@schemas/user/register-body-schema'
import { CreateUserUseCase } from '@use-cases/user/create-user'
import { container } from 'tsyringe'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body) as RegisterUserBodySchemaType

  const useCase = container.resolve(CreateUserUseCase)

  const { user } = await useCase.execute(parsedBody)

  const formattedReply = UserPresenter.toHTTP<UserDetailedPresenterInput, HTTPUserWithDetails>(
    user,
    tokens.presenters.user.userDetailed,
  )

  return await reply.status(201).send({ data: formattedReply })
}
