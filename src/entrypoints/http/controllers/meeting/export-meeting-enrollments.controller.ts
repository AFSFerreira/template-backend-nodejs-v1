import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ExportMeetingEnrollmentsParamsType } from '@custom-types/http/schemas/meeting/export-meeting-enrollments-params-schema'
import type { ExportMeetingEnrollmentsQueryType } from '@custom-types/http/schemas/meeting/export-meeting-enrollments-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { ExportMeetingEnrollmentsUseCase } from '@use-cases/meeting-enrollment/export-meeting-enrollments'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ExportMeetingEnrollmentsController implements IController {
  constructor(
    @inject(ExportMeetingEnrollmentsUseCase)
    private readonly useCase: ExportMeetingEnrollmentsUseCase,
  ) {}

  async handle(
    request: ZodRequest<{ params: ExportMeetingEnrollmentsParamsType; querystring: ExportMeetingEnrollmentsQueryType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const { format } = request.query
    const { reportStream, filename } = await this.useCase.execute({
      meetingPublicId: publicId,
      format,
    })

    return await reply.sendDownload(reportStream, filename)
  }
}
