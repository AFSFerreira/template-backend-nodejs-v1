export class ApiError extends Error {
  constructor(
    public status: number,
    public body: { code: string; message: string },
  ) {
    super(body.message)
    this.name = this.constructor.name
  }
}
