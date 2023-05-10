/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

import './KeywordItem.scss';
import StopwordModel from '../../../model/StopwordModel';
import { ButtonVariantType, IconButton, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faMinus, faPenAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStopword, toggleStopword } from './service';

interface Props {
  space: string;
  keyword: string;
  onChange: any;
}

const KeywordItem = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);

  const onToggleStopword = () => {
    toggleStopword(props.space, { text: props.keyword }, authorization).then((response: any) => {
      props.onChange(response);
    })
  }

  return (
    <div className={`keyword-item ${props.keyword !== '' ? '' : 'keyword-item--disabled'}`}>
      <div className="keyword-item__left">
        {props.keyword}
      </div>
      <div className="keyword-item__right">
        {props.keyword !== '' && <IconButton circle variant={ButtonVariantType.transparent} theme={ThemeType.default} onClick={onToggleStopword}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>}
        {props.keyword === '' && <IconButton circle variant={ButtonVariantType.transparent} theme={ThemeType.default} onClick={onToggleStopword}>
          <FontAwesomeIcon icon={faMinus} />
        </IconButton>}
      </div>
    </div>
  );
};

export default KeywordItem;
