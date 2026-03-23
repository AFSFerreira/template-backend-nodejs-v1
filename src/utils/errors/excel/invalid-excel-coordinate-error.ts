import { SystemError } from '@errors/system-error'
import { INVALID_EXCEL_COORDINATE } from '@messages/system/excel'

export class InvalidExcelCoordinateError extends SystemError {
  constructor() {
    super(INVALID_EXCEL_COORDINATE)
  }
}
