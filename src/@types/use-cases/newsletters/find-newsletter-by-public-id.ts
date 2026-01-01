import type { Newsletter } from '@prisma/client'

export interface FindNewsletterByPublicIdUseCaseRequest {
  publicId: string
}

export interface FindNewsletterByPublicIdUseCaseResponse {
  newsletter: Newsletter
}
