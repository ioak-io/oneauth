import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Youtube from '@tiptap/extension-youtube'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Link from '@tiptap/extension-link'
import { useEditor } from '@tiptap/react';

export const getEditorConfig = () => {
    const config = useEditor({
        extensions: [
            Typography,
            TextStyle, Color,
            Underline.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
                inline: true,
                allowBase64: true,
            }),
            Youtube.configure({
                inline: true,
                controls: true,
            }),
            Table.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
                resizable: true
            }),
            TableRow,
            TableHeader,
            TableCell,
            FontFamily.configure({
                types: ['textStyle'],
              }),
            Link.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
                validate: href => /^https?:\/\//.test(href),
            }),
            Highlight.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
                multicolor: true,
            }),
            Subscript,
            Superscript,
            TaskList.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
            }),
            TaskItem.configure({
                nested: true,
            }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
        ],
        content: `Hello`,
    });

    return config;
}
