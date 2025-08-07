import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/presenters/user-presenter'
import { getAllUsersParamsSchema } from '@/schemas/user/get-all-users-schema'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetAllUsersUseCase } from '@/use-cases/factories/user/make-get-all-users-use-case'

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsedParams = getAllUsersParamsSchema.parse(request.query)
  const getAllUsersUseCase = makeGetAllUsersUseCase()

  try {
    const { users } = await getAllUsersUseCase.execute({
      ...parsedParams,
      occupation: parsedParams.occupation,
      educationLevel: parsedParams.educationLevel,
    })

    return await reply.status(200).send({ users: UserPresenter.toHTTP(users) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: error.message })
    }
  }
}
