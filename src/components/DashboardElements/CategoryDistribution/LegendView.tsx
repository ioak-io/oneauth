import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseFilterModel from '../../../model/ExpenseFilterModel';
import {
  formatCurrency,
  formatCurrencyByCompanyDetail,
} from '../../../components/CurrencyUtils';

import './LegendView.scss';
import { isEmptyAttributes } from '../../../components/Utils';
import { fetchAndSetExpenseItems } from '../../../store/actions/ExpenseActions';
import { DASHBOARD_COLOR_SCHEME } from '../service';

interface Props {
  data: any;
  categoryMap: any;
  space: string;
  colorScheme: any;
}

const LegendView = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );
  const [others, setOthers] = useState<any>();

  useEffect(() => {
    if (props.data?.label) {
      let count = 0;
      let data = 0;
      let percent = 0;
      props.data.label.forEach((item: any, index: number) => {
        if (index > 5) {
          count += props.data.count[index];
          data += props.data.data[index];
          percent += props.data.percent[index];
        }
      });
      if (count > 0) {
        setOthers({
          count,
          data,
          percent,
        });
      } else {
        setOthers(null);
      }
    }
  }, [props.data]);

  return (
    <div className="category-distribution-legend">
      {props.data.label.map((item: any, index: number) => (
        <>
          {index <= 5 && (
            <div
              key={item || index}
              className="category-distribution-legend__item"
            >
              <div className="category-distribution-legend__item__row">
                <div>
                  <div
                    className="category-distribution-legend__item__indicator"
                    style={{ backgroundColor: props.colorScheme[index] }}
                  />
                  {props.categoryMap[item]?.name || 'Others'}
                </div>
                <div>{props.data.percent[index]}%</div>
              </div>
              <div className="category-distribution-legend__item__row">
                <div>{props.data.count[index]} spends</div>
                <div>
                  {formatCurrencyByCompanyDetail(
                    props.data.data[index],
                    company
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ))}
      {others && (
        <div className="category-distribution-legend__item">
          <div className="category-distribution-legend__item__row">
            <div>
              {/* <div
                className="category-distribution-legend__item__indicator"
                style={{ backgroundColor: props.colorScheme[6] }}
              /> */}
              Others
            </div>
            <div>{others.percent}%</div>
          </div>
          <div className="category-distribution-legend__item__row">
            <div>{others.count} spends</div>
            <div>{formatCurrencyByCompanyDetail(others.data, company)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegendView;
