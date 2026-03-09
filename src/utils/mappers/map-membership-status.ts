import type { MembershipStatusType } from '@prisma/generated/enums'

const MEMBERSHIP_STATUS_LABELS: Record<MembershipStatusType, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  PENDING: 'Pendente de Aprovação',
  VERIFYING: 'Em Verificação de Email',
}

/**
 * Converte o enum `MembershipStatusType` para seu rótulo legível em português.
 *
 * @param status - Status da associação, ou `null`/`undefined`.
 * @returns Rótulo traduzido (ex: `'Ativo'`, `'Pendente de Aprovação'`), ou string vazia se não informado.
 *
 * @example
 * mapMembershipStatus('ACTIVE')     // 'Ativo'
 * mapMembershipStatus('PENDING')    // 'Pendente de Aprovação'
 * mapMembershipStatus(null)         // ''
 */
export function mapMembershipStatus(status: MembershipStatusType | null | undefined): string {
  if (!status) return ''
  return MEMBERSHIP_STATUS_LABELS[status]
}
