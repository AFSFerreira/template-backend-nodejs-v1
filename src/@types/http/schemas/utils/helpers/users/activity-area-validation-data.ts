export interface ActivityAreaValidationData {
  activityArea?:
    | {
        mainActivityArea?: string
        subActivityArea?: string
      }
    | undefined

  user?:
    | {
        activityAreaDescription?: string | null
        subActivityAreaDescription?: string | null
      }
    | undefined
}
