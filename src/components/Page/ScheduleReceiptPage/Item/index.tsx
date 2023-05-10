import {
  faFileExport,
  faFilter,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './style.scss';
import ScheduleReceiptModel from '../../../../model/ScheduleReceiptModel';
import Element from './Element';

interface Props {
  space: string;
  record: ScheduleReceiptModel;
}

const Item = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [recurrence, setRecurrence] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (props.record) {
      let _recurrence = '';
      switch (props.record.recurrence) {
        case 'Weekly':
          _recurrence += arrayToText(props.record.daysInWeek);
          _recurrence += ' - every week';
          break;
        case 'Monthly':
          _recurrence +=
            (props.record.daysInMonth || [])?.length > 1 ? 'Days ' : 'Day ';
          _recurrence += arrayToText(props.record.daysInMonth);
          _recurrence += ' - every month';
          break;
        case 'Yearly':
          _recurrence +=
            (props.record.daysInMonth || [])?.length > 1 ? 'Days ' : 'Day ';
          _recurrence += arrayToText(props.record.daysInMonth);
          _recurrence += ' - in ';
          _recurrence += arrayToText(props.record.monthsInYear);
          _recurrence += ' months';
          break;

        default:
          break;
      }

      setRecurrence(_recurrence);
    }
  }, [props.record]);

  const arrayToText = (array?: any[]) => {
    if (!array) {
      return '';
    }
    return array.toString().replace(new RegExp(',', 'g'), ', ');
  };

  const goToRunbookPage = () => {
    navigate(
      `/${props.space}/schedule/receipt/runbook?id=${props.record._id}`
    );
  };

  return (
    <button className="button sch-rec-pg-item" onClick={goToRunbookPage}>
      <Element label="Schedule name" value={props.record.name} />
      <Element label="Effective from" value={props.record.from} />
      <Element label="Effective until" value={props.record.to} />
      <Element label="Recurrence" value={recurrence} />
    </button>
  );
};

export default Item;
