import { prisma } from '@/lib/prisma'
import { flattenUser } from '@/utils/flatten-user'
import { toCsv } from '@/utils/csv'
import type { CompleteUserInformation } from '@/types/complete-user-information'


export async function exportUsersAsCsv(): Promise<string> {
  const users: CompleteUserInformation[] = await prisma.user.findMany({
    include: {
      address: true,
      enrolledCourse: true,
      activityArea: true,
      keywords: true,
      academicPublications: true,
    },
  })

  const flattened = users.map(flattenUser)
  return toCsv(flattened)
}
