import {
  faFileExport,
  faFilter,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import ScheduleReceiptModel from '../../../../../model/ScheduleReceiptModel';

interface Props {
  label: string;
  value?: string;
}

const Element = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [data, setData] = useState<ScheduleReceiptModel[]>([]);

  return (
    <div className="sch-rec-pg-element">
      <div className="sch-rec-pg-element__label">{props.label}</div>
      <div className="sch-rec-pg-element__value">{props.value}</div>
    </div>
  );
};

export default Element;
