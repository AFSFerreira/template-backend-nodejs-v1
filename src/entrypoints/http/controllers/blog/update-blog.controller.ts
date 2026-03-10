import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateBlogBodyType } from '@custom-types/http/schemas/blog/update-blog-body-schema'
import type { UpdateBlogParamsType } from '@custom-types/http/schemas/blog/update-blog-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateBlogUseCase } from '@use-cases/blog/update-blog'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateBlogController implements IController {
  constructor(private useCase: UpdateBlogUseCase) {}

  async handle(request: ZodRequest<{ body: UpdateBlogBodyType; params: UpdateBlogParamsType }>, reply: FastifyReply) {
    const userPublicId = getRequestUserPublicId(request)
    const { publicId } = request.params
    const parsedBody = request.body
    const { blog } = await this.useCase.execute({
      publicId,
      body: parsedBody,
      userPublicId,
    })

    const formattedReply = BlogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
