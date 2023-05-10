/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

import './ColorfilterItem.scss';
import ColorfilterModel from '../../../model/ColorfilterModel';
import { ButtonVariantType, IconButton, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { moveColorfilter } from './service';
import { useDispatch, useSelector } from 'react-redux';
import { updateColorfilterItems } from '../../../store/actions/ColorfilterActions';

interface Props {
  space: string;
  data: ColorfilterModel;
  first: boolean;
  last: boolean;
  disabled: boolean;
  moveUp: any;
  moveDown: any;
}

const ColorfilterItem = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);

  const gotoEditPage = () => {
    navigate(`/${props.space}/color-filter/${props.data._id}`);
  }

  return (
    <div className="colorfilter-item" key={props.data._id}>
      <div className="colorfilter-item">
        <div className="colorfilter-item__left">
          <div className="colorfilter-item__color-preview" style={{ backgroundColor: props.data.color }} />
          {props.data.name}
        </div>
      </div>
      <div className="colorfilter-item__right">
        <IconButton disabled={props.first || props.disabled} circle variant={ButtonVariantType.outline} theme={ThemeType.default} onClick={props.moveUp}>
          <FontAwesomeIcon icon={faChevronUp} />
        </IconButton>
        <IconButton disabled={props.last || props.disabled} circle variant={ButtonVariantType.outline} theme={ThemeType.default} onClick={props.moveDown}>
          <FontAwesomeIcon icon={faChevronDown} />
        </IconButton>
        <IconButton disabled={props.disabled} circle variant={ButtonVariantType.transparent} theme={ThemeType.primary} onClick={gotoEditPage}>
          <FontAwesomeIcon icon={faPenAlt} />
        </IconButton>
        <IconButton disabled={props.disabled} circle variant={ButtonVariantType.transparent} theme={ThemeType.danger} onClick={gotoEditPage}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      </div>
    </div>
  );
};

export default ColorfilterItem;
