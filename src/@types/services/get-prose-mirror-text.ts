import type { Extensions, JSONContent } from '@tiptap/core'

export interface IGetProseMirrorText {
  proseMirror: JSONContent
  tiptapConfiguration: Extensions
  limit?: number
}
