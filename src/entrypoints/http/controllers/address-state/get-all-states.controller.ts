import type {
  AddressWithUsersCountPresenterInput,
  HTTPAddressStates,
} from '@custom-types/http/presenter/address/address-with-users-count'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { AddressPresenter } from '@http/presenters/address-presenter'
import { getAllStatesQuerySchema } from '@http/schemas/address/get-all-states-query-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllStatesUseCase } from '@use-cases/address-state/get-all-states'
import { container } from 'tsyringe'

export async function getAllStates(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllStatesQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllStatesUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = AddressPresenter.toHTTP<AddressWithUsersCountPresenterInput, HTTPAddressStates>(
    data,
    tsyringeTokens.presenters.address.addressWithUsersCount,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
