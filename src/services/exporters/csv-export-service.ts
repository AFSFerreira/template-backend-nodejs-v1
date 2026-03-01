import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import { PassThrough } from 'node:stream'
import { logError } from '@lib/pino/helpers/log-error'
import { meetingExportMapper } from '@services/mappers/meeting-export-mapper'
import { userExportMapper } from '@services/mappers/user-export-mapper'
import { stringify } from 'csv-stringify'

export class CsvExportService {
  generateMeetingEnrollmentReport(meetingEnrollmentStream: AsyncIterable<MeetingEnrollmentWithDetails>): PassThrough {
    const passThrough = new PassThrough()

    const csvStringifier = stringify({
      header: true,
      delimiter: ';',
      columns: {
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
      },
    })

    // NOTE: Injetando o BOM (Byte Order Mark) para garantir que
    // o Excel leia os acentos em UTF-8 corretamente:
    passThrough.write('\uFEFF')

    csvStringifier.pipe(passThrough)

    const backgroundLineProcessing = async () => {
      try {
        for await (const meetingEnrollment of meetingEnrollmentStream) {
          const row = meetingExportMapper(meetingEnrollment)

          csvStringifier.write(row)
        }

        csvStringifier.end()
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

  generateUsersReport(usersStream: AsyncIterable<UserWithDetails>): PassThrough {
    const passThrough = new PassThrough()

    const csvStringifier = stringify({
      header: true,
      delimiter: ';',
      columns: {
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
      },
    })

    // NOTE: Injetando o BOM (Byte Order Mark) para garantir que
    // o Excel leia os acentos em UTF-8 corretamente:
    passThrough.write('\uFEFF')

    csvStringifier.pipe(passThrough)

    const backgroundLineProcessing = async () => {
      try {
        for await (const user of usersStream) {
          const row = userExportMapper(user)

          csvStringifier.write(row)
        }

        csvStringifier.end()
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
