export interface ActivityAreaValidationData {
  activityArea: {
    mainActivityArea: string
    subActivityArea: string
  }

  user: {
    activityAreaDescription?: string | null
    subActivityAreaDescription?: string | null
  }
}
