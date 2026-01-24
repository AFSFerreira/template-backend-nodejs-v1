import { resolveMx } from 'node:dns/promises'

export async function hasValidMxRecord(email: string) {
  const domain = email.split('@')[1]

  if (!domain) return false

  try {
    const records = await resolveMx(domain)

    const isMxValid = records && records.length > 0

    return isMxValid
  } catch (_error) {
    return false
  }
}
