export interface IApiErrorBody {
  code: string
  message: string
  issues?: Record<string, unknown>
}

export interface IApiError {
  status: number
  body: IApiErrorBody
}
