import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Select, SelectPropsConverter } from 'basicui';

import './ScheduleReceiptItems.scss';
import ScheduleReceiptItemModel from '../../../model/ScheduleReceiptItemModel';

interface Props {
  data: ScheduleReceiptItemModel[];
  handleChange: any;
  formId: string;
  errors: boolean[];
}

const ScheduleReceiptItems = (props: Props) => {
  const categories = useSelector((state: any) => state.category.categories);
  const [categoryMap, setCategoryMap] = useState<any[]>([]);

  useEffect(() => {
    if (categories) {
      const _categoryMap: any = {};
      categories.forEach((category: any) => {
        _categoryMap[category._id] = category.name;
      });
      setCategoryMap(_categoryMap);
    }
  }, [categories]);

  const handleChange = (event: any, index: number) => {
    const _data = [...props.data];
    _data[index] = { ..._data[index], [event.currentTarget.name]: event.currentTarget.value };
    props.handleChange(_data, index === props.data.length - 1);
  };

  const handleNumberChange = (event: any, index: number) => {
    const _data = [...props.data];
    _data[index] = { ..._data[index], [event.currentTarget.name]: parseInt(event.currentTarget.value || "0") };
    props.handleChange(_data, index === props.data.length - 1);
  };

  return (
    <div className="schedule-receipt-items">
      {/* <div className="page-title">Line items</div> */}
      {props.errors.includes(true) && (
        <div className="schedule-receipt-items__error">
          <FontAwesomeIcon icon={faExclamationTriangle} /> Incomplete
          information
        </div>
      )}
      <div className="schedule-receipt-items__main">
        <table className="basicui-table">
          <thead>
            <tr>
              <th className="indicator-column"> </th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((record, index) => (
              <tr key={record._id || index}>
                <td className="indicator-column">
                  <div
                    className={`indicator ${props.errors[index] ? 'indicator--error' : ''
                      }`}
                  />
                </td>
                <td>
                  <Select
                    name="category"
                    autocomplete
                    value={[record.category]}
                    options={SelectPropsConverter.optionsFromObject(categoryMap)}
                    onInput={(event: any) => handleChange(event, index)}
                  />
                </td>
                <td>
                  <Input
                    name="description"
                    value={record.description}
                    onInput={(event: any) => handleChange(event, index)}
                  />
                </td>
                <td>
                  <Input
                    name="amount"
                    type="number"
                    value={record.amount}
                    onInput={(event: any) => handleNumberChange(event, index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleReceiptItems;
