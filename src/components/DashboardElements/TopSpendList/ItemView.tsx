import { format } from 'date-fns';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatCurrency,
  formatCurrencyByCompanyDetail,
} from '../../../components/CurrencyUtils';

import './ItemView.scss';

interface Props {
  space: string;
  data: any;
  percent: number;
  categoryMap: any;
}

const ItemView = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  return (
    <div className="top-spend-list-item">
      <div className="top-spend-list-item__top">
        <div className="top-spend-list-item__top__left one-liner">
          {props.data.description}
        </div>
        <div className="top-spend-list-item__top__right">
          {formatCurrencyByCompanyDetail(props.data.amount, company)}
        </div>
      </div>
      <div className="top-spend-list-item__bottom">
        <div className="top-spend-list-item__bottom__left">
          {`${props.data.billDate} | ${
            props.categoryMap[props.data.category]?.name
          }`}
        </div>
        <div className="top-spend-list-item__bottom__right">
          {props.percent}%
        </div>
      </div>
    </div>
  );
};

export default ItemView;
