import type {
  DirectorPositionDefaultPresenterInput,
  HTTPDirectorPosition,
} from '@custom-types/http/presenter/director-position/director-position-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DirectorPositionPresenter } from '@http/presenters/director-position-presenter'
import { createDirectorPositionBodySchema } from '@http/schemas/director-position/create-director-position-body-schema'
import { CreateDirectorPositionUseCase } from '@use-cases/director-position/create-director-position'
import { container } from 'tsyringe'

export async function createDirectorPosition(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = createDirectorPositionBodySchema.parse(request.body)

  const useCase = container.resolve(CreateDirectorPositionUseCase)

  const { directorPosition } = await useCase.execute(parsedBody)

  const formattedReply = DirectorPositionPresenter.toHTTP<DirectorPositionDefaultPresenterInput, HTTPDirectorPosition>(
    directorPosition,
  )

  return await reply.status(201).send({
    directorPosition: formattedReply,
  })
}
