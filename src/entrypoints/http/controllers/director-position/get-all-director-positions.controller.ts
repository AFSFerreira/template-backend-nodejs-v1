import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  DirectorPositionDefaultPresenterInput,
  HTTPDirectorPosition,
} from '@custom-types/http/presenter/director-position/director-position-default'
import type { GetAllDirectorPositionsType } from '@custom-types/http/schemas/director-position/get-all-director-positions-schema'
import type { FastifyReply } from 'fastify'
import { DirectorPositionPresenter } from '@http/presenters/director-position-presenter'
import { GetAllDirectorPositionsUseCase } from '@use-cases/director-position/get-all-director-positions'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getAllDirectorPositions(
  request: ZodRequest<{ querystring: GetAllDirectorPositionsType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllDirectorPositionsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = DirectorPositionPresenter.toHTTP<DirectorPositionDefaultPresenterInput, HTTPDirectorPosition>(
    data,
  )

  return await reply.status(StatusCodes.OK).send({ data: formattedReply, meta })
}
