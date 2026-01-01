import type { FastifyReply, FastifyRequest } from 'fastify'
import { meetingAgendaMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { documentSchema } from '@schemas/utils/generic-components/document-schema'
import { UploadMeetingAgendaUseCase } from '@use-cases/meeting/upload-meeting-agenda'
import { container } from 'tsyringe'

export async function uploadMeetingAgenda(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(meetingAgendaMultipartFileConfig)

  documentSchema.parse(filePart)

  const useCase = container.resolve(UploadMeetingAgendaUseCase)

  const { filename: savedFilename } = await useCase.execute({ filePart })

  return await reply.status(200).send({ data: { meetingAgenda: savedFilename } })
}
