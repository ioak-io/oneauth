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
}

const TypeViewer = (props: Props) => {

  return (
    <div className={`type-viewer note-type-${props.note.type}`}>
      {props.note.type}
    </div>
  );
};

export default TypeViewer;
