import type { JSONContent } from '@tiptap/core'

export interface IReplaceProseMirrorImages {
  proseMirror: JSONContent
  oldToNewImagesMap: Map<string, string>
}
