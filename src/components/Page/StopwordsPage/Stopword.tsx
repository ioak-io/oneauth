/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

import './Stopword.scss';
import StopwordModel from '../../../model/StopwordModel';
import { ButtonVariantType, IconButton, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faMinus, faPenAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStopword, toggleStopword } from './service';

interface Props {
  space: string;
  data: StopwordModel;
  onChange: any;
}

const Stopword = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);

  const onToggleStopword = () => {
    toggleStopword(props.space, { text: props.data.text }, authorization).then((response: any) => {
      props.onChange(response);
    })
  }

  const onDeleteStopword = () => {
    deleteStopword(props.space, props.data._id, authorization).then((response: any) => {
      props.onChange(response);
    })
  }

  return (
    <div className={`stopword ${props.data.enabled ? '' : 'stopword--disabled'}`} key={props.data._id}>
      <div className="stopword__left">
        {props.data.text}
      </div>
      <div className="stopword__right">
        {!props.data.enabled && <IconButton circle variant={ButtonVariantType.transparent} theme={ThemeType.default} onClick={onToggleStopword}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>}
        {props.data.enabled && <IconButton circle variant={ButtonVariantType.transparent} theme={ThemeType.default} onClick={onToggleStopword}>
          <FontAwesomeIcon icon={faMinus} />
        </IconButton>}
        <IconButton circle variant={ButtonVariantType.transparent} theme={ThemeType.default} onClick={onDeleteStopword}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      </div>
    </div>
  );
};

export default Stopword;
