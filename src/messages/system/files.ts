import type { ISystemError } from '@custom-types/custom/system-error-types'

export const INVALID_FILESYSTEM_PATHS: ISystemError = {
  code: 'INVALID_FILESYSTEM_PATHS',
  message: 'Um ou mais caminhos do sistema de arquivos configurados são inválidos ou não puderam ser criados',
}
