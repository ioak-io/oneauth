/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressAlt,
  faExclamationTriangle,
  faExpandAlt,
  faFileExport,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'basicui';

import './RunLog.scss';

import { deleteTransactions, getLog } from './service';
import { formatCurrencyByCompanyDetail } from '../../../components/CurrencyUtils';

interface Props {
  // receipt: ScheduleReceiptModel;
  data: any[];
  space: string;
  handleChange: any;
}

const RunLog = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );
  // const [data, setData] = useState<any[]>([]);
  const [denseView, setDenseView] = useState(true);

  const openRecord = (record: any) => {};

  const deleteTransaction = (record: any) => {
    deleteTransactions(props.space, record.transactionId, authorization).then(
      (response: any) => {
        props.handleChange(
          props.data.filter((item: any) => item._id !== record._id)
        );
      }
    );
  };

  const exportTransaction = (record: any) => {};

  return (
    <div className="backup-runlog">
      <div className="page-title">
        <div>Import log</div>
        <div className="desktop-only">
          <Button
           onClick={() => {
              setDenseView(!denseView);
            }}
            size="small"
          >
            <FontAwesomeIcon icon={denseView ? faExpandAlt : faCompressAlt} />
          </Button>
        </div>
      </div>
      <div className="backup-runlog__main">
        <table className="basicui-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Tag</th>
              <th>Category</th>
              <th>Income category</th>
              <th>Expense</th>
              <th>Income</th>
              <th>Budget</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {props.data?.map((record: any) => (
              <tr key={record._id}>
                <td onClick={() => openRecord(record)}>
                  {record.transactionDate}
                </td>
                {record.tagRecords > 0 && (
                  <td onClick={() => openRecord(record)}>
                    {record.tagRecords}
                  </td>
                )}
                {record.tagRecords === 0 && (
                  <td onClick={() => openRecord(record)}>-</td>
                )}
                {record.categoryRecords > 0 && (
                  <td onClick={() => openRecord(record)}>
                    {record.categoryRecords}
                  </td>
                )}
                {record.categoryRecords === 0 && (
                  <td onClick={() => openRecord(record)}>-</td>
                )}
                {record.incomeCategoryRecords > 0 && (
                  <td onClick={() => openRecord(record)}>
                    {record.incomeCategoryRecords}
                  </td>
                )}
                {record.incomeCategoryRecords === 0 && (
                  <td onClick={() => openRecord(record)}>-</td>
                )}
                {record.expenseRecords > 0 && (
                  <td onClick={() => openRecord(record)}>
                    {record.expenseRecords} (
                    {formatCurrencyByCompanyDetail(
                      record.expenseTotal,
                      company
                    )}
                    )
                  </td>
                )}
                {record.expenseRecords === 0 && (
                  <td onClick={() => openRecord(record)}>-</td>
                )}
                {record.incomeRecords > 0 && (
                  <td onClick={() => openRecord(record)}>
                    {record.incomeRecords} (
                    {formatCurrencyByCompanyDetail(record.incomeTotal, company)}
                    )
                  </td>
                )}
                {record.incomeRecords === 0 && (
                  <td onClick={() => openRecord(record)}>-</td>
                )}
                {record.budgetRecords > 0 && (
                  <td onClick={() => openRecord(record)}>
                    {record.budgetRecords} (
                    {formatCurrencyByCompanyDetail(record.budgetTotal, company)}
                    )
                  </td>
                )}
                {record.budgetRecords === 0 && (
                  <td onClick={() => openRecord(record)}>-</td>
                )}
                <td className="action-column">
                  <button
                    className="button backup-runlog__main__delete-button"
                    onClick={() => deleteTransaction(record)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="button backup-runlog__main__export-button"
                    onClick={() => exportTransaction(record)}
                  >
                    <FontAwesomeIcon icon={faFileExport} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RunLog;
