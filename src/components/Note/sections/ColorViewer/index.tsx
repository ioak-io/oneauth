import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { isEmptyOrSpaces } from '../../../../components/Utils';

interface Props {
  color?: string;
}

const ColorViewer = (props: Props) => {

  return (
    <>
      {props.color && <div className='color-viewer' style={{ backgroundColor: props.color }} />}
    </>
  );
};

export default ColorViewer;
