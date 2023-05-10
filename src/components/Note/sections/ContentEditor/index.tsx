import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { useParams } from 'react-router-dom';
import { Input, Label, Textarea } from 'basicui';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';

interface Props {
  note: NoteModel;
  editor: any;
  onChange: any;
}

const ContentEditor = (props: Props) => {
  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  return (
    <div className='head-editor'>
      <Textarea value={props.note.summary} name="summary" onInput={handleChange} label="Short summary" maxlength="500" />
      <div>
        <Label>
          Content
        </Label>
        <Editor editor={props.editor}>
          <Bold editor={props.editor} />
          <Italic editor={props.editor} />
          <Underline editor={props.editor} />
          <BulletList editor={props.editor} />
          <OrderedList editor={props.editor} />
          <BlockQuote editor={props.editor} />
          <HighlightColor editor={props.editor} />
          <ClearFormatting editor={props.editor} />
        </Editor>
      </div>
    </div>
  );
};

export default ContentEditor;
