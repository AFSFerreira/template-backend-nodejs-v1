import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindDirectorBoardByPublicIdForAdminParamsType } from '@custom-types/http/schemas/director-board/find-director-board-by-public-id-for-admin-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorBoardWithUserForAdminPresenter } from '@http/presenters/director-board/director-board-with-user-for-admin.presenter'
import { FindDirectorBoardByPublicIdForAdminUseCase } from '@use-cases/director-board/find-by-public-id-for-admin'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindDirectorBoardByPublicIdForAdminController implements IController {
  constructor(
    @inject(FindDirectorBoardByPublicIdForAdminUseCase)
    private readonly useCase: FindDirectorBoardByPublicIdForAdminUseCase,

    @inject(DirectorBoardWithUserForAdminPresenter)
    private readonly directorBoardWithUserForAdminPresenter: DirectorBoardWithUserForAdminPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindDirectorBoardByPublicIdForAdminParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { directorBoard } = await this.useCase.execute({ publicId })

    const formattedReply = this.directorBoardWithUserForAdminPresenter.toHTTP(directorBoard)

    return await reply.sendResponse(formattedReply)
  }
}
