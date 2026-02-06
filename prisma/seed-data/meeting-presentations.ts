import type { Prisma } from '@prisma/generated/client'
import { PresentationType } from '@prisma/generated/enums'
import {
  meetingPresentationAffiliationsData1,
  meetingPresentationAffiliationsData2,
  meetingPresentationAffiliationsData3,
} from './meeting-presentation-affiliations'
import {
  meetingPresentationAuthorsData1,
  meetingPresentationAuthorsData2,
  meetingPresentationAuthorsData3,
} from './meeting-presentation-authors'

export const meetingPresentationNestedMeetingEnrollmentData1: Prisma.MeetingPresentationCreateNestedOneWithoutMeetingEnrollmentInput =
  {
    create: {
      title: 'Busca por Bioassinaturas em Exoplanetas Rochosos',
      description:
        'Neste trabalho, apresentamos uma análise sistemática de potenciais bioassinaturas atmosféricas em exoplanetas rochosos na zona habitável de suas estrelas hospedeiras. Utilizamos dados espectrais do telescópio James Webb para identificar compostos químicos associados à presença de vida, como oxigênio molecular, metano e óxido nitroso. Os resultados preliminares indicam que alguns candidatos apresentam desequilíbrio químico atmosférico consistente com processos biológicos. Discutimos as implicações dessas descobertas para a compreensão da prevalência de vida no universo e os desafios metodológicos na distinção entre biossinaturas genuínas e falsos positivos gerados por processos abióticos.',
      presentationType: PresentationType.ORAL,
      Affiliations: {
        create: meetingPresentationAffiliationsData1,
      },
      Authors: {
        create: meetingPresentationAuthorsData1,
      },
    },
  }

export const meetingPresentationNestedMeetingEnrollmentData2: Prisma.MeetingPresentationCreateNestedOneWithoutMeetingEnrollmentInput =
  {
    create: {
      title: 'Extremófilos como Modelos para Vida Extraterrestre',
      description:
        'Investigamos a adaptação de organismos extremófilos encontrados em ambientes terrestres análogos a condições de outros corpos celestes do sistema solar. O estudo focou em bactérias halófilas e termófilas isoladas de salinas e fontes hidrotermais brasileiras, avaliando sua capacidade de sobrevivência sob condições simuladas de Marte e Encélado. Os experimentos demonstraram que certas linhagens mantiveram atividade metabólica sob radiação UV intensa e baixas temperaturas. Esses resultados expandem nosso entendimento sobre os limites da vida e fornecem diretrizes para futuras missões de astrobiologia.',
      presentationType: PresentationType.POSTER,
      Affiliations: {
        create: meetingPresentationAffiliationsData2,
      },
      Authors: {
        create: meetingPresentationAuthorsData2,
      },
    },
  }

export const meetingPresentationNestedMeetingEnrollmentData3: Prisma.MeetingPresentationCreateNestedOneWithoutMeetingEnrollmentInput =
  {
    create: {
      title: 'Química Prebiótica em Ambientes Hidrotermais',
      description:
        'Apresentamos resultados de experimentos de síntese prebiótica realizados em condições que simulam fontes hidrotermais oceânicas primitivas. Investigamos a formação de aminoácidos, nucleotídeos e outras moléculas orgânicas relevantes para a origem da vida a partir de precursores simples como CO2, NH3 e H2S. Os resultados indicam que gradientes de pH e temperatura característicos desses ambientes podem catalisar reações de condensação essenciais para a formação de polímeros biológicos. Discutimos as implicações para teorias sobre a origem da vida na Terra e em oceanos subsuperficiais de luas geladas.',
      presentationType: PresentationType.ORAL,
      Affiliations: {
        create: meetingPresentationAffiliationsData3,
      },
      Authors: {
        create: meetingPresentationAuthorsData3,
      },
    },
  }

export const meetingPresentationNestedMeetingEnrollmentDataArray1: Prisma.MeetingPresentationCreateNestedOneWithoutMeetingEnrollmentInput[] =
  [
    meetingPresentationNestedMeetingEnrollmentData1,
    meetingPresentationNestedMeetingEnrollmentData2,
    meetingPresentationNestedMeetingEnrollmentData3,
  ]
