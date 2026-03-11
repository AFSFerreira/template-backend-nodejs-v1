export interface IPresenterStrategy<TInput = unknown, TOutput = unknown> {
  toHTTP(input: TInput): TOutput
  toHTTPList(input: TInput[]): TOutput[]
}
