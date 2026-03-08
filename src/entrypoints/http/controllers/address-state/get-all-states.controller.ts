import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  AddressWithUsersCountPresenterInput,
  HTTPAddressStates,
} from '@custom-types/http/presenter/address/address-with-users-count'
import type { GetAllStatesQueryType } from '@custom-types/http/schemas/address/get-all-states-query-schema'
import type { FastifyReply } from 'fastify'
import { AddressPresenter } from '@http/presenters/address-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllStatesUseCase } from '@use-cases/address-state/get-all-states'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getAllStates(request: ZodRequest<{ querystring: GetAllStatesQueryType }>, reply: FastifyReply) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllStatesUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = AddressPresenter.toHTTP<AddressWithUsersCountPresenterInput, HTTPAddressStates>(
    data,
    tsyringeTokens.presenters.address.addressWithUsersCount,
  )

  return await reply.status(StatusCodes.OK).send({ data: formattedReply, meta })
}
