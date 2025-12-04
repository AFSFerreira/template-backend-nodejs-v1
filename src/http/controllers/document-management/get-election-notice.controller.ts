import path from 'node:path'
import { makeGetElectionNoticeUseCase } from '@factories/document-management/make-get-election-notice-use-case'
import { mapExtensionToMimeType } from '@utils/mappers/map-mime-type'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getElectionNotice(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetElectionNoticeUseCase()

  const { filename, stream } = await useCase.execute()

  return await reply
    .header('Content-Type', mapExtensionToMimeType(path.extname(filename)))
    .header('Content-Disposition', `attachment; filename="${filename}"`)
    .send(stream)
}
