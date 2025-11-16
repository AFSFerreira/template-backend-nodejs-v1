import { ADDRESS_WITH_USERS_COUNT_PRESENTER_KEY } from '@constants/presenters-constants'
import { AddressPresenter } from '@presenters/address-presenter'
import { getAllStatesQuerySchema } from '@schemas/address/get-all-states-query-schema'
import { makeGetAllStatesUseCase } from '@use-cases/factories/address/make-get-all-states-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllStates(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllStatesQuerySchema.parse(request.query)

  const getAllStatesUseCase = makeGetAllStatesUseCase()

  const { data, meta } = await getAllStatesUseCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: AddressPresenter.toHTTP(data, ADDRESS_WITH_USERS_COUNT_PRESENTER_KEY),
    meta,
  })
}
