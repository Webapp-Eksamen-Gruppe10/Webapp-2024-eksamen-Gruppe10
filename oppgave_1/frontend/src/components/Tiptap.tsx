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

// "use client";

// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// // import { Toolbar } from "./ToolBar";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import React from "react";

// type TiptapProps = {
//   value?: string;
//   onChange: (event: string) => void;
//   name: string;
//   id: string;
// }

// export default function Tiptap({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (richText: string) => void;
// }) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       Highlight,
//     ],
//     content: value,
//     immediatelyRender: false,
//     editorProps: {
//       attributes: {
//         class: "prose max-w-none p-4 rounded bg-slate-100",
//       },
//     },
//     onUpdate({ editor }) {
//       onChange(editor.getHTML());
//     },
//   });

//   return (
//     <div className="w-full">
//       {/* <Toolbar editor={editor} /> */}
//       <div className="mt-2 border rounded-md max-h-44 overflow-y-auto">
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }
