import type { Extensions } from '@tiptap/core'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

export const tiptapConfiguration: Extensions = [
  StarterKit,
  Link,
  Underline,
  Image,
  TextStyle,
  Color,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'blockquote'],
  }),
]
