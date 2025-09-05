import { registerBodySchema } from '@schemas/user/register-body-schema'
import { makeRegisterUseCase } from '@use-cases/factories/user/make-register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body)

  const registerUserCase = makeRegisterUseCase()

  await registerUserCase.execute({
    ...parsedBody,
    user: parsedBody.user,
    address: parsedBody.address,
    keyword: parsedBody.keyword,
  })

  return await reply.status(201).send()
}
