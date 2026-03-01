import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import { PassThrough } from 'node:stream'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import { env } from '@env/index'
import { logError } from '@lib/pino/helpers/log-error'
import { meetingExportMapper } from '@services/mappers/meeting-export-mapper'
import dayjs from 'dayjs'
import ExcelJS from 'exceljs'

interface WorkbookStreamOptions extends Partial<ExcelJS.stream.xlsx.WorkbookStreamWriterOptions> {}

export class ExcelExportService {
  static WHITE_HEX_COLOR = 'FFFFFFFF'
  static DEEP_BLUE_HEX_COLOR = '073292FF'

  static DATE_FORMAT = 'dd/mm/yyyy hh:mm'

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

    // Definição estrita de Colunas:
    worksheet.columns = [
      { key: 'name', width: 40 },
      { key: 'email', width: 40 },
      { key: 'createdAt', width: 25, style: { numFmt: ExcelExportService.DATE_FORMAT } },
      { key: 'institutionName', width: 25 },
      { key: 'departmentName', width: 25 },
      { key: 'educationLevel', width: 25 },
      { key: 'wantsNewsletter', width: 25 },
      { key: 'hasPresentation', width: 15 },
      { key: 'presentationType', width: 25 },
      { key: 'title', width: 25 },
      { key: 'description', width: 25 },
      { key: 'affiliations', width: 25 },
      { key: 'authors', width: 25 },
    ]

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
      fgColor: { argb: ExcelExportService.DEEP_BLUE_HEX_COLOR },
    }

    headerRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Adiciona o AutoFiltro nativo do Excel em todas as colunas:
    worksheet.autoFilter = 'A1:M1'

    headerRow.commit()

    // O processamento assíncrono começa em background,
    // envolvemos em uma função assíncrona:
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
