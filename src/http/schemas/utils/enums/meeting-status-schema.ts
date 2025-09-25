import z from 'zod'

export const meetingStatusSchema = z.enum(['FINISHED', 'PENDING', 'ALL'])
