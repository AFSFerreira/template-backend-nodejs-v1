import type { ExcelCoordinate } from '@custom-types/utils/excel/get-excel-cell-address'
import { InvalidExcelCoordinateError } from '@utils/errors/excel/invalid-excel-coordinate-error'

export function getExcelCellAddress({ col, row }: ExcelCoordinate): string {
  if (col < 1 || row < 1) {
    throw new InvalidExcelCoordinateError()
  }

  let columnName = ''
  let currentCol = col

  // Algoritmo de conversão Base-26:
  while (currentCol > 0) {
    const modulo = (currentCol - 1) % 26

    columnName = String.fromCharCode(65 + modulo) + columnName

    currentCol = Math.floor((currentCol - 1) / 26)
  }

  return `${columnName}${row}`
}
