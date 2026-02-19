import type { IssueNode } from '@custom-types/utils/validators/issue-node'

export function collectZodErrors(issues: IssueNode): string[] {
  const errors: string[] = []

  function recurse(node: IssueNode): void {
    if (!node) return

    if (Array.isArray(node.errors)) {
      errors.push(...node.errors)
    }

    if (node.properties) {
      for (const key of Object.keys(node.properties)) {
        recurse(node.properties[key])
      }
    }
  }

  recurse(issues)

  return errors
}
