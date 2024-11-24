"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TiptapProps = {
  value?: string;
  onChange: (event: any) => void;
  "data-testid"?: string;
  name: string;
  id: string;
  className?: string;
};

export default function Tiptap({ value, onChange, name, id }: TiptapProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "w-full rounded prose max-w-none p-4 rounded bg-slate-100  rounded-md max-h-44 overflow-y-auto ",
      },
    },
    onUpdate: ({ editor }) => {
      onChange({
        target: { name, value: editor.getHTML(), id },
      });
    },
  });

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}
