import type { IApiErrorResponse } from './api-error-response'

export interface IApiResponseBody {
  code: string
  message: string
  issues?: IApiErrorResponse[]
}

export interface IApiResponse {
  status: number
  body: IApiResponseBody
}
