import type { WorkbookStreamOptions } from '@custom-types/services/exporters/excel-export-service'
import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import { PassThrough } from 'node:stream'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import { env } from '@env/index'
import { logError } from '@lib/pino/helpers/log-error'
import { userExportMapper } from '@services/mappers/user-export-mapper'
import { getExcelCellAddress } from '@utils/excel/get-excel-cell-address'
import { meetingExportMapper } from '@utils/mappers/meeting-export-mapper'
import dayjs from 'dayjs'
import ExcelJS, { type Style } from 'exceljs'
import { injectable } from 'tsyringe'

/**
 * Serviço de exportação de dados em formato Excel (.xlsx) com streaming.
 *
 * Utiliza `ExcelJS.stream.xlsx.WorkbookWriter` para escrita incremental
 * em memória mínima. Inclui cabeçalho congelado, auto-filtro, estilização
 * de colunas e metadados do documento.
 *
 * **Restrição OOXML:** nomes de worksheets devem ter no máximo 31 caracteres.
 */
@injectable()
export class ExcelExportService {
  private static WHITE_HEX_COLOR = 'FFFFFFFF'
  // private static DEEP_BLUE_HEX_COLOR = '073292FF'
  private static DARK_HEX_COLOR = 'FF000000'

  private static DATE_FORMAT = 'dd/mm/yyyy hh:mm'

  private static SMALL_COLUMN_SIZE = 25
  private static MEDIUM_COLUMN_SIZE = 40
  private static LARGE_COLUMN_SIZE = 60

  /**
   * Gera planilha Excel de inscrições em encontros científicos com streaming.
   *
   * Processa um `AsyncIterable` e retorna um `PassThrough` pronto para
   * ser canalizado na resposta HTTP.
   *
   * @param meetingEnrollmentStream - Stream assíncrono de inscrições.
   * @param targetTimezone - Timezone para formatação de datas (padrão: `SYSTEM_TIMEZONE`).
   * @returns Stream `PassThrough` com o arquivo `.xlsx`.
   */
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

    const worksheetColumns = [
      { key: 'name', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'email', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      {
        key: 'createdAt',
        width: ExcelExportService.SMALL_COLUMN_SIZE,
        style: { ...middleAlignment, numFmt: ExcelExportService.DATE_FORMAT },
      },
      { key: 'institutionName', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'departmentName', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'educationLevel', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'wantsNewsletter', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'hasPresentation', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'presentationType', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'title', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'description', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'affiliations', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'authors', width: ExcelExportService.LARGE_COLUMN_SIZE },
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

  /**
   * Gera planilha Excel de usuários com dados cadastrais completos, incluindo
   * endereço, curso, publicações, palavras-chave e informações de diretoria.
   *
   * @param usersStream - Stream assíncrono de usuários com relacionamentos.
   * @param targetTimezone - Timezone para formatação de datas (padrão: `SYSTEM_TIMEZONE`).
   * @returns Stream `PassThrough` com o arquivo `.xlsx`.
   */
  generateUsersReport(
    usersStream: AsyncIterable<UserWithDetails>,
    targetTimezone: string = SYSTEM_TIMEZONE,
  ): PassThrough {
    const passThrough = new PassThrough()

    const options = {
      stream: passThrough,
      useStyles: true,
      useSharedStrings: true,
    } as const satisfies WorkbookStreamOptions

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options)

    workbook.creator = env.APP_NAME
    workbook.lastModifiedBy = env.APP_NAME
    workbook.created = dayjs().tz(targetTimezone).toDate()

    // WARNING: Por causa da OOXML (Office Open XML), o nome do worksheet não deve
    // ultrapassar 31 caracteres. Caso contrário, o próprio excel emite um alerta de erro
    // ao tentar abrir o arquivo resultante da exportação

    const worksheet = workbook.addWorksheet('Dados dos Usuários', {
      views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }],
    })

    const middleAlignment: Partial<Style> = { alignment: { horizontal: 'center', vertical: 'middle' } }

