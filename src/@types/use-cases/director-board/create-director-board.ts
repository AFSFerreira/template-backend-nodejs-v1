import type { AuditInfo } from '@custom-types/custom/audit-info'
import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'
import type { CreateDirectorBoardBodySchemaType } from '@custom-types/http/schemas/director-board/create-director-board-body-schema'

export interface CreateDirectorBoardUseCaseRequest extends CreateDirectorBoardBodySchemaType {
  audit: AuditInfo
}

export interface CreateDirectorBoardUseCaseResponse {
  directorBoard: DirectorBoardWithUserRefactored
}
