import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetStatuteUseCase } from '@use-cases/document-management/get-statute'
import { container } from 'tsyringe'

export async function getStatute(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetStatuteUseCase)

  const { filename, stream } = await useCase.execute()

  return await reply.sendDownload(stream, filename)
}
