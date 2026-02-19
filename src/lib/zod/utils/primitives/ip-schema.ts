import { z } from 'zod'

export const ipSchema = z.union([z.ipv4(), z.ipv6()])
