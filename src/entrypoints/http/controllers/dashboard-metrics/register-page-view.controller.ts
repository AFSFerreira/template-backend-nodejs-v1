import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterPageViewUseCase } from '@use-cases/dashboard-metrics/register-page-view'
import { getClientIp } from '@utils/http/get-client-ip'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RegisterPageViewController implements IController {
  constructor(
    @inject(RegisterPageViewUseCase)
    private readonly useCase: RegisterPageViewUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    await this.useCase.execute({ ip: getClientIp(request) })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
