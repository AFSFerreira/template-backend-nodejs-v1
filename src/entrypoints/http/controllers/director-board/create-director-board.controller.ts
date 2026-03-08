import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  DirectorBoardDefaultPresenterInput,
  HTTPDirectorBoard,
} from '@custom-types/http/presenter/director-board/director-board-default'
import type { CreateDirectorBoardBodyType } from '@custom-types/http/schemas/director-board/create-director-board-body-schema'
import type { FastifyReply } from 'fastify'
import { DirectorBoardPresenter } from '@http/presenters/director-board-presenter'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { CreateDirectorBoardUseCase } from '@use-cases/director-board/create-director-board'
import { getClientIp } from '@utils/http/get-client-ip'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function createDirectorBoard(
  request: ZodRequest<{ body: CreateDirectorBoardBodyType }>,
  reply: FastifyReply,
) {
  const parsedBody = request.body

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

  return await reply.status(StatusCodes.CREATED).send({ data: formattedReply })
}
