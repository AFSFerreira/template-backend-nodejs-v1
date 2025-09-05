import z from 'zod'

export const uuidv7Schema = z.uuid({ version: 'v7' })
