import type { HTTPUserWithDetails } from '@custom-types/presenter/user/user-detailed'
import type { RegisterUserBodySchemaType } from '@custom-types/schemas/user/register-body-schema'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { UserPresenter } from '@presenters/variants/user-presenter'
import { registerBodySchema } from '@schemas/user/register-body-schema'
import { RegisterUseCase } from '@use-cases/user/register'
import { container } from 'tsyringe'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body) as RegisterUserBodySchemaType

  const useCase = container.resolve(RegisterUseCase)

  const { user } = await useCase.execute(parsedBody)

  return await reply
    .status(201)
    .send({ data: UserPresenter.toHTTP<UserWithDetails, HTTPUserWithDetails>(user, USER_DETAILED_PRESENTER_KEY) })
}
