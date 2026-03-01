import type { MembershipStatusType } from '@prisma/generated/enums'

const MEMBERSHIP_STATUS_LABELS: Record<MembershipStatusType, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  PENDING: 'Pendente',
  VERIFYING: 'Em Verificação',
}

export function mapMembershipStatus(status: MembershipStatusType | null | undefined): string {
  if (!status) return ''
  return MEMBERSHIP_STATUS_LABELS[status]
}
