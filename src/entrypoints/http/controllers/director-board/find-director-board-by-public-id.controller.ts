import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  DirectorBoardWithUserPresenterInput,
  HTTPDirectorBoardWithUser,
} from '@custom-types/http/presenter/director-board/director-board-with-user'
import type { FindDirectorBoardByPublicIdParamsType } from '@custom-types/http/schemas/director-board/find-director-board-by-public-id-params-schema'
import type { FastifyReply } from 'fastify'
import { DirectorBoardPresenter } from '@http/presenters/director-board-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FindDirectorBoardByPublicIdUseCase } from '@use-cases/director-board/find-by-public-id'
import { container } from 'tsyringe'

export async function findDirectorBoardByPublicId(
  request: ZodRequest<{ params: FindDirectorBoardByPublicIdParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(FindDirectorBoardByPublicIdUseCase)

  const { directorBoard } = await useCase.execute({ publicId })

  const formattedReply = DirectorBoardPresenter.toHTTP<DirectorBoardWithUserPresenterInput, HTTPDirectorBoardWithUser>(
    directorBoard,
    tsyringeTokens.presenters.directorBoard.directorBoardWithUser,
  )

  return await reply.status(200).send({ data: formattedReply })
}
