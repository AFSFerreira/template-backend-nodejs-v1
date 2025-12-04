export interface IApiErrorBody {
  code: string
  message: string
}

export interface IApiError {
  status: number
  body: IApiErrorBody
}
