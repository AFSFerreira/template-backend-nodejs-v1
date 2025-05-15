import type { GenericFastifyRequest, IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import type { InjectionToken } from 'tsyringe'
import { container } from 'tsyringe'

export function adaptRoute(controllerToken: InjectionToken<IController>) {
  return async (request: GenericFastifyRequest, reply: FastifyReply) => {
    const controller = container.resolve(controllerToken)

    return await controller.handle(request, reply)
  }
}
