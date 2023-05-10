/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressAlt,
  faExclamationTriangle,
  faExpandAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'basicui';

import './Details.scss';

interface Props {
  // receipt: ScheduleReceiptModel;
  data: any[];
  space: string;
}

const RunLog = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  // const [data, setData] = useState<any[]>([]);
  const [denseView, setDenseView] = useState(true);

  const openRecord = (record: any) => {
    navigate(`/${props.space}/receipt/edit?id=${record.receiptId}`);
  };

  return (
    <div className="sch-rec-rb-runlog">
      <div className="page-title">
        <div>Transaction log</div>
        <div className="desktop-only">
          <Button
           onClick={() => {
              setDenseView(!denseView);
            }}
          >
            <FontAwesomeIcon icon={denseView ? faExpandAlt : faCompressAlt} />
          </Button>
        </div>
      </div>
      <div className="sch-rec-rb-runlog__main">
        <table className="basicui-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Line items</th>
              <th>Transaction amount</th>
            </tr>
          </thead>
          <tbody>
            {props.data?.map((record: any) => (
              <tr key={record._id}>
                <td onClick={() => openRecord(record)}>
                  {record.transactionDate}
                </td>
                <td onClick={() => openRecord(record)}>{record.lineItems}</td>
                <td onClick={() => openRecord(record)}>{record.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RunLog;
