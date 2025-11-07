import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'

export const tiptapConfiguration = [
  StarterKit,
  Image,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'blockquote'],
  }),
]
