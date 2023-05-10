import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { isEmptyOrSpaces } from '../../../../components/Utils';

interface Props {
  note: NoteModel;
  onChange: any;
}

const TypeEditor = (props: Props) => {
  const handleChange = (type: 'Fleeting' | 'Reference' | 'Literature' | 'Permanent') => {
    props.onChange({
      currentTarget: {
        name: 'type',
        value: type
      }
    })
  }

  return (
    <div className='type-editor'>
      <div className='type-editor__container'>
        <button className={`note-type-Fleeting ${props.note.type === 'Fleeting' ? 'active' : ''}`} onClick={() => handleChange('Fleeting')}>
          Fleeting
        </button>
        <button className={`note-type-Reference ${props.note.type === 'Reference' ? 'active' : ''}`} onClick={() => handleChange('Reference')}>
          Reference
        </button>
        <button className={`note-type-Literature ${props.note.type === 'Literature' ? 'active' : ''}`} onClick={() => handleChange('Literature')}>
          Literature
        </button>
        <button className={`note-type-Permanent ${props.note.type === 'Permanent' ? 'active' : ''}`} onClick={() => handleChange('Permanent')}>
          Permanent
        </button>
      </div>
    </div>
  );
};

export default TypeEditor;
