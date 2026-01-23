import type {
  DirectorBoardWithUserPresenterInput,
  HTTPDirectorBoardWithUser,
} from '@custom-types/http/presenter/director-board/director-board-with-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorBoardPresenter } from '@presenters/director-board-presenter'
import { updateDirectorBoardBodySchema } from '@schemas/director-board/update-director-board-body-schema'
import { updateDirectorBoardParamsSchema } from '@schemas/director-board/update-director-board-params-schema'
import { UpdateDirectorBoardUseCase } from '@use-cases/director-board/update-director-board'
import { container } from 'tsyringe'

export async function updateDirectorBoard(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateDirectorBoardParamsSchema.parse(request.params)
  const parsedBody = updateDirectorBoardBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateDirectorBoardUseCase)

  const { directorBoard } = await useCase.execute({ publicId, data: parsedBody })

  const formattedReply = DirectorBoardPresenter.toHTTP<DirectorBoardWithUserPresenterInput, HTTPDirectorBoardWithUser>(
    directorBoard,
    tsyringeTokens.presenters.directorBoard.directorBoardWithUser,
  )

  return await reply.status(200).send({ data: formattedReply })
}
