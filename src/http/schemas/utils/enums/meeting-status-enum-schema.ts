import z from 'zod'

export const meetingStatusEnumSchema = z.enum(['FINISHED', 'PENDING', 'ALL'])
