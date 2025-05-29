import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

export default function RichTextEditor({ content = "", onChange }) {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Underline,
      TextStyle,
      Color,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="my-4" style={{ border: '2px solid #ccc', padding: '10px' }}>
      {/* Toolbar */}
      <div style={{ marginBottom: '10px' }}>
        <button type= "button" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button type= "button" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button type= "button" onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
        <button type= "button" onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
        <button type= "button" onClick={() => editor.chain().focus().toggleCode().run()}>Code</button>

        <button type= "button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button type= "button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type= "button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>

        <button type= "button" onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
        <button type= "button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numbered List</button>

        <button type= "button" onClick={() => editor.chain().focus().toggleBlockquote().run()}>Blockquote</button>
        <button type= "button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</button>

        <button type= "button" onClick={() => editor.chain().focus().setColor('#FF0000').run()}>Red</button>
        <button type= "button" onClick={() => editor.chain().focus().setColor('#0000FF').run()}>Blue</button>
        <button type= "button" onClick={() => editor.chain().focus().unsetColor().run()}>Reset Color</button>

        <button type= "button" onClick={() => editor.chain().focus().toggleHighlight().run()}>Highlight</button>

        <button type= "button" onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
        <button type= "button" onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
        <button type= "button" onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>

        <button type= "button" onClick={addImage}>Insert Image</button>
        <button type= "button" onClick={addLink}>Insert Link</button>

        <button type= "button" onClick={() => editor.chain().focus().undo().run()}>Undo</button>
        <button type= "button" onClick={() => editor.chain().focus().redo().run()}>Redo</button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
