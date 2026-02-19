export interface IApiResponseBody {
  code: string
  message: string
  issues?: string[]
}

export interface IApiResponse {
  status: number
  body: IApiResponseBody
}
