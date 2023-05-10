import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
  note: NoteModel;
}

const LabelViewer = (props: Props) => {
  return (
    <div className='label-viewer'>
      <div className='note-label-list'>
        {props.note.primaryLabel && <div className='note-label'>
          {props.note.primaryLabel} <FontAwesomeIcon icon={faStar} />
        </div>}
        {props.note.labels?.filter(item => item !== props.note.primaryLabel).map((label) =>
          <div className='note-label'>
            {props.note.primaryLabel === label && <FontAwesomeIcon icon={faStar} />}
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelViewer;
