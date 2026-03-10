import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindBlogByPublicIdParamsType } from '@custom-types/http/schemas/blog/find-blog-by-public-id-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FindBlogByPublicIdRestrictedUseCase } from '@use-cases/blog/find-blog-by-public-id-detailed'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class FindBlogByPublicIdRestrictedController implements IController {
  constructor(private useCase: FindBlogByPublicIdRestrictedUseCase) {}

  async handle(request: ZodRequest<{ params: FindBlogByPublicIdParamsType }>, reply: FastifyReply) {
    const userPublicId = getRequestUserPublicId(request)
    const { publicId } = request.params
    const { blog } = await this.useCase.execute({ publicId, userPublicId })

    const formattedReply = BlogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
