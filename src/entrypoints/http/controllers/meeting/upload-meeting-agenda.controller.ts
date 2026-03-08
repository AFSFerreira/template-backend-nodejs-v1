import type { FileInput, HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { meetingAgendaMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@http/presenters/file-presenter'
import { documentSchema } from '@lib/zod/utils/generic-components/document-schema'
import { UploadMeetingAgendaUseCase } from '@use-cases/meeting/upload-meeting-agenda'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function uploadMeetingAgenda(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(meetingAgendaMultipartFileConfig)

  documentSchema.parse(filePart)

  const useCase = container.resolve(UploadMeetingAgendaUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(StatusCodes.OK).send({ data: formattedReply })
}
