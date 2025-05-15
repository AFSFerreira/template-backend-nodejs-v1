export interface NodeSystemError extends Error {
  code: string
  syscall?: string
}
