import type { HTTPAddressStates } from '@custom-types/presenter/address/address-with-user-count'
import type { AddressStates } from '@custom-types/repository/address-state/address-states'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ADDRESS_WITH_USERS_COUNT_PRESENTER_KEY } from '@constants/presenters-constants'
import { AddressPresenter } from '@presenters/variants/address-presenter'
import { getAllStatesQuerySchema } from '@schemas/address/get-all-states-query-schema'
import { GetAllStatesUseCase } from '@use-cases/address-state/get-all-states'
import { container } from 'tsyringe'

export async function getAllStates(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllStatesQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllStatesUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: AddressPresenter.toHTTP<AddressStates, HTTPAddressStates>(data, ADDRESS_WITH_USERS_COUNT_PRESENTER_KEY),
    meta,
  })
}
