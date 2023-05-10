import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAndSetReceiptItems } from '../store/actions/ReceiptActions';

interface Props {
  space: any;
}
const ReceiptStateActions = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const receiptState: any = useSelector((state: any) => state.receipt);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorization?.isAuth && props.space) {
      dispatch(
        fetchAndSetReceiptItems(props.space, authorization, {
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

export default ReceiptStateActions;
