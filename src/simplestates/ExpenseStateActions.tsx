import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAndSetExpenseItems } from '../store/actions/ExpenseActions';

interface Props {
  space: any;
}
const ExpenseStateActions = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const expenseState: any = useSelector((state: any) => state.expense);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorization?.isAuth && props.space) {
      dispatch(
        fetchAndSetExpenseItems(props.space, authorization, {
          name: '',
          from: '',
          to: '',
          description: '',
          moreThan: null,
          lessThan: null,
          days: null,
          months: null,
          monthNumber: null,
          yearNumber: null,
          categoryIdList: [],
          kakeiboList: [],
          tagIdList: [],
          pagination: {
            pageSize: 20,
            pageNo: 0,
            hasMore: true,
            sortBy: null,
            sortOrder: null,
          },
        })
      );
    }
  }, [authorization, props.space]);

  return <></>;
};

export default ExpenseStateActions;
