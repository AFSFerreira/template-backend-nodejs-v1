import type { ExcelCoordinate } from '@custom-types/utils/excel/get-excel-cell-address'
import { InvalidExcelCoordinateError } from '@utils/errors/excel/invalid-excel-coordinate-error'

/**
 * Converte coordenadas numéricas (coluna, linha) em um endereço de célula Excel (ex: `A1`, `AB12`).
 *
 * Utiliza o algoritmo de conversão Base-26 para transformar o índice numérico da coluna
 * na representação alfabética correspondente do Excel.
 *
 * @param params - Coordenadas da célula.
 * @param params.col - Índice da coluna (1-indexed). Ex: 1 = A, 26 = Z, 27 = AA.
 * @param params.row - Índice da linha (1-indexed).
 * @returns Endereço da célula no formato Excel (ex: `A1`, `C3`, `AB12`).
 * @throws {InvalidExcelCoordinateError} Se `col` ou `row` forem menores que 1.
 *
 * @example
 * getExcelCellAddress({ col: 1, row: 1 })   // 'A1'
 * getExcelCellAddress({ col: 3, row: 5 })   // 'C5'
 * getExcelCellAddress({ col: 27, row: 10 }) // 'AA10'
 * getExcelCellAddress({ col: 28, row: 1 })  // 'AB1'
 */
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
