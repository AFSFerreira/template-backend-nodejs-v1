import type { JSONContent } from '@tiptap/core'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'

export function extractProseMirrorImages(proseMirror: JSONContent) {
  const images = new Set<string>()
  const backendBaseUrl = getBackendBaseUrl()

  function traverseNode(node: JSONContent) {
    if (node.type === 'image' && node.attrs?.src && (node.attrs.src as string).startsWith(backendBaseUrl)) {
      images.add(node.attrs.src)
    }

    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverseNode)
    }
  }

  traverseNode(proseMirror)

  return images
}
