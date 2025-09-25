import { BlogPresenter } from '@presenters/blog-presenter'
import { findByPublicIdWithVisualizationParamsSchema } from '@schemas/blog/find-by-public-id-with-visualization-query-schema'
import { makeFindByPublicIdWithVisualizationUseCase } from '@use-cases/factories/blog/make-find-by-public-id-with-visualization-use-case'
import { getClientIp } from '@utils/get-client-ip'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function findByPublicIdWithVisualization(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = findByPublicIdWithVisualizationParamsSchema.parse(request.params)
  const findByPublicIdWithVisualizationUseCase = makeFindByPublicIdWithVisualizationUseCase()

  const ip = getClientIp(request)

  const { blog } = await findByPublicIdWithVisualizationUseCase.execute({ publicId: parsedQuery.publicId, ip })

  return await reply.status(200).send({ data: BlogPresenter.toHTTP(blog) })
}
