import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import { PassThrough } from 'node:stream'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import { env } from '@env/index'
import { logError } from '@lib/pino/helpers/log-error'
import { meetingExportMapper } from '@services/mappers/meeting-export-mapper'
import { getExcelCellAddress } from '@utils/excel/get-excel-cell-address'
import dayjs from 'dayjs'
import ExcelJS, { type Style } from 'exceljs'

interface WorkbookStreamOptions extends Partial<ExcelJS.stream.xlsx.WorkbookStreamWriterOptions> {}

export class ExcelExportService {
  private static WHITE_HEX_COLOR = 'FFFFFFFF'
  // private static DEEP_BLUE_HEX_COLOR = '073292FF'
  private static DARK_HEX_COLOR = 'FF000000'

  private static DATE_FORMAT = 'dd/mm/yyyy hh:mm'

  generateMeetingEnrollmentReport(
    meetingEnrollmentStream: AsyncIterable<MeetingEnrollmentWithDetails>,
    targetTimezone: string = SYSTEM_TIMEZONE,
  ): PassThrough {
    const passThrough = new PassThrough()

    // Usamos o Writer em vez do Workbook padrão para não alocar tudo em RAM:
    const options = {
      stream: passThrough,
      useStyles: true,
      useSharedStrings: true,
    } as const satisfies WorkbookStreamOptions

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options)

    // Metadados do documento:
    workbook.creator = env.APP_NAME
    workbook.lastModifiedBy = env.APP_NAME
    workbook.created = dayjs().tz(targetTimezone).toDate()

    // WARNING: Por causa da OOXML (Office Open XML), o nome do worksheet não deve
    // ultrapassar 31 caracteres. Caso contrário, o próprio excel emite um alerta de erro
    // ao tentar abrir o arquivo resultante da exportação

    // Criação da aba (Worksheet):
    const worksheet = workbook.addWorksheet('Inscrições em Reuniões', {
      views: [
        // Congela a primeira linha para o cabeçalho ficar fixo ao rolar a página:
        { state: 'frozen', xSplit: 0, ySplit: 1 },
      ],
    })

    const middleAlignment: Partial<Style> = { alignment: { horizontal: 'center', vertical: 'middle' } }

    const smallColumnSize = 25
    const mediumColumnSize = 40
    const largeColumnSize = 60

    const worksheetColumns = [
      { key: 'name', width: mediumColumnSize },
      { key: 'email', width: mediumColumnSize },
      {
        key: 'createdAt',
        width: smallColumnSize,
        style: { ...middleAlignment, numFmt: ExcelExportService.DATE_FORMAT },
      },
      { key: 'institutionName', width: mediumColumnSize, style: { ...middleAlignment } },
      { key: 'departmentName', width: mediumColumnSize, style: { ...middleAlignment } },
      { key: 'educationLevel', width: mediumColumnSize, style: { ...middleAlignment } },
      { key: 'wantsNewsletter', width: mediumColumnSize, style: { ...middleAlignment } },
      { key: 'hasPresentation', width: smallColumnSize, style: { ...middleAlignment } },
      { key: 'presentationType', width: smallColumnSize, style: { ...middleAlignment } },
      { key: 'title', width: largeColumnSize },
      { key: 'description', width: largeColumnSize },
      { key: 'affiliations', width: largeColumnSize },
      { key: 'authors', width: largeColumnSize },
    ]

    // Definição estrita de Colunas:
    worksheet.columns = worksheetColumns

    // 5. Estilização do Cabeçalho:
    const headerRow = worksheet.addRow({
      name: 'Nome Completo',
      email: 'E-mail',
      createdAt: 'Data de Inscrição',
      institutionName: 'Instituição',
      departmentName: 'Departamento',
      educationLevel: 'Nível de Instrução',
      wantsNewsletter: 'Deseja Receber Newsletter?',
      hasPresentation: 'Deseja Realizar Apresentação?',
      presentationType: 'Tipo de Apresentação',
      title: 'Título da Apresentação',
      description: 'Descrição da Apresentação',
      affiliations: 'Afiliações',
      authors: 'Autores',
    })

    headerRow.font = { bold: true, color: { argb: ExcelExportService.WHITE_HEX_COLOR } }

    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: ExcelExportService.DARK_HEX_COLOR },
    }

    headerRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Adiciona o AutoFiltro nativo do Excel em todas as colunas:
    worksheet.autoFilter = `A1:${getExcelCellAddress({ row: 1, col: worksheetColumns.length })}`

    headerRow.commit()

    // O processamento assíncrono começa em background:
    const backgroundLineProcessing = async () => {
      try {
        for await (const meetingEnrollment of meetingEnrollmentStream) {
          // Formata os dados no padrão da coluna antes de inserir:
          const worksheetRow = meetingExportMapper(meetingEnrollment)

          worksheet.addRow(worksheetRow).commit()
        }

        // Finaliza o arquivo. O workbook.commit() vai
        // internamente fechar a escrita no PassThrough:
        worksheet.commit()

        await workbook.commit()
      } catch (error: unknown) {
        logError({ error })

        if (error instanceof Error) {
          passThrough.destroy(error)
        }
      }
    }

    backgroundLineProcessing()

    return passThrough
  }
}
