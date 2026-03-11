import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindBlogByPublicIdParamsType } from '@custom-types/http/schemas/blog/find-blog-by-public-id-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDetailedPresenter } from '@http/presenters/blog/blog-detailed.presenter'
import { FindBlogByPublicIdUseCase } from '@use-cases/blog/find-blog-by-public-id'
import { getClientIp } from '@utils/http/get-client-ip'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindBlogByPublicIdController implements IController {
  constructor(
    @inject(FindBlogByPublicIdUseCase)
    private readonly useCase: FindBlogByPublicIdUseCase,

    @inject(BlogDetailedPresenter)
    private readonly blogDetailedPresenter: BlogDetailedPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindBlogByPublicIdParamsType }>, reply: FastifyReply) {
    const parsedParams = request.params
    const ip = getClientIp(request)

    const { blog } = await this.useCase.execute({ publicId: parsedParams.publicId, ip })

    const formattedReply = this.blogDetailedPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
