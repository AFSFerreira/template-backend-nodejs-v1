export type IDatabaseHealthCheck =
  | {
      status: 'healthy'
    }
  | {
      status: 'unhealthy'
      error: unknown
    }
