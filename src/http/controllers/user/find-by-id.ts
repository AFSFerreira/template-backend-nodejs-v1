import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindUserByIdUseCase } from '@/use-cases/factories/user/make-find-by-id-use-case'

export const findUserByIdParamsSchema = z.object({
  userId: z.string().uuid(),
})

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const { userId: id } = findUserByIdParamsSchema.parse(request.params)

  try {
    const findUserByIdUseCase = makeFindUserByIdUseCase()
    const { user } = await findUserByIdUseCase.execute({ id })
    return await reply.status(200).send({ user })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: error.message })
    }
  }
}
