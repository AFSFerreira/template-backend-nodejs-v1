import type { FastifyReply, FastifyRequest } from 'fastify'
import path from 'node:path'
import { GetElectionNoticeUseCase } from '@use-cases/document-management/get-election-notice'
import { mapExtensionToMimeType } from '@utils/mappers/map-mime-type'
import { container } from 'tsyringe'

export async function getElectionNotice(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetElectionNoticeUseCase)

  const { filename, stream } = await useCase.execute()

  return await reply
    .header('Content-Type', mapExtensionToMimeType(path.extname(filename)))
    .header('Content-Disposition', `attachment; filename="${filename}"`)
    .send(stream)
}
