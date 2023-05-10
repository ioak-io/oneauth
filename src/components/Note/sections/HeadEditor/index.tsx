import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import LabelEditor from '../../sections/LabelEditor';
import TypeEditor from '../TypeEditor';

interface Props {
  note: NoteModel;
  onChange: any;
}

const HeadEditor = (props: Props) => {
  const handleLabelChange = (data: any) => {
    props.onChange({
      ...props.note,
      labels: data.labels,
      primaryLabel: data.primaryLabel
    })
  }
  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className='head-editor'>
      <Input autoFocus name="name" value={props.note.name} label="Name" onInput={handleChange} />
      <TypeEditor note={props.note} onChange={handleChange} />
      <LabelEditor note={props.note} onChange={handleLabelChange} />
    </div>
  );
};

export default HeadEditor;
