export interface HTTPMeetingParticipation {
  userId: number | null
  guestId: number | null
  meetingId: number
  createdAt: Date
}
