import type { HTTPDirectorPosition } from '@custom-types/http/presenter/director-position/director-position-default'
import type { DirectorPosition } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DirectorPositionPresenter } from '@presenters/director-position-presenter'
import { getAllDirectorPositionsSchema } from '@schemas/director-position/get-all-director-positions-schema'
import { GetAllDirectorPositionsUseCase } from '@use-cases/director-position/get-all-director-positions'
import { container } from 'tsyringe'

export async function getAllDirectorPositions(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllDirectorPositionsSchema.parse(request.query)

  const useCase = container.resolve(GetAllDirectorPositionsUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = DirectorPositionPresenter.toHTTP<DirectorPosition, HTTPDirectorPosition>(data)

  return await reply.status(200).send({ data: formattedReply, meta })
}
