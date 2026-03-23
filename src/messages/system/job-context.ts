import type { ISystemResponse } from '@custom-types/responses/system-response'

export const JOB_DATABASE_CONTEXT_NOT_PROVIDED: ISystemResponse = {
  code: 'JOB_DATABASE_CONTEXT_NOT_PROVIDED',
  message: 'O contexto de banco de dados não foi fornecido para o job',
}