    const worksheetColumns = [
      { key: 'fullName', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'username', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'email', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'birthDate', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'institutionName', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'departmentName', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'occupation', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'educationLevel', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'membershipStatus', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'identityType', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'identityDocument', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'activityArea', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'activityAreaDescription', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'subActivityArea', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'subActivityAreaDescription', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'interestDescription', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'publicInformation', width: ExcelExportService.LARGE_COLUMN_SIZE },
      {
        key: 'astrobiologyOrRelatedStartYear',
        width: ExcelExportService.SMALL_COLUMN_SIZE,
        style: { ...middleAlignment },
      },
      { key: 'emailIsPublic', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'receiveReports', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'lastLogin', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'createdAt', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'updatedAt', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'zip', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'number', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'street', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'district', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'city', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'state', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'country', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'complement', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'mainAreaActivity', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'courseName', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'startGraduationDate', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'expectedGraduationDate', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'supervisorName', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'scholarshipHolder', width: ExcelExportService.SMALL_COLUMN_SIZE, style: { ...middleAlignment } },
      { key: 'sponsoringOrganization', width: ExcelExportService.MEDIUM_COLUMN_SIZE },
      { key: 'keywords', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'publications', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'directorBoardProfileImage', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'aboutMe', width: ExcelExportService.LARGE_COLUMN_SIZE },
      { key: 'directorPosition', width: ExcelExportService.MEDIUM_COLUMN_SIZE, style: { ...middleAlignment } },
    ]

    worksheet.columns = worksheetColumns

    const headerRow = worksheet.addRow({
      fullName: 'Nome Completo',
      username: 'Usuário',
      email: 'E-mail',
      birthDate: 'Data de Nascimento',
      institutionName: 'Instituição',
      departmentName: 'Departamento',
      occupation: 'Ocupação',
      educationLevel: 'Nível de Instrução',
      membershipStatus: 'Status de Associação',
      identityType: 'Tipo de Documento',
      identityDocument: 'Documento de Identidade',
      activityArea: 'Área de Atividade',
      activityAreaDescription: 'Descrição da Área de Atividade',
      subActivityArea: 'Subárea de Atividade',
      subActivityAreaDescription: 'Descrição da Subárea de Atividade',
      interestDescription: 'Descrição de Interesse',
      publicInformation: 'Informação Pública',
      astrobiologyOrRelatedStartYear: 'Ano de Início em Astrobiologia',
      emailIsPublic: 'E-mail é Público?',
      receiveReports: 'Deseja Receber Newsletter por E-mail?',
      lastLogin: 'Último Login',
      createdAt: 'Data de Criação',
      updatedAt: 'Data de Atualização',
      zip: 'CEP',
      number: 'Número',
      street: 'Rua',
      district: 'Bairro',
      city: 'Cidade',
      state: 'Estado',
      country: 'País',
      complement: 'Complemento',
      mainAreaActivity: 'Área Principal de Atividade',
      courseName: 'Nome do Curso',
      startGraduationDate: 'Início da Graduação',
      expectedGraduationDate: 'Previsão de Conclusão',
      supervisorName: 'Orientador',
      scholarshipHolder: 'Bolsista',
      sponsoringOrganization: 'Organização Patrocinadora',
      keywords: 'Palavras-chave',
      publications: 'Publicações',
      directorBoardProfileImage: 'Imagem de Perfil (Perfil Corpo Diretivo)',
      aboutMe: 'Sobre Mim (Perfil Corpo Diretivo)',
      directorPosition: 'Cargo na Diretoria',
    })

    headerRow.font = { bold: true, color: { argb: ExcelExportService.WHITE_HEX_COLOR } }

    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: ExcelExportService.DARK_HEX_COLOR },
    }

    headerRow.alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.autoFilter = `A1:${getExcelCellAddress({ row: 1, col: worksheetColumns.length })}`

    headerRow.commit()

    const backgroundLineProcessing = async () => {
      try {
        for await (const user of usersStream) {
          const worksheetRow = userExportMapper(user, targetTimezone)

          worksheet.addRow(worksheetRow).commit()
        }

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
