import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Checkbox, Select, SelectPropsConverter } from 'basicui';

import './ScheduleReceiptDetails.scss';
import { ONEAUTH_PREF_ADDBILL_DATE } from '../../../constants/SessionStorageConstants';
import ScheduleReceiptModel from '../../../model/ScheduleReceiptModel';

interface Props {
  receipt: ScheduleReceiptModel;
  handleChange: any;
  formId: string;
  errors: boolean;
}

const ScheduleReceiptDetails = (props: Props) => {
  const handleChange = (event: any) => {
    props.handleChange({ ...props.receipt, [event.currentTarget.name]: event.currentTarget.value });
    if (event.currentTarget.name === 'billDate') {
      sessionStorage.setItem(ONEAUTH_PREF_ADDBILL_DATE, event.currentTarget.value);
    }
  };

  return (
    <div className="schedule-receipt-details">
      <div className="page-title">Schedule</div>
      {props.errors && (
        <div className="schedule-receipt-details__error">
          <FontAwesomeIcon icon={faExclamationTriangle} /> Incomplete
          information
        </div>
      )}
      <div className="schedule-receipt-details__form form">
        <div className="form-two-column">
          <Input
            name="name"
            value={props.receipt.name}
            onInput={handleChange}
            label="Schedule name *"
            autofocus
          />
          <Input
            name="description"
            value={props.receipt.description}
            onInput={handleChange}
            label="Receipt description"
          />
          <Select
            name="recurrence"
            value={[props.receipt.recurrence || '']}
            options={SelectPropsConverter.optionsFromSimpleList(['Weekly', 'Monthly', 'Yearly', 'Once'])}
            onInput={handleChange}
            label="Frequency *"
            required
          />
          <Input
            name="from"
            value={props.receipt.from}
            type="date"
            onInput={handleChange}
            label="Effective from *"
          />
          {props.receipt.recurrence !== 'Once' && (
            <Input
              name="to"
              value={props.receipt.to}
              type="date"
              onInput={handleChange}
              label="Effective till *"
            />
          )}
          {props.receipt.recurrence === 'Weekly' && (
            <Select
              name="daysInWeek"
              value={props.receipt.daysInWeek || []}
              options={SelectPropsConverter.optionsFromSimpleList([
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ])}
              onInput={handleChange}
              label="Days *"
              multiple
            />
          )}
          {props.receipt.recurrence === 'Yearly' && (
            <Select
              name="monthsInYear"
              value={props.receipt.monthsInYear || []}
              options={SelectPropsConverter.optionsFromSimpleList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}
              onInput={handleChange}
              label="Months *"
              multiple
            />
          )}
          {(props.receipt.recurrence === 'Monthly' ||
            props.receipt.recurrence === 'Yearly') && (
              <Select
                name="daysInMonth"
                value={props.receipt.daysInMonth || []}
                options={SelectPropsConverter.optionsFromSimpleList([
                  'Last day in month',
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                  23,
                  24,
                  25,
                  26,
                  27,
                  28,
                  29,
                  30,
                  31,
                ])}
                onInput={handleChange}
                label="Days in month *"
                multiple
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleReceiptDetails;
