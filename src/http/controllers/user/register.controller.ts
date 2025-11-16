import { registerBodySchema } from '@schemas/user/register-body-schema'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'
import { makeRegisterUseCase } from '@use-cases/factories/user/make-register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body) as RegisterUserBodySchemaType

  const registerUserCase = makeRegisterUseCase()

  await registerUserCase.execute(parsedBody)

  return await reply.status(201).send()
}
