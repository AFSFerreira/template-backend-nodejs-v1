export interface IApiResponseBody {
  code: string
  message: string
  issues?: Record<string, unknown>
}

export interface IApiResponse {
  status: number
  body: IApiResponseBody
}
