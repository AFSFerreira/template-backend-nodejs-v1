import { UploadRegisterProfileImageUseCase } from '@use-cases/user/upload-register-profile-image'

export function makeUploadRegisterProfileImageUseCase() {
  const uploadRegisterProfileImageUseCase = new UploadRegisterProfileImageUseCase()

  return uploadRegisterProfileImageUseCase
}
