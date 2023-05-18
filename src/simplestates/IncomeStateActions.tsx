import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAndSetIncomeItems } from '../store/actions/IncomeActions';

interface Props {
  space: any;
}
const IncomeStateActions = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const incomeState: any = useSelector((state: any) => state.income);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorization?.isAuth && props.space) {
      dispatch(
        fetchAndSetIncomeItems(props.space, authorization, {
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

export default IncomeStateActions;
