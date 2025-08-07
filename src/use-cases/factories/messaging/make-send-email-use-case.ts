import { SendEmailUseCase } from '@/use-cases/messaging/send-email'

export function makeSendEmailUseCase() {
  const sendEmailUseCase = new SendEmailUseCase()

  return sendEmailUseCase
}
