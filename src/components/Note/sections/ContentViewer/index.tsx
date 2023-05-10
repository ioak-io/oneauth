import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Label } from 'basicui';
import { isEmptyOrSpaces } from '../../../../components/Utils';

interface Props {
  note: NoteModel;
}

const ContentViewer = (props: Props) => {
  return (
    <div className='head-viewer'>
      <div>
        <Label>Short summary</Label>
        {!isEmptyOrSpaces(props.note.summary) && props.note.summary}
        {isEmptyOrSpaces(props.note.summary) && '-'}
      </div>
      <div>
        <Label>Content</Label>
        {!isEmptyOrSpaces(props.note.contentText) && <div dangerouslySetInnerHTML={{ __html: props.note.content || '' }} />}
        {isEmptyOrSpaces(props.note.contentText) && '-'}
      </div>
    </div>
  );
};

export default ContentViewer;
