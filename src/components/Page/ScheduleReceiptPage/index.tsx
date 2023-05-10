import {
  faFileExport,
  faFilter,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from 'basicui';
import './style.scss';
import Topbar from '../../../components/Topbar';
import ScheduleReceiptModel from '../../../model/ScheduleReceiptModel';
import { getScheduleReceipt } from './service';
import Item from './Item';

interface Props {
  history: any;
  space: string;
}

const ScheduleReceiptPage = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const navigate = useNavigate();
  const [data, setData] = useState<ScheduleReceiptModel[]>([]);

  const addNew = () => {
    navigate(`/${props.space}/schedule/receipt/edit`);
  };

  useEffect(() => {
    if (authorization.isAuth) {
      getScheduleReceipt(props.space, authorization).then((response: any) => {
        if (response) {
          setData([...response]);
        }
      });
    }
  }, [authorization]);

  return (
    <div className="schedule-receipt-page">
      <Topbar title="Schedule recurring transactions" />
      <div className="main-section">
        <div className="schedule-receipt-page__main page-width content-section">
          <div className="page-title">
            <div className="">Schedules</div>
            <Button onClick={addNew}>
              <FontAwesomeIcon icon={faPlus} />
              Add new
            </Button>
          </div>
          {/* <ManageCategory space={props.space} location={props.location} /> */}
          <div className="schedule-receipt-page__main__list">
            {data?.map((record: ScheduleReceiptModel) => (
              <Item key={record._id} space={props.space} record={record} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleReceiptPage;
