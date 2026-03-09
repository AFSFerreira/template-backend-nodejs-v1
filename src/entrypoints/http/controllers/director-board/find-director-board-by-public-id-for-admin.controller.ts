import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  DirectorBoardWithUserForAdminPresenterInput,
  HTTPDirectorBoardWithUserForAdmin,
} from '@custom-types/http/presenter/director-board/director-board-with-user-for-admin'
import type { FindDirectorBoardByPublicIdForAdminParamsType } from '@custom-types/http/schemas/director-board/find-director-board-by-public-id-for-admin-params-schema'
import type { FastifyReply } from 'fastify'
import { DirectorBoardPresenter } from '@http/presenters/director-board-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FindDirectorBoardByPublicIdForAdminUseCase } from '@use-cases/director-board/find-by-public-id-for-admin'
import { container } from 'tsyringe'

export async function findDirectorBoardByPublicIdForAdmin(
  request: ZodRequest<{ params: FindDirectorBoardByPublicIdForAdminParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(FindDirectorBoardByPublicIdForAdminUseCase)

  const { directorBoard } = await useCase.execute({ publicId })

  const formattedReply = DirectorBoardPresenter.toHTTP<
    DirectorBoardWithUserForAdminPresenterInput,
    HTTPDirectorBoardWithUserForAdmin
  >(directorBoard, tsyringeTokens.presenters.directorBoard.directorBoardWithUserForAdmin)

  return await reply.sendResponse(formattedReply)
}
