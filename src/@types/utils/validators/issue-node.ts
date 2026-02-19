export interface IssueNode {
  errors?: string[]
  properties?: Record<string, IssueNode>
}
