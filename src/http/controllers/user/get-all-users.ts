import { UserPresenter } from '@presenters/user-presenter'
import { getAllUsersParamsSchema } from '@schemas/user/get-all-users-schema'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { makeGetAllUsersUseCase } from '@use-cases/factories/user/make-get-all-users-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsedParams = getAllUsersParamsSchema.parse(request.query)
  const getAllUsersUseCase = makeGetAllUsersUseCase()

  try {
    const { data, meta } = await getAllUsersUseCase.execute({
      ...parsedParams,
      occupation: parsedParams.occupation,
      educationLevel: parsedParams.educationLevel,
    })

    return await reply
      .status(200)
      .send({ data: UserPresenter.toHTTP(data), meta })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: error.message })
    }
  }
}
