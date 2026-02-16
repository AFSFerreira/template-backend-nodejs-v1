import type { JSONContent } from '@tiptap/core'
import { getBackendBaseUrlStored } from '@lib/logger/helpers/get-backend-base-url-stored'

export function extractProseMirrorImages(proseMirror: JSONContent) {
  const images = new Set<string>()
  const backendBaseUrl = getBackendBaseUrlStored()

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
