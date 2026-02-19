'use client';
import { basicDark } from 'cm6-theme-basic-dark';
import '@mdxeditor/editor/style.css';
import './dark_edietor.css';

import type { ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  Separator,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
  tablePlugin,
  imagePlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor';
import { useTheme } from 'next-themes';
import { json } from 'zod';

// InitializedMDXEditor.tsx
interface Props {
  value: string;
  onChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods>;
  fieldChange: (value: string) => void;
}

const Edietor = ({ value, onChange, editorRef, fieldChange, ...props }: Props & MDXEditorProps) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? [basicDark] : [];
  return (
    <MDXEditor
      key={resolvedTheme}
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: 'css',
            js: 'javascript',
            ts: 'typescript',
            py: 'python',
            java: 'java',
            rb: 'ruby',
            go: 'go',
            rs: 'rust',
            json: 'json',
            md: 'markdown',
            html: 'html',
            xml: 'xml',
            yml: 'yaml',
            sh: 'shell',
            sql: 'sql',
            "": "unspecified",
            tsx: "typescript (React)",
            jsx: "javascript (React)",
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({viewMode: "rich-text", diffMarkdown: ""}),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => {
            return (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === 'codeblock',
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <ListsToggle />
                        <Separator />
                        <CreateLink />
                        <InsertImage />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <InsertCodeBlock />
                      </>
                    ),
                  },
                ]}
              />
            );
          },
        }),
      ]}
      onChange={fieldChange}
      {...props}
      ref={editorRef}
      className="grid  background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border"
    />
  );
};

export default Edietor;
