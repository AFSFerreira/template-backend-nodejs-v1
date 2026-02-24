import type { FastifyReply, FastifyRequest } from 'fastify'
import { EXCEL_CONTENT_TYPE_HEADER } from '@constants/header-constants'
import { ExportMeetingEnrollmentsUseCase } from '@use-cases/meeting-enrollment/export-meeting-enrollments'
import { container } from 'tsyringe'

export async function exportMeetingEnrollments(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(ExportMeetingEnrollmentsUseCase)

  const { reportStream, filename } = await useCase.execute({})

  return await reply
    .header(EXCEL_CONTENT_TYPE_HEADER.key, EXCEL_CONTENT_TYPE_HEADER.value)
    .header('Content-Disposition', `attachment; filename="${filename}"`)
    .send(reportStream)
}
