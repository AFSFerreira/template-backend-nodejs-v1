import type {
  DirectorBoardDefaultPresenterInput,
  HTTPDirectorBoard,
} from '@custom-types/http/presenter/director-board/director-board-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DirectorBoardPresenter } from '@http/presenters/director-board-presenter'
import { createDirectorBoardBodySchema } from '@http/schemas/director-board/create-director-board-body-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { CreateDirectorBoardUseCase } from '@use-cases/director-board/create-director-board'
import { getClientIp } from '@utils/http/get-client-ip'
import { container } from 'tsyringe'

export async function createDirectorBoard(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = createDirectorBoardBodySchema.parse(request.body)

  const useCase = container.resolve(CreateDirectorBoardUseCase)

  const { directorBoard } = await useCase.execute({
    ...parsedBody,
    audit: {
      actorPublicId: getRequestUserPublicId(request),
      ipAddress: getClientIp(request),
    },
  })

  const formattedReply = DirectorBoardPresenter.toHTTP<DirectorBoardDefaultPresenterInput, HTTPDirectorBoard>(
    directorBoard,
  )

  return await reply.status(201).send({ data: formattedReply })
}
