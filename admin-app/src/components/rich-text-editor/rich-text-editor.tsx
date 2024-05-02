/* eslint-disable jsx-a11y/label-has-associated-control */
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'

import { Button } from '../button'
import { STRINGS } from './strings'

import './styles.css'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <section className="flex gap-2">
      <Button
        colorScheme="gray"
        variant="outline"
        type="button"
        size="sm"
        label={STRINGS.button_bold_label}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        onClick={() => editor.chain().focus().toggleBold().run()}
        highlighted={editor.isActive('bold')}
      />
      <Button
        colorScheme="gray"
        variant="outline"
        type="button"
        size="sm"
        label={STRINGS.button_italic_label}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        onClick={() => editor.chain().focus().toggleItalic().run()}
        highlighted={editor.isActive('italic')}
      />
      <Button
        colorScheme="gray"
        variant="outline"
        type="button"
        size="sm"
        label={STRINGS.button_unordered_list_label}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        highlighted={editor.isActive('bulletList')}
      />
      <Button
        colorScheme="gray"
        variant="outline"
        type="button"
        size="sm"
        label={STRINGS.button_ordered_list_label}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        }
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        highlighted={editor.isActive('orderedList')}
      />
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        purple
      </button>
      */}
    </section>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      keepMarks: true,
    },
    orderedList: {
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      keepMarks: true,
    },
  }),
]

const emptyContent = '<p>Coloque seu texto aqui</p>'

export type Props = {
  content?: string
  error?: string
  label?: string
  onChange: (value: string) => void
  tip?: string | number
}

export const RichTextEditor = ({
  content,
  error,
  label,
  onChange,
  tip,
}: Props) => (
  <div className="flex flex-col">
    <label className="mb-2 block text-sm dark:text-white">
      {label}
    </label>
    <div className="[&>div>div]:max-h-64 [&>div>div]:overflow-y-scroll [&>div]:mt-4 [&>div>div]:border [&>div>div]:rounded-lg [&>div>div]:py-3 [&>div>div]:px-4 [&>div>div]:text-gray-600 [&>div>div]:dark:text-gray-200">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content || emptyContent}
        onUpdate={(event) => onChange(event.editor.getHTML())}
      >
        <span />
      </EditorProvider>
    </div>
    {error ? <p className="mt-2 mb-2 text-red-500 dark:text-red-400 text-xs">{error}</p> : null}
    {!error && tip ? <p className="mt-2 mb-2 text-gray-600 dark:text-gray-200 text-xs">{tip}</p> : null}
  </div>
)
