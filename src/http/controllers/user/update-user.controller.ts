import { updateBodySchema } from "@schemas/user/update-user-body-schema"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = updateBodySchema.parse(request.body)

  // const 
}
