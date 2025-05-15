import type { ISystemResponse } from '@custom-types/responses/system-response'

export const PRISMA_MODEL_NAME_NOT_RESOLVED: ISystemResponse = {
  code: 'PRISMA_MODEL_NAME_NOT_RESOLVED',
  message: 'Não foi possível resolver o nome do modelo Prisma no contexto da extensão',
}
