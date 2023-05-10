import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseFilterModel from '../../../model/ExpenseFilterModel';
import {
  formatCurrency,
  formatCurrencyByCompanyDetail,
} from '../../../components/CurrencyUtils';

import './style.scss';
import { getAggregate } from './service';
import { isEmptyAttributes } from '../../../components/Utils';
import { fetchAndSetExpenseItems } from '../../../store/actions/ExpenseActions';

interface Props {
  space: string;
  filter: ExpenseFilterModel;
}

const AggregateTile = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const appliedFilter = useSelector((state: any) => state.expense.filter);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (authorization.isAuth && !isEmptyAttributes(props.filter)) {
      getAggregate(props.space, props.filter, authorization).then(
        (response: any) => {
          setTotal(response.total);
        }
      );
    }
  }, [authorization, props.filter]);

  useEffect(() => {
    console.log('**', appliedFilter);
  }, [appliedFilter]);

  const activateFilter = () => {
    dispatch(fetchAndSetExpenseItems(props.space, authorization, props.filter));
  };

  return (
    <button
      className={`aggregate-tile ${
        props.filter?._id === appliedFilter?._id ? 'aggregate-tile--active' : ''
      }`}
      onClick={activateFilter}
    >
      <div className="aggregate-tile__metric">
        {formatCurrencyByCompanyDetail(total, company)}
      </div>
      <div className="aggregate-tile__definition">{props.filter.name}</div>
    </button>
  );
};

export default AggregateTile;
