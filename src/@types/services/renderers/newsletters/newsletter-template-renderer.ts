export interface NewsletterInfo {
  htmlBody: string
  sequenceNumber: string
  editionNumber: string
  volume: string
  createdAt: Date
}

export interface MeetingInfo {
  title: string
  location: string
  dates: Date[]
}

export interface NewsletterRendererInfo {
  newsletterInfo: NewsletterInfo
  meetingInfo?: MeetingInfo
}
