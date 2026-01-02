import type {
  DirectorBoardWithUserPresenterInput,
  HTTPDirectorBoardWithUser,
} from '@custom-types/presenter/director-board/director-board-with-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorBoardPresenter } from '@presenters/variants/director-board-presenter'
import { findDirectorBoardByPublicIdParamsSchema } from '@schemas/director-board/find-director-board-by-public-id-params-schema'
import { FindDirectorBoardByPublicIdUseCase } from '@use-cases/director-board/find-by-public-id'
import { container } from 'tsyringe'

export async function findDirectorBoardByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findDirectorBoardByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindDirectorBoardByPublicIdUseCase)

  const { directorBoard } = await useCase.execute({ publicId })

  const formattedReply = DirectorBoardPresenter.toHTTP<DirectorBoardWithUserPresenterInput, HTTPDirectorBoardWithUser>(
    directorBoard,
    tokens.presenters.directorBoardWithUser,
  )

  return await reply.status(200).send({ data: formattedReply })
}
