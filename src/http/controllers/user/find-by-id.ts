import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const findUserByIdParamsSchema = z
  .object({
      id: z.string().uuid(),
  })

export async function findById(request: FastifyRequest, reply: FastifyReply) {
    // const { id } = findUserByIdParamsSchema.parse(request.params)


}
