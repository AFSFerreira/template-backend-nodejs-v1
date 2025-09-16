import type { ActivityArea, ActivityAreaType } from '@prisma/client'

interface HTTPActivityArea {
  area: string
  type: ActivityAreaType
}

export class ActivityAreaPresenter {
  static toHTTP(activityArea: ActivityArea): HTTPActivityArea
  static toHTTP(activityAreas: ActivityArea[]): HTTPActivityArea[]
  static toHTTP(input: ActivityArea | ActivityArea[]): HTTPActivityArea | HTTPActivityArea[] {
    if (Array.isArray(input)) {
      return input.map((activityArea) => ActivityAreaPresenter.toHTTP(activityArea))
    }

    return {
      area: input.area,
      type: input.type,
    }
  }
}
