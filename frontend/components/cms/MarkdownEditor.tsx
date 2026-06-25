"use client";

import React from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// Load MDEditor secara dinamis dengan SSR dinonaktifkan untuk mencegah error window is not defined
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value?: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Start writing content in Markdown...",
}: MarkdownEditorProps) {
  return (
    <div
      className="w-full bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 focus-within:border-violet-600/50 transition-colors"
      data-color-mode="dark"
    >
      <MDEditor
        value={value}
        onChange={onChange}
        height={400}
        preview="live" // Menampilkan live split editor & preview
        textareaProps={{
          placeholder,
        }}
        className="w-full bg-zinc-950 text-zinc-100 border-none"
      />
    </div>
  );
}
