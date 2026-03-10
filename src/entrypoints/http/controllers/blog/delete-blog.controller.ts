import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteBlogParamsType } from '@custom-types/http/schemas/blog/delete-blog-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { DeleteBlogUseCase } from '@use-cases/blog/delete-blog'
import type { FastifyReply } from 'fastify'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class DeleteBlogController implements IController {
  constructor(private useCase: DeleteBlogUseCase) {}

  async handle(request: ZodRequest<{ params: DeleteBlogParamsType }>, reply: FastifyReply) {
    const userPublicId = getRequestUserPublicId(request)
    const { publicId } = request.params
    await this.useCase.execute({ publicId, userPublicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
