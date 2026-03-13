export interface IPresenterStrategy<TInput = unknown, TOutput = unknown> {
  toHTTP(input: TInput | TInput[]): TOutput | TOutput[]
}
