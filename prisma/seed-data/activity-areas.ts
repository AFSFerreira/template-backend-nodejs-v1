import { ActivityAreaType } from '@prisma/client'

export const activityAreasData = [
  'ASTRONOMIA',
  'BIOLOGIA',
  'QUÍMICA',
  'FÍSICA',
  'GEOCIÊNCIAS',
  'ASTRONÁUTICA',
  'ENGENHARIAS',
  'MATEMÁTICA',
  'HUMANIDADES',
  'ENSINO',
  'DIVULGAÇÃO DA CIÊNCIA',
  'OUTRA',
]

export const subActivityAreasData = [
  'EXOPLANETAS',
  'MICROBIOLOGIA AMBIENTAL',
  'EXTREMÓFILOS',
  'HABITABILIDADE',
  'BIOASSINATURAS',
  'GEOBIOLOGIA',
  'MARTE',
  'LUAS GELADAS',
  'QUÍMICA PREBIÓTICA',
  'PEQUENOS CORPOS DO SISTEMA SOLAR',
  'CIÊNCIAS PLANETÁRIAS',
  'ORIGEM DA VIDA',
  'EVOLUÇÃO',
  'SETI',
  'EXPLORAÇÃO ESPACIAL',
  'AGRICULTURA ESPACIAL',
  'OUTRA',
]

export const activityAreaConnection1 = {
  type_area: {
    area: activityAreasData[0],
    type: ActivityAreaType.AREA_OF_ACTIVITY,
  },
}

export const activityAreaConnection2 = {
  type_area: {
    area: activityAreasData[1],
    type: ActivityAreaType.AREA_OF_ACTIVITY,
  },
}

export const subActivityAreasConnection1 = {
  type_area: {
    area: subActivityAreasData[0],
    type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
  },
}

export const subActivityAreasConnection2 = {
  type_area: {
    area: subActivityAreasData[1],
    type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
  },
}
