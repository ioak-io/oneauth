import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AggregateTile from '../../../components/DashboardElements/AggregateTile';
import ExpenseFilterModel from '../../../model/ExpenseFilterModel';

import './Summary.scss';

interface Props {
  data?: any;
  space: string;
}

const Summary = (props: Props) => {
  const filterExpenseList = useSelector(
    (state: any) => state.filterExpense.items
  );

  return (
    <div className="expense-summary">
      {filterExpenseList?.map((filter: ExpenseFilterModel) => (
        <>
          {filter.showInSummary && (
            <AggregateTile
              key={filter._id}
              filter={filter}
              space={props.space}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default Summary;
