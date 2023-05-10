import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Chart, ArcElement, DoughnutController, Legend } from 'chart.js';
import * as _ from 'lodash';
import './style.scss';
// import Chart from 'chart.js';
// import { Chart as ChartJS } from 'chart.js';
import { newId } from '../../../events/MessageService';
import ChartHeader from '../ChartHeader';
import ChartBody from '../ChartBody';
import StatisticsPayloadModel from '../../../model/StatisticsPayloadModel';
import { DASHBOARD_COLOR_SCHEME } from '../service';
import { formatCurrencyByCompanyDetail } from '../../../components/CurrencyUtils';
import { isEmptyAttributes } from '../../../components/Utils';
import ItemView from './ItemView';

interface Props {
  space: string;
  categoryMap: any;
  data: any;
  title: string;
}

const TopSpendList = (props: Props) => {
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  return (
    <div>
      <ChartHeader title={props.title} />
      <ChartBody>
        {props.data && (
          <div className="top-spend-list">
            <div className="top-spend-list__left">
              {props.data.data.map((item: any, index: number) => (
                <>
                  {index < Math.round(props.data.data.length / 2) && (
                    <div className="top-spend-list__item" key={item._id}>
                      <ItemView
                        data={item}
                        space={props.space}
                        percent={props.data.percent[index]}
                        categoryMap={props.categoryMap}
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
            <div className="top-spend-list__right">
              {props.data.data.map((item: any, index: number) => (
                <>
                  {index >= Math.round(props.data.data.length / 2) && (
                    <div className="top-spend-list__item" key={item._id}>
                      <ItemView
                        data={item}
                        space={props.space}
                        percent={props.data.percent[index]}
                        categoryMap={props.categoryMap}
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
        {!props.data && <div>Loading...</div>}
      </ChartBody>
    </div>
  );
};

export default TopSpendList;
