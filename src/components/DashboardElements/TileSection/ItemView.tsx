import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatCurrency,
  formatCurrencyByCompanyDetail,
} from '../../../components/CurrencyUtils';

import './ItemView.scss';

interface Props {
  space: string;
  title: string;
  value: number;
  percent: number;
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
    <div className="tile-section-item-view">
      <div className="tile-section-item-view__title">{props.title}</div>
      <div className="tile-section-item-view__data">
        {props.percent !== undefined && props.percent !== null && (
          <div className="tile-section-item-view__data__left">
            {props.percent}%
          </div>
        )}
        <div className="tile-section-item-view__data__right">
          {formatCurrencyByCompanyDetail(props.value, company)}
        </div>
      </div>
    </div>
  );
};

export default ItemView;
