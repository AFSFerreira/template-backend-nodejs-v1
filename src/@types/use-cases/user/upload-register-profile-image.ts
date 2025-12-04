export interface UploadRegisterProfileImageUseCaseRequest {
  buffer: Buffer
  sizeInBytes: number
}

export interface UploadRegisterProfileImageUseCaseResponse {
  fileName: string
}
