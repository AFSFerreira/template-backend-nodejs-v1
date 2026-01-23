import type {
  DirectorBoardWithUserForAdminPresenterInput,
  HTTPDirectorBoardWithUserForAdmin,
} from '@custom-types/http/presenter/director-board/director-board-with-user-for-admin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorBoardPresenter } from '@presenters/director-board-presenter'
import { findDirectorBoardByPublicIdForAdminParamsSchema } from '@schemas/director-board/find-director-board-by-public-id-for-admin-params-schema'
import { FindDirectorBoardByPublicIdForAdminUseCase } from '@use-cases/director-board/find-by-public-id-for-admin'
import { container } from 'tsyringe'

export async function findDirectorBoardByPublicIdForAdmin(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findDirectorBoardByPublicIdForAdminParamsSchema.parse(request.params)

  const useCase = container.resolve(FindDirectorBoardByPublicIdForAdminUseCase)

  const { directorBoard } = await useCase.execute({ publicId })

  const formattedReply = DirectorBoardPresenter.toHTTP<
    DirectorBoardWithUserForAdminPresenterInput,
    HTTPDirectorBoardWithUserForAdmin
  >(directorBoard, tsyringeTokens.presenters.directorBoard.directorBoardWithUserForAdmin)

  return await reply.status(200).send({ data: formattedReply })
}
