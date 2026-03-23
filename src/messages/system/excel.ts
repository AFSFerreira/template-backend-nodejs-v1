import type { ISystemResponse } from '@custom-types/responses/system-response'

export const INVALID_EXCEL_COORDINATE: ISystemResponse = {
  code: 'INVALID_EXCEL_COORDINATE',
  message: 'As coordenadas do Excel devem ser maiores que zero (1-based index).',
}
