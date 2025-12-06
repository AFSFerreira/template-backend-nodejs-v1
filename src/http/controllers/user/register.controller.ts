import type { RegisterUserBodySchemaType } from '@custom-types/schemas/user/register-body-schema'
import { registerBodySchema } from '@schemas/user/register-body-schema'
import { RegisterUseCase } from '@use-cases/user/register'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body) as RegisterUserBodySchemaType

  const useCase = container.resolve(RegisterUseCase)

  await useCase.execute(parsedBody)

  return await reply.status(201).send()
}
