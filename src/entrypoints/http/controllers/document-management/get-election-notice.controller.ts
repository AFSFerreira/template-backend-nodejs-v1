import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetElectionNoticeUseCase } from '@use-cases/document-management/get-election-notice'
import { container } from 'tsyringe'

export async function getElectionNotice(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetElectionNoticeUseCase)

  const { filename, stream } = await useCase.execute()

  return await reply.sendDownload(stream, filename)
}
