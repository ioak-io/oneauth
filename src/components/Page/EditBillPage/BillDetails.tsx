import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {Input} from 'basicui';

import './BillDetails.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import { ONEAUTH_PREF_ADDBILL_DATE } from '../../../constants/SessionStorageConstants';

interface Props {
  bill: ReceiptModel;
  handleChange: any;
  formId: string;
  errors: boolean;
}

const BillDetails = (props: Props) => {
  const handleChange = (event: any) => {
    props.handleChange({ ...props.bill, [event.currentTarget.name]: event.currentTarget.value });
    if (event.currentTarget.name === 'billDate') {
      sessionStorage.setItem(ONEAUTH_PREF_ADDBILL_DATE, event.currentTarget.value);
    }
  };

  // const save = () => {
  //   console.log('save');
  //   saveExpense(
  //     'companyname',
  //     { ...state, billDate: state.billDateString },
  //     authorization
  //   );
  //   QuickEditExpenseCommand.next(false);
  // };

  return (
    <div className="bill-details">
      <div className="page-title">Bill details</div>
      {props.errors && (
        <div className="bill-details__error">
          <FontAwesomeIcon icon={faExclamationTriangle} /> Incomplete
          information
        </div>
      )}
      <div className="bill-details__form form">
        <div className="form-two-column">
          <Input
            name="number"
            value={props.bill.number}
            onInput={handleChange}
            label="Bill number"
          />
          {/* <input autoFocus /> */}
          <Input
            name="billDate"
            value={props.bill.billDate}
            type="date"
            onInput={handleChange}
            label="Bill date *"
            autofocus
          />
          <Input
            name="description"
            value={props.bill.description}
            onInput={handleChange}
            label="Description"
          />
          <Input
            name="total"
            value={props.bill.total}
            onInput={handleChange}
            label="Total"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
