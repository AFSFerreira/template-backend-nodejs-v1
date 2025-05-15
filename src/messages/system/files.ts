import type { ISystemResponse } from '@custom-types/responses/system-response'

export const INVALID_FILESYSTEM_PATHS: ISystemResponse = {
  code: 'INVALID_FILESYSTEM_PATHS',
  message: 'Um ou mais caminhos do sistema de arquivos configurados são inválidos ou não puderam ser criados',
}
