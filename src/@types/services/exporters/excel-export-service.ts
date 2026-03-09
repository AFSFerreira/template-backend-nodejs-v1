import type ExcelJS from 'exceljs'

export interface WorkbookStreamOptions extends Partial<ExcelJS.stream.xlsx.WorkbookStreamWriterOptions> {}
