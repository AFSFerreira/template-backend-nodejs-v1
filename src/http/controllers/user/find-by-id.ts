import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindByIdUseCase } from '@/use-cases/factories/user/make-find-by-id-use-case'

export const findUserByIdParamsSchema = z.object({
  id: z.string().uuid(),
})

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = findUserByIdParamsSchema.parse(request.params)

  try {
    const findByIdUseCase = makeFindByIdUseCase()
    const { user } = await findByIdUseCase.execute({ id })
    return await reply.status(200).send({ user })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: error.message })
    }
  }
}
